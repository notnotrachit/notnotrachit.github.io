package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"image"
	"image/draw"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"sync"
	"syscall"
	"time"

	_ "github.com/chai2010/webp"
	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/glamour"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/ssh"
	"github.com/charmbracelet/wish"
	"github.com/charmbracelet/wish/activeterm"
	"github.com/charmbracelet/wish/bubbletea"
	"github.com/charmbracelet/wish/logging"
	"github.com/mattn/go-runewidth"
	"github.com/muesli/termenv"
	"github.com/nfnt/resize"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	host = "0.0.0.0"
)

func getPort() int {
	if p := os.Getenv("PORT"); p != "" {
		if i, err := strconv.Atoi(p); err == nil {
			return i
		}
	}
	return 23234
}

// --- Styling ---

type themeIndex int

const (
	themeNeon themeIndex = iota
	themeAmber
	themeOcean
	themeMono
)

type terminalTheme struct {
	name       string
	primary    lipgloss.Color
	secondary  lipgloss.Color
	accent     lipgloss.Color
	highlight  lipgloss.Color
	info       lipgloss.Color
	text       lipgloss.Color
	dim        lipgloss.Color
	soft       lipgloss.Color
	panel      lipgloss.Color
	tagText    lipgloss.Color
	background [3]uint8
}

var themes = []terminalTheme{
	{
		name:       "Neon",
		primary:    lipgloss.Color("#00F260"),
		secondary:  lipgloss.Color("#0575E6"),
		accent:     lipgloss.Color("#8E2DE2"),
		highlight:  lipgloss.Color("#FF0080"),
		info:       lipgloss.Color("#00FFFF"),
		text:       lipgloss.Color("#BDC3C7"),
		dim:        lipgloss.Color("#777777"),
		soft:       lipgloss.Color("#9AA0A6"),
		panel:      lipgloss.Color("#34495E"),
		tagText:    lipgloss.Color("#FFFFFF"),
		background: [3]uint8{0x1f, 0x24, 0x2d},
	},
	{
		name:       "Amber",
		primary:    lipgloss.Color("#FBBF24"),
		secondary:  lipgloss.Color("#F97316"),
		accent:     lipgloss.Color("#7C2D12"),
		highlight:  lipgloss.Color("#FB7185"),
		info:       lipgloss.Color("#FDBA74"),
		text:       lipgloss.Color("#F5E7C6"),
		dim:        lipgloss.Color("#A1865E"),
		soft:       lipgloss.Color("#C7A76C"),
		panel:      lipgloss.Color("#5F4120"),
		tagText:    lipgloss.Color("#111827"),
		background: [3]uint8{0x22, 0x1a, 0x10},
	},
	{
		name:       "Ocean",
		primary:    lipgloss.Color("#7DD3FC"),
		secondary:  lipgloss.Color("#38BDF8"),
		accent:     lipgloss.Color("#14B8A6"),
		highlight:  lipgloss.Color("#F0ABFC"),
		info:       lipgloss.Color("#67E8F9"),
		text:       lipgloss.Color("#D7F3FF"),
		dim:        lipgloss.Color("#6B8FA3"),
		soft:       lipgloss.Color("#9CC7D8"),
		panel:      lipgloss.Color("#1E4E5F"),
		tagText:    lipgloss.Color("#06202A"),
		background: [3]uint8{0x0b, 0x19, 0x24},
	},
	{
		name:       "Mono",
		primary:    lipgloss.Color("#F5F5F5"),
		secondary:  lipgloss.Color("#A3A3A3"),
		accent:     lipgloss.Color("#525252"),
		highlight:  lipgloss.Color("#D4D4D4"),
		info:       lipgloss.Color("#E5E5E5"),
		text:       lipgloss.Color("#D4D4D4"),
		dim:        lipgloss.Color("#737373"),
		soft:       lipgloss.Color("#A3A3A3"),
		panel:      lipgloss.Color("#404040"),
		tagText:    lipgloss.Color("#111111"),
		background: [3]uint8{0x18, 0x18, 0x18},
	},
}

var (
	// Colors
	cNeonGreen = lipgloss.Color("#00F260")
	cNeonBlue  = lipgloss.Color("#0575E6")
	cPurple    = lipgloss.Color("#8E2DE2")
	cPink      = lipgloss.Color("#FF0080")
	cCyan      = lipgloss.Color("#00FFFF")
	cGrey      = lipgloss.Color("#BDC3C7")
	cDarkGrey  = lipgloss.Color("#34495E")
	cTagText   = lipgloss.Color("#FFFFFF")
	bgColor    = [3]uint8{0x1f, 0x24, 0x2d}

	// Global
	appStyle = lipgloss.NewStyle().Padding(0, 1)

	muted = lipgloss.Color("#777777")
	soft  = lipgloss.Color("#9AA0A6")

	// Header
	headerWrapStyle = lipgloss.NewStyle().PaddingTop(3).PaddingBottom(1)
	logoStyle       = lipgloss.NewStyle().Foreground(cNeonGreen) // don't Bold: it can distort block glyphs
	subHeaderStyle  = lipgloss.NewStyle().Foreground(cNeonGreen).Bold(true)

	// Panels
	sidebarBaseStyle = lipgloss.NewStyle().
				BorderStyle(lipgloss.RoundedBorder()).
				Padding(0, 1)

	contentBaseStyle = lipgloss.NewStyle().
				BorderStyle(lipgloss.RoundedBorder()).
				Padding(0, 2)

	// Footer
	footerStyle = lipgloss.NewStyle().Foreground(muted).PaddingTop(1)

	// Tab Styles
	activeTabBorder = tabBorderWithBottom("┘", " ", "└")
	tabBorder       = tabBorderWithBottom("┴", "─", "┴")
	activeTabStyle  = lipgloss.NewStyle().
			Border(activeTabBorder, true).
			Foreground(cNeonGreen).
			Bold(true).
			Padding(0, 1)
	inactiveTabStyle = lipgloss.NewStyle().
				Border(tabBorder, true).
				Foreground(cGrey).
				Padding(0, 1)
	tabGapStyle = lipgloss.NewStyle().
			Border(lipgloss.Border{
			Bottom: "─",
		}, false, false, true, false).
		Foreground(cGrey)
)

func applyTheme(theme terminalTheme) {
	cNeonGreen = theme.primary
	cNeonBlue = theme.secondary
	cPurple = theme.accent
	cPink = theme.highlight
	cCyan = theme.info
	cGrey = theme.text
	cDarkGrey = theme.panel
	cTagText = theme.tagText
	bgColor = theme.background
	muted = theme.dim
	soft = theme.soft
	rebuildThemeStyles()
}

func rebuildThemeStyles() {
	logoStyle = lipgloss.NewStyle().Foreground(cNeonGreen)
	subHeaderStyle = lipgloss.NewStyle().Foreground(cNeonGreen).Bold(true)

	footerStyle = lipgloss.NewStyle().Foreground(muted).PaddingTop(1)

	activeTabStyle = lipgloss.NewStyle().
		Border(activeTabBorder, true).
		Foreground(cNeonGreen).
		Bold(true).
		Padding(0, 1)
	inactiveTabStyle = lipgloss.NewStyle().
		Border(tabBorder, true).
		Foreground(cGrey).
		Padding(0, 1)
	tabGapStyle = lipgloss.NewStyle().
		Border(lipgloss.Border{
			Bottom: "─",
		}, false, false, true, false).
		Foreground(cGrey)

	blogCardStyle = lipgloss.NewStyle().
		BorderStyle(lipgloss.RoundedBorder()).
		BorderForeground(cNeonBlue).
		Padding(1, 2).
		Width(100).
		Height(7)

	blogCardTitleStyle = lipgloss.NewStyle().
		Bold(true).
		Foreground(cNeonGreen).
		Width(40)

	blogCardDateStyle = lipgloss.NewStyle().
		Foreground(cCyan).
		Italic(true).
		Width(20)

	blogCardDescStyle = lipgloss.NewStyle().
		Foreground(cGrey).
		Width(55)

	blogCardTagStyle = lipgloss.NewStyle().
		Background(cPurple).
		Foreground(cTagText).
		Padding(0, 1).
		MarginRight(1)

	blogCardLinkStyle = lipgloss.NewStyle().
		Foreground(cPink).
		Underline(true)
}

func tabBorderWithBottom(left, middle, right string) lipgloss.Border {
	border := lipgloss.RoundedBorder()
	border.BottomLeft = left
	border.Bottom = middle
	border.BottomRight = right
	return border
}

type layoutMode int

const (
	layoutColumns layoutMode = iota
	layoutStack
)

// --- Blog Types ---

type BlogPost struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	URL         string `json:"url"`
	PublishedAt string `json:"published_at"`
	Tags        string `json:"tags"`
	CoverImage  string `json:"cover_image"`
}

const devtoUsername = "dilutewater"

type blogFetchMsg struct {
	posts []BlogPost
	err   error
}

const blogFetchTimeout = 8 * time.Second

var (
	blogClient = &http.Client{Timeout: blogFetchTimeout}

	blogCache = struct {
		sync.RWMutex
		posts      []BlogPost
		err        error
		updatedAt  time.Time
		refreshing bool
	}{}
)

func fetchBlogPostsFromRemote() ([]BlogPost, error) {
	url := fmt.Sprintf("https://dev.to/api/articles?username=%s&per_page=10", devtoUsername)
	resp, err := blogClient.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		return nil, fmt.Errorf("dev.to returned %s", resp.Status)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var posts []BlogPost
	if err := json.Unmarshal(body, &posts); err != nil {
		return nil, err
	}

	return posts, nil
}

func copyBlogPosts(posts []BlogPost) []BlogPost {
	if len(posts) == 0 {
		return nil
	}
	copied := make([]BlogPost, len(posts))
	copy(copied, posts)
	return copied
}

func cachedBlogPosts() (posts []BlogPost, fetchError error, refreshing bool) {
	blogCache.RLock()
	defer blogCache.RUnlock()
	return copyBlogPosts(blogCache.posts), blogCache.err, blogCache.refreshing
}

func refreshBlogPosts() tea.Msg {
	posts, err := fetchBlogPostsFromRemote()
	if err == nil {
		go warmBlogThumbnails(copyBlogPosts(posts))
	}
	return blogFetchMsg{posts: posts, err: err}
}

func startBlogRefresh() tea.Cmd {
	blogCache.Lock()
	if blogCache.refreshing {
		blogCache.Unlock()
		return nil
	}
	blogCache.refreshing = true
	blogCache.Unlock()
	return refreshBlogPosts
}

func finishBlogRefresh(posts []BlogPost, err error) {
	blogCache.Lock()
	defer blogCache.Unlock()

	blogCache.refreshing = false
	if err != nil {
		blogCache.err = err
		return
	}

	blogCache.posts = copyBlogPosts(posts)
	blogCache.err = nil
	blogCache.updatedAt = time.Now()
}

func warmBlogCacheOnStartup() {
	cmd := startBlogRefresh()
	if cmd == nil {
		return
	}

	go func() {
		msg := cmd()
		if fetchMsg, ok := msg.(blogFetchMsg); ok {
			finishBlogRefresh(fetchMsg.posts, fetchMsg.err)
			if fetchMsg.err != nil {
				log.Printf("initial blog cache warmup failed: %v", fetchMsg.err)
			}
		}
	}()
}

// --- ASCII Art ---

const logoText = `██████╗  █████╗  ██████╗ ██╗  ██╗ ██████╗████████╗
██╔══██╗██╔══██╗██╔════╝ ██║  ██║   ██║   ╚══██╔══╝
██████╔╝███████║██║      ███████║   ██║      ██║
██╔══██╗██╔══██║██║      ██╔══██║   ██║      ██║
██║  ██║██║  ██║╚██████╗ ██║  ██║ ██████╗    ██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝`

const targetSubHeader = ">> Caffeine Powered BitFlipper <<"
const helpText = "↑/↓: Navigate • ←/→: Tabs • t: Theme • PgUp/PgDn: Scroll • Esc: Back"

// --- Content Data ---

var contentMap = map[string]string{
	"About Me": `
# 👾 Hello, World!

I'm **Rachit Khurana**, a Full Stack Engineer passionate about building scalable web applications and exploring decentralized technologies.

## 🚀 About Me
- **Role:** Full Stack Developer
- **Stack:** Next.js, Python, Solidity, Go
- **Passions:** Open Source, Web3, Hackathons

> "Caffeine Powered Bit Flipper"
`,
	"Experience": `
# 💼 Experience

## 💼 Work Experience

### **Hyathi Technologies**
*Full Stack & Web3 Developer Intern* (Dec 2024 - Present)
Working on a variety of projects involving Full Stack and Web3 technologies for enterprise clients.

**Tech:** React, Next.js, Node.js, Rust, Tauri, Solidity, Python

### **ClearMind AI**
*Full Stack Developer Intern* (Jun 2023 - Aug 2023)
Engineered the ClearMind Journaling Web App using Next.js and Tailwind, integrating OpenAI and Azure APIs. Scaled to 45k+ users.

**Tech:** Next.js, TailwindCSS, OpenAI API, Azure

---

## 👥 Community Experience

### **Microsoft Learn Student Ambassadors**
*Beta MLSA* (Sep 2023 - Present)
Conducting workshops, mentoring students, and building a community around Microsoft technologies.

**Tech:** Azure, Public Speaking, Community Building

### **CSI Bennett University**
*Chief Technical Officer* (Aug 2023 - Aug 2024)
Led technical initiatives and managed the tech team for university events and workshops.

**Tech:** Leadership, Event Management, Technical Planning

### **GDSC Bennett University**
*Tech Team Member* (Nov 2022 - Aug 2023)
Conducted events including the flagship Google Week.

**Tech:** Google Cloud, Web Development
`,
	"Projects": `
# 🛠️ Selected Projects

## 1. **Ryla**
> *Stack: NextJS, Convex, Python*
> An AI-powered Basecamp project management Slack bot that lets you control all your project management tasks on Basecamp using natural language.
> [Live Demo](https://ryla.rcht.dev)

## 2. **Jist**
> *Stack: Kotlin, Android, Jetpack Compose*
> An AI powered notification manager that intelligently organizes and summarizes your notifications.
> [GitHub](https://github.com/notnotrachit/jist)

## 3. **Owwn**
> *Stack: Tanstack, Convex*
> An expense splitting web app built with modern tech.
> [Live Demo](https://owwn.rcht.dev/) | [GitHub](https://github.com/notnotrachit/owwn)

## 4. **DevComplete**
> *Stack: Python, Django, Azure*
> An AI powered 1v1 Coding Contest Platform with real-time code collaboration and auto evaluation.
> [GitHub](https://github.com/notnotrachit/devcomplete)

## 5. **ClubKonnect**
> *Stack: Python, Django, Tailwind*
> A complete recruitment platform for university clubs with OAuth.
> [GitHub](https://github.com/notnotrachit/ClubKonnect)

## 6. **Sharepal**
> *Stack: GoLang, React Native, MongoDB*
> Group expense splitting mobile application.
> [GitHub](https://github.com/notnotrachit/sharepal)

## 7. **Re-Dcrypt**
> *Stack: Python, Django, HTML, CSS, JS*
> A full stack web platform for organising cryptic hunt.
> [GitHub](https://github.com/Re-Dcrypt/redcrypt)
`,
	"Skills": `
# ⚡ Tech Stack

` + "```" + `
   _____ __    _ ___
  / ___// /__ (_) / /____
  \__ \/ //_// / / / ___/
 ___/ / ,<  / / / (__  )
/____/_/|_|/_/_/_/____/
` + "```" + `

### 💻 Languages
- 🐍 **Python**
- 🐹 **Golang**
- 📘 **TypeScript**
- 🦀 **Rust**
- ☕ **Java**
- 📜 **JavaScript**
- ⛓️ **Solidity**
- ➕ **C++**
- 🗄️ **SQL**

### 🛠️ Frameworks
- ⚛️ **React**
- ▲ **Next.js**
- 🎸 **Django**
- 🌶️ **Flask**
- ⚡ **FastAPI**
- 🎨 **Tailwind**

### ☁️ Infrastructure
- 🐳 **Docker**
- ☁️ **AWS**
- ☁️ **Azure**
- 🐧 **Linux**
- 🐙 **Git**
- 🚀 **CI/CD**
- 🐘 **Postgres**
- 🍃 **Mongo**
- 🔺 **Redis**
`,
	"Education": `
# 🎓 Education & Certifications

## 📚 Academic Background

### **Bennett University**
*BTech CSE* (2022 - 2026)
- Ongoing

### **Sardar Patel Vidyalaya**
*XI - XII* (2020 - 2022)
- XII Boards - 84.8%

### **Apeejay School Noida**
*Nursery - X* (2008 - 2020)
- X Boards - 90.2%

---

## 🏆 Certifications

### **AWS Certified Cloud Practitioner**
*Amazon Web Services* (2024)
- [View Credential](https://www.credly.com/badges/435b1a30-5f35-4341-a33b-d5a484824583/public_url)

### **Google IT Automation with Python**
*Grow With Google* (2023)
- [View Credential](https://www.coursera.org/account/accomplishments/specialization/certificate/ELE2UKYHP4HQ)

### **Introduction to Computers and Operating Systems and Security**
*Microsoft* (2024)
- [View Credential](https://www.coursera.org/account/accomplishments/records/5Y6ZMZNFBBBH)

### **The Bits and Bytes of Computer Networking**
*Google* (2024)
- [View Credential](https://coursera.org/verify/F4GARCTVDKDS)
`,
}

// --- Model ---

type model struct {
	viewport   viewport.Model
	renderer   *glamour.TermRenderer
	activeItem string
	width      int
	height     int
	quitting   bool
	ready      bool
	showHelp   bool

	tabs           []string
	activeTabIndex int
	themeIndex     themeIndex

	// Animation
	subHeaderIdx  int
	subHeaderShow string

	// computed layout
	headerH int
	footerH int
	tabsH   int
	mainH   int

	// Blog
	blogPosts      []BlogPost
	blogFetched    bool
	blogFetchError error
	blogLoading    bool

	// Analytics
	sessionID  string
	startTime  time.Time
	tabsViewed []string
	lastTab    string
}

type tickMsg time.Time

func tick() tea.Cmd {
	return tea.Tick(50*time.Millisecond, func(t time.Time) tea.Msg {
		return tickMsg(t)
	})
}

func initialModel(r *glamour.TermRenderer) model {
	tabs := []string{"About Me", "Experience", "Projects", "Skills", "Education", "Achievements", "Blog"}
	return model{
		tabs:           tabs,
		activeTabIndex: 0,
		themeIndex:     themeNeon,
		renderer:       r,
		activeItem:     tabs[0],
		blogPosts:      []BlogPost{},
		blogFetched:    false,
	}
}

func (m model) Init() tea.Cmd {
	return tick()
}

func (m *model) syncBlogCache() {
	posts, fetchError, refreshing := cachedBlogPosts()
	m.blogPosts = posts
	m.blogFetched = len(posts) > 0
	m.blogFetchError = fetchError
	m.blogLoading = refreshing
}

func (m *model) refreshBlogCacheInBackground() tea.Cmd {
	m.syncBlogCache()
	cmd := startBlogRefresh()
	m.syncBlogCache()
	m.updateViewportContent()
	if cmd == nil && m.blogLoading {
		return tick()
	}
	return cmd
}

func (m *model) cycleTheme() {
	m.themeIndex = themeIndex((int(m.themeIndex) + 1) % len(themes))
	applyTheme(themes[m.themeIndex])
	m.recalcLayout()
}

func (m model) applyTheme() {
	applyTheme(themes[m.themeIndex])
}

func clamp(min, v, max int) int {
	if v < min {
		return min
	}
	if v > max {
		return max
	}
	return v
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

func truncateToWidth(s string, w int) string {
	if w <= 0 {
		return ""
	}
	if lipgloss.Width(s) <= w {
		return s
	}
	// Simple truncation; good enough for ASCII/help strings.
	// We avoid wrapping at all costs.
	runes := []rune(s)
	for len(runes) > 0 && lipgloss.Width(string(runes)+"…") > w {
		runes = runes[:len(runes)-1]
	}
	if len(runes) == 0 {
		return ""
	}
	return string(runes) + "…"
}

func (m *model) handleMouseEvent(msg tea.MouseMsg) (model, tea.Cmd) {
	event := msg

	log.Printf("handleMouseEvent: X=%d, Y=%d, Type=%d, headerH=%d, tabsH=%d",
		event.X, event.Y, event.Type, m.headerH, m.tabsH)

	// Check if click is in the tabs area
	tabStartY := m.headerH
	tabEndY := m.headerH + m.tabsH

	log.Printf("Tab area: Y=%d to Y=%d", tabStartY, tabEndY)

	// Check if click is within tab row
	if event.Y < tabStartY || event.Y >= tabEndY {
		log.Printf("Click outside tab area")
		return *m, nil
	}

	// Find which tab was clicked by checking X position
	currentX := 0
	for i, tab := range m.tabs {
		tabWidth := lipgloss.Width(tab) + 2
		log.Printf("Tab %d: '%s' at X=%d to X=%d, clicked at X=%d", i, tab, currentX, currentX+tabWidth, event.X)
		if event.X >= currentX && event.X < currentX+tabWidth {
			log.Printf("Clicked on tab %d: %s", i, tab)
			if i != m.activeTabIndex {
				m.activeTabIndex = i
				m.activeItem = m.tabs[i]
				trackEvent(m.sessionID, "tab_switch", m.activeItem)
				if !contains(m.tabsViewed, m.activeItem) {
					m.tabsViewed = append(m.tabsViewed, m.activeItem)
				}
				m.updateViewportContent()
				m.viewport.GotoTop()
				if m.activeItem == "Blog" {
					return *m, m.refreshBlogCacheInBackground()
				}
			}
			return *m, nil
		}
		currentX += tabWidth + 1
	}

	return *m, nil
}

func (m model) headerView() string {
	// Center the entire block manually to preserve internal alignment.
	lines := strings.Split(logoText, "\n")
	var maxWidth int
	for _, l := range lines {
		if w := lipgloss.Width(l); w > maxWidth {
			maxWidth = w
		}
	}

	leftPad := max(0, (m.width-maxWidth)/2)
	pad := strings.Repeat(" ", leftPad)

	var centeredLogo strings.Builder
	for i, line := range lines {
		centeredLogo.WriteString(pad + line)
		if i < len(lines)-1 {
			centeredLogo.WriteString("\n")
		}
	}

	logo := logoStyle.Render(centeredLogo.String())
	sub := subHeaderStyle.Render(lipgloss.PlaceHorizontal(m.width, lipgloss.Center, m.subHeaderShow))
	return headerWrapStyle.Render(lipgloss.JoinVertical(lipgloss.Top, logo, sub))
}

func (m model) footerView() string {
	// Global focus, no need to show specific focus area
	themeName := themes[m.themeIndex].name
	right := lipgloss.NewStyle().Foreground(soft).Render("Section: " + m.activeItem + " • Theme: " + themeName)

	keys := "←/→:nav tabs  ↑/↓:scroll  t:theme  q:quit"
	if m.showHelp {
		keys = "esc:close help"
	} else if m.activeItem == "Blog" {
		keys = "←/→:nav  ↑/↓:scroll  r:refresh  t:theme  q:quit"
	}
	keys = truncateToWidth(keys, m.width)

	row := lipgloss.PlaceHorizontal(m.width, lipgloss.Center, right)
	hints := lipgloss.PlaceHorizontal(m.width, lipgloss.Center, keys)
	return footerStyle.Render(lipgloss.JoinVertical(lipgloss.Top, row, hints))
}

func (m *model) recalcLayout() {
	if m.width <= 0 || m.height <= 0 {
		return
	}
	m.applyTheme()

	header := m.headerView()
	footer := m.footerView()
	// Calculate tabs height (approximated, or render a dummy to measure)
	// Tabs are usually 3 lines high (border + text + border)
	tabs := m.tabsView()

	m.headerH = lipgloss.Height(header)
	m.footerH = lipgloss.Height(footer)
	m.tabsH = lipgloss.Height(tabs)

	m.mainH = max(0, m.height-m.headerH-m.footerH-m.tabsH)

	// Base frame sizes (border + padding). Avoid margins in frame math.
	contentFrameW, contentFrameH := contentBaseStyle.GetFrameSize()

	// Content width is full width
	contentW := max(0, m.width)

	vpW := max(0, contentW-contentFrameW)
	vpH := max(0, m.mainH-contentFrameH)
	m.viewport.Width = vpW
	m.viewport.Height = vpH

	m.updateViewportContent()
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var (
		cmd  tea.Cmd
		cmds []tea.Cmd
	)

	switch msg := msg.(type) {
	case tickMsg:
		if m.activeItem == "Blog" && m.blogLoading {
			m.syncBlogCache()
			m.updateViewportContent()
			if m.blogLoading {
				return m, tick()
			}
		}
		if m.subHeaderIdx < len(targetSubHeader) {
			m.subHeaderIdx++
			m.subHeaderShow = targetSubHeader[:m.subHeaderIdx]
			return m, tick()
		}
		return m, nil

	case tea.KeyMsg:
		if msg.String() == "?" {
			m.showHelp = !m.showHelp
			return m, nil
		}
		if m.showHelp {
			if msg.String() == "esc" {
				m.showHelp = false
			}
			return m, nil
		}

		if msg.String() == "ctrl+c" || msg.String() == "q" {
			m.quitting = true
			// Track session end
			duration := time.Since(m.startTime)
			trackSessionEnd(m.sessionID, duration, m.tabsViewed)
			return m, tea.Quit
		}

		if msg.String() == "t" {
			m.cycleTheme()
			return m, nil
		}

		// Tab Navigation (Left/Right/h/l)
		switch msg.String() {
		case "left", "h":
			oldTab := m.activeItem
			m.activeTabIndex--
			if m.activeTabIndex < 0 {
				m.activeTabIndex = len(m.tabs) - 1
			}
			m.activeItem = m.tabs[m.activeTabIndex]
			// Track tab switch
			if m.activeItem != oldTab {
				trackEvent(m.sessionID, "tab_switch", m.activeItem)
				if !contains(m.tabsViewed, m.activeItem) {
					m.tabsViewed = append(m.tabsViewed, m.activeItem)
				}
			}
			m.updateViewportContent()
			m.viewport.GotoTop() // Reset scroll
			// Show cached blog posts immediately and refresh in the background.
			if m.activeItem == "Blog" {
				return m, m.refreshBlogCacheInBackground()
			}
			return m, nil
		case "right", "l":
			oldTab := m.activeItem
			m.activeTabIndex++
			if m.activeTabIndex >= len(m.tabs) {
				m.activeTabIndex = 0
			}
			m.activeItem = m.tabs[m.activeTabIndex]
			// Track tab switch
			if m.activeItem != oldTab {
				trackEvent(m.sessionID, "tab_switch", m.activeItem)
				if !contains(m.tabsViewed, m.activeItem) {
					m.tabsViewed = append(m.tabsViewed, m.activeItem)
				}
			}
			m.updateViewportContent()
			m.viewport.GotoTop() // Reset scroll
			// Show cached blog posts immediately and refresh in the background.
			if m.activeItem == "Blog" {
				return m, m.refreshBlogCacheInBackground()
			}
			return m, nil
		}

		// Refresh blog posts with 'r' while continuing to show cached content.
		if msg.String() == "r" && m.activeItem == "Blog" {
			return m, m.refreshBlogCacheInBackground()
		}

		// Viewport Scrolling (Up/Down/j/k handled by viewport.Update)
		m.viewport, cmd = m.viewport.Update(msg)
		cmds = append(cmds, cmd)
		return m, tea.Batch(cmds...)

	case tea.WindowSizeMsg:
		m.width = msg.Width
		m.height = msg.Height
		m.ready = true
		m.recalcLayout()

	case blogFetchMsg:
		finishBlogRefresh(msg.posts, msg.err)
		m.syncBlogCache()
		m.updateViewportContent()
		return m, nil

	case tea.MouseMsg:
		log.Printf("Mouse event received: %+v", msg)
		return m.handleMouseEvent(msg)
	}

	return m, tea.Batch(cmds...)
}

var (
	// Blog Card Styles - Horizontal layout
	blogCardStyle = lipgloss.NewStyle().
			BorderStyle(lipgloss.RoundedBorder()).
			BorderForeground(cNeonBlue).
			Padding(1, 2).
			Width(100).
			Height(7)

	blogCardTitleStyle = lipgloss.NewStyle().
				Bold(true).
				Foreground(cNeonGreen).
				Width(40)

	blogCardDateStyle = lipgloss.NewStyle().
				Foreground(cCyan).
				Italic(true).
				Width(20)

	blogCardDescStyle = lipgloss.NewStyle().
				Foreground(cGrey).
				Width(55)

	blogCardTagStyle = lipgloss.NewStyle().
				Background(cPurple).
				Foreground(lipgloss.Color("#FFFFFF")).
				Padding(0, 1).
				MarginRight(1)

	blogCardLinkStyle = lipgloss.NewStyle().
				Foreground(cPink).
				Underline(true)
)

func formatBlogPosts(posts []BlogPost, fetchError error, isLoading bool, width int) string {
	headerStyle := lipgloss.NewStyle().Bold(true).Foreground(cNeonGreen)
	subHeaderStyle := lipgloss.NewStyle().Foreground(cGrey)
	linkStyle := lipgloss.NewStyle().Foreground(cPink)

	// Dynamic card width based on terminal width
	cardWidth := width
	if cardWidth < 60 {
		cardWidth = 60
	}

	if isLoading && len(posts) == 0 {
		var sb strings.Builder
		sb.WriteString(headerStyle.Render("📝 Latest Blog Posts"))
		sb.WriteString("\n\n")
		sb.WriteString(subHeaderStyle.Render("⏳ Preparing cached posts from dev.to..."))
		sb.WriteString("\n")
		sb.WriteString(subHeaderStyle.Render("You can keep navigating while this updates."))
		return sb.String()
	}

	if fetchError != nil && len(posts) == 0 {
		var sb strings.Builder
		sb.WriteString(headerStyle.Render("📝 Latest Blog Posts"))
		sb.WriteString("\n\n")
		sb.WriteString(fmt.Sprintf("⚠️ Error fetching posts: %v", fetchError))
		sb.WriteString("\n")
		sb.WriteString(subHeaderStyle.Render("Please check your internet connection."))
		return sb.String()
	}

	if len(posts) == 0 {
		var sb strings.Builder
		sb.WriteString(headerStyle.Render("📝 Latest Blog Posts"))
		sb.WriteString("\n\n")
		sb.WriteString("No posts found. Visit ")
		sb.WriteString(linkStyle.Render("dev.to/@" + devtoUsername))
		sb.WriteString(" for the latest articles.")
		return sb.String()
	}

	var sb strings.Builder
	// Header with Lipgloss styles (not markdown)
	sb.WriteString(headerStyle.Render("📝 Latest Blog Posts"))
	sb.WriteString("\n")
	sb.WriteString(subHeaderStyle.Render("Cached articles from " + linkStyle.Render("dev.to/@"+devtoUsername)))
	sb.WriteString("\n")

	gap := 2
	cardsPerRow := 1
	if width >= 140 {
		cardsPerRow = 2
	}

	cardW := cardWidth
	if cardsPerRow == 2 {
		cardW = max(50, (cardWidth-gap)/2)
	}

	for i := 0; i < len(posts); i += cardsPerRow {
		var row []string
		for j := 0; j < cardsPerRow && i+j < len(posts); j++ {
			row = append(row, formatBlogCard(posts[i+j], cardW))
		}
		sb.WriteString(lipgloss.JoinHorizontal(lipgloss.Top, row...))
		sb.WriteString("\n")
	}

	// CTA at bottom
	ctaText := "See all of my blogs on dev.to"
	ctaURL := "https://dev.to/@" + devtoUsername
	ctaStyle := lipgloss.NewStyle().
		BorderStyle(lipgloss.RoundedBorder()).
		BorderForeground(cPink).
		Foreground(cGrey).
		Bold(true).
		Padding(0, 2)
	urlStyle := lipgloss.NewStyle().Foreground(cPink).Underline(true)

	ctaRendered := ctaStyle.Render(ctaText)
	ctaRendered = lipgloss.PlaceHorizontal(max(0, width), lipgloss.Center, ctaRendered)
	urlRendered := lipgloss.PlaceHorizontal(max(0, width), lipgloss.Center, urlStyle.Render(ctaURL))

	sb.WriteString("\n")
	sb.WriteString(ctaRendered)
	sb.WriteString("\n")
	sb.WriteString(urlRendered)
	sb.WriteString("\n")

	return sb.String()
}

// --- Thumbnails ---

var (
	thumbCache = struct {
		sync.RWMutex
		items map[string]string
	}{items: map[string]string{}}

	imageCache = struct {
		sync.RWMutex
		items map[string]image.Image
	}{items: map[string]image.Image{}}
)

func blendOver(bg uint8, c uint8, a uint8) uint8 {
	// (c*a + bg*(255-a)) / 255
	return uint8((uint16(c)*uint16(a) + uint16(bg)*uint16(255-a)) / 255)
}

func cachedCoverImage(imageURL string) (image.Image, bool) {
	imageCache.RLock()
	defer imageCache.RUnlock()
	img, ok := imageCache.items[imageURL]
	return img, ok
}

func fetchAndCacheCoverImage(imageURL string) error {
	if imageURL == "" {
		return nil
	}
	if _, ok := cachedCoverImage(imageURL); ok {
		return nil
	}

	resp, err := blogClient.Get(imageURL)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		return fmt.Errorf("image returned %s", resp.Status)
	}

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	img, _, err := image.Decode(bytes.NewReader(data))
	if err != nil {
		return err
	}

	imageCache.Lock()
	imageCache.items[imageURL] = img
	imageCache.Unlock()
	return nil
}

func warmBlogThumbnails(posts []BlogPost) {
	for _, post := range posts {
		if post.CoverImage == "" {
			continue
		}
		if err := fetchAndCacheCoverImage(post.CoverImage); err != nil {
			log.Printf("failed to warm blog cover image %q: %v", post.CoverImage, err)
		}
	}
}

func renderBlockThumbnail(imageURL string, cols, rows int) (string, error) {
	if cols <= 0 || rows <= 0 {
		return "", nil
	}
	key := fmt.Sprintf("%s|%dx%d|%02x%02x%02x", imageURL, cols, rows, bgColor[0], bgColor[1], bgColor[2])
	thumbCache.RLock()
	v, ok := thumbCache.items[key]
	thumbCache.RUnlock()
	if ok {
		return v, nil
	}

	img, ok := cachedCoverImage(imageURL)
	if !ok {
		return "", nil
	}

	// Two vertical pixels per cell using the upper half-block character.
	resized := resize.Resize(uint(cols), uint(rows*2), img, resize.Lanczos3)
	rgba := image.NewRGBA(resized.Bounds())
	draw.Draw(rgba, rgba.Bounds(), resized, resized.Bounds().Min, draw.Src)

	// Blend transparent pixels over the active app background.
	bgR, bgG, bgB := bgColor[0], bgColor[1], bgColor[2]

	var out bytes.Buffer
	out.Grow((cols*rows)*24 + rows)

	curFg := [3]uint8{0, 0, 0}
	curBg := [3]uint8{0, 0, 0}
	set := false

	for y := 0; y < rows*2; y += 2 {
		set = false
		for x := 0; x < cols; x++ {
			t := rgba.RGBAAt(x, y)
			b := rgba.RGBAAt(x, y+1)

			tr := blendOver(bgR, t.R, t.A)
			tg := blendOver(bgG, t.G, t.A)
			tb := blendOver(bgB, t.B, t.A)
			br := blendOver(bgR, b.R, b.A)
			bg := blendOver(bgG, b.G, b.A)
			bb := blendOver(bgB, b.B, b.A)

			fg := [3]uint8{tr, tg, tb}
			bgc := [3]uint8{br, bg, bb}

			if !set || fg != curFg || bgc != curBg {
				curFg, curBg = fg, bgc
				set = true
				out.WriteString(fmt.Sprintf("\x1b[38;2;%d;%d;%dm\x1b[48;2;%d;%d;%dm", fg[0], fg[1], fg[2], bgc[0], bgc[1], bgc[2]))
			}
			out.WriteRune('▀')
		}
		out.WriteString("\x1b[0m")
		if y < (rows*2)-2 {
			out.WriteByte('\n')
		}
	}

	res := out.String()
	thumbCache.Lock()
	thumbCache.items[key] = res
	thumbCache.Unlock()
	return res, nil
}

func wrapText(s string, width int) []string {
	var lines []string
	words := strings.Fields(s)
	currentLine := ""

	for _, word := range words {
		testLine := currentLine
		if testLine != "" {
			testLine += " "
		}
		testLine += word

		if lipgloss.Width(testLine) <= width {
			currentLine = testLine
		} else {
			if currentLine != "" {
				lines = append(lines, currentLine)
			}
			currentLine = word
		}
	}
	if currentLine != "" {
		lines = append(lines, currentLine)
	}

	return lines
}

func formatBlogCard(post BlogPost, cardWidth int) string {
	pubDate, _ := time.Parse(time.RFC3339, post.PublishedAt)
	formattedDate := pubDate.Format("Jan 2, 2006")

	baseStyle := lipgloss.NewStyle().
		BorderStyle(lipgloss.RoundedBorder()).
		BorderForeground(cNeonBlue).
		Padding(1, 2)
	frameW, frameH := baseStyle.GetFrameSize()
	innerW := max(10, cardWidth-frameW)

	thumbH := 14
	titleMaxLines := 2
	innerH := thumbH + 7 // thumb + spacer + title(2) + date + tags + link label + url

	cardStyle := baseStyle.
		Width(cardWidth).
		Height(innerH + frameH)

	// Thumbnail (high-res, color) using half-block rendering.
	thumb := lipgloss.NewStyle().Width(innerW).Height(thumbH).Render(strings.Repeat("\n", thumbH-1))
	if post.CoverImage != "" {
		if t, err := renderBlockThumbnail(post.CoverImage, innerW, thumbH); err == nil && t != "" {
			thumb = t
		}
	}

	// Title (wrap, max 2 lines)
	lines := wrapText(post.Title, innerW)
	if len(lines) > titleMaxLines {
		lines = lines[:titleMaxLines]
		last := lines[titleMaxLines-1]
		lines[titleMaxLines-1] = truncateToWidth(last, max(0, innerW-1)) + "…"
	}
	titleStyle := lipgloss.NewStyle().Bold(true).Foreground(cNeonGreen)
	for i := range lines {
		lines[i] = titleStyle.Render(lines[i])
	}
	title := strings.Join(lines, "\n")

	date := blogCardDateStyle.Render("📅 " + formattedDate)

	// Tags (fit on one line)
	tagsLine := ""
	if post.Tags != "" {
		tags := strings.Split(post.Tags, ",")
		var built strings.Builder
		for _, raw := range tags {
			tag := strings.TrimSpace(raw)
			if tag == "" {
				continue
			}
			badge := blogCardTagStyle.Render(tag)
			cand := badge
			if built.Len() > 0 {
				cand = built.String() + " " + badge
			}
			if lipgloss.Width(cand) > innerW {
				break
			}
			if built.Len() > 0 {
				built.WriteString(" ")
			}
			built.WriteString(badge)
		}
		tagsLine = built.String()
	}

	// Build clickable OSC-8 hyperlink that won't wrap
	osc8 := "\x1b]8;;" + post.URL + "\x1b\\"
	closeOsc8 := "\x1b]8;;\x1b\\"
	linkText := "🔗 Read on dev.to →"
	linkLine := osc8 + linkText + closeOsc8
	linkStyle := lipgloss.NewStyle().Foreground(cPink).Bold(true)
	linkRendered := linkStyle.Render(linkLine)

	cardLines := []string{}
	cardLines = append(cardLines, strings.Split(thumb, "\n")...)
	cardLines = append(cardLines, "")
	cardLines = append(cardLines, strings.Split(title, "\n")...)
	cardLines = append(cardLines, date)
	cardLines = append(cardLines, tagsLine)
	cardLines = append(cardLines, linkRendered)

	for len(cardLines) < innerH {
		cardLines = append(cardLines, "")
	}
	if len(cardLines) > innerH {
		cardLines = cardLines[:innerH]
	}

	body := strings.Join(cardLines, "\n")
	return cardStyle.Render(body)
}

func (m *model) updateViewportContent() {
	m.applyTheme()
	switch m.activeItem {
	case "Blog":
		content := formatBlogPosts(m.blogPosts, m.blogFetchError, m.blogLoading, m.viewport.Width)
		m.viewport.SetContent(content)
	case "Experience":
		content := formatExperienceContent(m.viewport.Width)
		m.viewport.SetContent(content)
	case "Skills":
		content := formatSkillsContent(m.viewport.Width)
		m.viewport.SetContent(content)
	case "Achievements":
		content := formatAchievementsContent(m.viewport.Width)
		m.viewport.SetContent(content)
	default:
		mdContent := contentMap[m.activeItem]
		m.renderer, _ = glamour.NewTermRenderer(
			glamour.WithStandardStyle("dark"),
			glamour.WithWordWrap(m.viewport.Width),
		)
		rendered, _ := m.renderer.Render(mdContent)
		m.viewport.SetContent(rendered)
	}
}

func formatExperienceContent(width int) string {
	headerStyle := lipgloss.NewStyle().Bold(true).Foreground(cNeonGreen).MarginBottom(1)
	sectionStyle := lipgloss.NewStyle().Bold(true).Foreground(cCyan).MarginTop(1).MarginBottom(1)
	companyStyle := lipgloss.NewStyle().Bold(true).Foreground(lipgloss.Color("#FFFFFF"))
	roleStyle := lipgloss.NewStyle().Foreground(cGrey)
	periodStyle := lipgloss.NewStyle().Foreground(muted)
	descStyle := lipgloss.NewStyle().Foreground(cGrey).Width(45)
	tagStyle := lipgloss.NewStyle().Background(cPurple).Foreground(lipgloss.Color("#FFFFFF")).Padding(0, 1)

	gap := 4
	colWidth := max(40, (width-gap)/2)

	workItems := []struct {
		company string
		role    string
		period  string
		desc    string
		tech    []string
	}{
		{
			company: "Hyathi Technologies",
			role:    "Full Stack & Web3 Developer Intern",
			period:  "Dec 2024 - Present",
			desc:    "Working on a variety of projects involving Full Stack and Web3 technologies for enterprise clients.",
			tech:    []string{"React", "Next.js", "Node.js", "Rust", "Tauri", "Solidity", "Python"},
		},
		{
			company: "ClearMind AI",
			role:    "Full Stack Developer Intern",
			period:  "Jun 2023 - Aug 2023",
			desc:    "Engineered the ClearMind Journaling Web App using Next.js and Tailwind, integrating OpenAI and Azure APIs. Scaled to 45k+ users.",
			tech:    []string{"Next.js", "TailwindCSS", "OpenAI API", "Azure"},
		},
	}

	communityItems := []struct {
		company string
		role    string
		period  string
		desc    string
		tech    []string
	}{
		{
			company: "FOSS United College Chapter, Bennett University",
			role:    "Lead",
			period:  "Sep 2024 - Sep 2025",
			desc:    "Organized Linux Fest for open-source and Linux enthusiasts. Led BU Hacktoberfest to promote open-source contributions.",
			tech:    []string{"Open Source", "Linux", "Community Building", "Event Management"},
		},
		{
			company: "Microsoft Learn Student Ambassadors",
			role:    "Beta MLSA",
			period:  "Sep 2023 - Present",
			desc:    "Conducting workshops, mentoring students, and building a community around Microsoft technologies.",
			tech:    []string{"Azure", "Public Speaking", "Community Building"},
		},
		{
			company: "CSI Bennett University",
			role:    "Chief Technical Officer",
			period:  "Aug 2023 - Aug 2024",
			desc:    "Led technical initiatives and managed the tech team for university events and workshops.",
			tech:    []string{"Leadership", "Event Management", "Technical Planning"},
		},
		{
			company: "GDSC Bennett University",
			role:    "Tech Team Member",
			period:  "Nov 2022 - Aug 2023",
			desc:    "Conducted events including the flagship Google Week.",
			tech:    []string{"Google Cloud", "Web Development"},
		},
	}

	renderItem := func(item struct {
		company string
		role    string
		period  string
		desc    string
		tech    []string
	}, width int) string {
		var b strings.Builder
		b.WriteString(companyStyle.Render(item.company))
		b.WriteString("\n")
		b.WriteString(roleStyle.Render(item.role))
		b.WriteString("\n")
		b.WriteString(periodStyle.Render(item.period))
		b.WriteString("\n\n")
		b.WriteString(descStyle.Render(item.desc))
		b.WriteString("\n\n")
		var techs []string
		for _, t := range item.tech {
			techs = append(techs, tagStyle.Render(t))
		}
		b.WriteString(strings.Join(techs, " "))
		return b.String()
	}

	var leftCol strings.Builder
	leftCol.WriteString(sectionStyle.Render("💼 Work Experience"))
	leftCol.WriteString("\n\n")
	for i, item := range workItems {
		if i > 0 {
			leftCol.WriteString("\n\n")
		}
		leftCol.WriteString(renderItem(item, colWidth))
	}

	var rightCol strings.Builder
	rightCol.WriteString(sectionStyle.Render("👥 Community Experience"))
	rightCol.WriteString("\n\n")
	for i, item := range communityItems {
		if i > 0 {
			rightCol.WriteString("\n\n")
		}
		rightCol.WriteString(renderItem(item, colWidth))
	}

	var sb strings.Builder
	sb.WriteString(headerStyle.Render("💼 Experience"))
	sb.WriteString("\n\n")
	sb.WriteString(lipgloss.JoinHorizontal(lipgloss.Top, leftCol.String(), strings.Repeat(" ", gap), rightCol.String()))
	return sb.String()
}

func formatAchievementsContent(width int) string {
	headerStyle := lipgloss.NewStyle().Bold(true).Foreground(cNeonGreen).MarginBottom(1)
	titleStyle := lipgloss.NewStyle().Bold(true).Foreground(lipgloss.Color("#FFFFFF"))
	awardStyle := lipgloss.NewStyle().Foreground(cCyan)
	subAwardStyle := lipgloss.NewStyle().Foreground(muted)
	teammateStyle := lipgloss.NewStyle().Foreground(soft)

	achievements := []struct {
		title     string
		award     string
		subAward  string
		teammates []string
	}{
		{
			title:     "OnChain Summer Buildathon",
			award:     "Discovery Track Winner",
			teammates: []string{"Yash Raj", "Rakesh Sharma"},
		},
		{
			title:     "SheBuilds 2023",
			award:     "Special Mention",
			teammates: []string{"Yash Singh", "Vasvi Garg", "Pratibha Dureja"},
		},
		{
			title:     "Hedera Hello Future Hackathon",
			award:     "2nd Runner Up in AI Track",
			subAward:  "Fuelling Women's Innovation in Web3",
			teammates: []string{"Yash Raj", "Rakesh Sharma", "Urvashi Agarwal", "Harshita Malviya"},
		},
		{
			title:     "Hedera Hello Future 2 Hackathon",
			award:     "2nd Runner Up",
			subAward:  "Decentralized Identity and Verifiable Credentials Track",
			teammates: []string{"Yash Raj", "Rakesh Sharma", "Urvashi Agarwal", "Harshita Malviya"},
		},
		{
			title:     "EDU Chain Hackathon: Semester 3",
			award:     "5th Place in Miscellaneous Track",
			teammates: []string{"Vansh", "Urvashi Agarwal"},
		},
		{
			title:     "HopperHacks 2024",
			award:     "Best Diversity & Inclusion Hack",
			subAward:  "Stony Brook University",
			teammates: []string{"Yash Raj", "Aditya"},
		},
		{
			title:     "QubitX Hacks by YCW",
			award:     "2nd Runner Up",
			teammates: []string{"Yash Raj", "Aditya"},
		},
		{
			title:     "HackCBS 6.0",
			award:     "Domain track from GoDaddy",
			teammates: []string{"Khushi", "Ashish Kumar Verma"},
		},
		{
			title:     "VeChain Global Hackathon",
			award:     "3rd Prize in Social Impact track",
			teammates: []string{"Arnab Roy", "Sahil Nihalani"},
		},
	}

	var sb strings.Builder
	sb.WriteString(headerStyle.Render("🏆 Achievements"))
	sb.WriteString("\n\n")

	for _, a := range achievements {
		sb.WriteString(titleStyle.Render(a.title))
		sb.WriteString("\n")
		sb.WriteString(awardStyle.Render("🏆 " + a.award))
		if a.subAward != "" {
			sb.WriteString("\n")
			sb.WriteString(subAwardStyle.Render(a.subAward))
		}
		if len(a.teammates) > 0 {
			sb.WriteString("\n")
			sb.WriteString(teammateStyle.Render("with " + strings.Join(a.teammates, ", ")))
		}
		sb.WriteString("\n\n")
	}

	return sb.String()
}

func formatSkillsContent(width int) string {
	headerStyle := lipgloss.NewStyle().Bold(true).Foreground(cNeonGreen).MarginBottom(1)
	sectionStyle := lipgloss.NewStyle().Bold(true).Foreground(cCyan).MarginTop(1).MarginBottom(1)
	skillStyle := lipgloss.NewStyle().Foreground(cGrey)

	gap := 4
	colWidth := max(25, (width-gap)/3)

	languages := []string{"🐍 Python", "🐹 Golang", "📘 TypeScript", "🦀 Rust", "☕ Java", "📜 JavaScript", "⛓️ Solidity", "➕ C++", "🗄️ SQL"}
	frameworks := []string{"⚛️ React", "▲ Next.js", "🎸 Django", "🌶️ Flask", "⚡ FastAPI", "🎨 Tailwind"}
	infrastructure := []string{"🐳 Docker", "☁️ AWS", "☁️ Azure", "🐧 Linux", "🐙 Git", "🚀 CI/CD", "🐘 Postgres", "🍃 Mongo", "🔺 Redis"}

	renderCol := func(title string, items []string, w int) string {
		var b strings.Builder
		b.WriteString(sectionStyle.Render(title))
		b.WriteString("\n")
		for _, item := range items {
			b.WriteString(skillStyle.Render(item))
			b.WriteString("\n")
		}
		return b.String()
	}

	leftCol := renderCol("💻 Languages", languages, colWidth)
	midCol := renderCol("🛠️ Frameworks", frameworks, colWidth)
	rightCol := renderCol("☁️ Infrastructure", infrastructure, colWidth)

	var sb strings.Builder
	sb.WriteString(headerStyle.Render("⚡ Tech Stack"))
	sb.WriteString("\n\n")
	sb.WriteString(lipgloss.JoinHorizontal(lipgloss.Top, leftCol, strings.Repeat(" ", gap), midCol, strings.Repeat(" ", gap), rightCol))
	return sb.String()
}

func glamourStyle(r *glamour.TermRenderer, str string) string {
	out, _ := r.Render(str)
	return out
}

func (m model) tabsView() string {
	var renderedTabs []string

	for i, t := range m.tabs {
		var style lipgloss.Style
		isFirst := i == 0
		isLast := i == len(m.tabs)-1
		isActive := i == m.activeTabIndex

		if isActive {
			style = activeTabStyle
		} else {
			style = inactiveTabStyle
		}

		border, _, _, _, _ := style.GetBorder()
		if isFirst && isActive {
			border.BottomLeft = "│"
		} else if isFirst && !isActive {
			border.BottomLeft = "├"
		} else if isLast && isActive {
			border.BottomRight = "│"
		} else if isLast && !isActive {
			border.BottomRight = "┤"
		}
		style = style.Border(border)

		renderedTabs = append(renderedTabs, style.Render(t))
	}

	row := lipgloss.JoinHorizontal(lipgloss.Top, renderedTabs...)
	gap := tabGapStyle.Render(strings.Repeat("─", max(0, m.width-lipgloss.Width(row)-2)))
	return lipgloss.JoinHorizontal(lipgloss.Bottom, row, gap)
}

func (m model) View() string {
	m.applyTheme()
	if m.quitting {
		msg := "Thanks for visiting!\n\nFeel free to check out the website: https://rcht.dev\n\nBye! 👋\n"
		return lipgloss.NewStyle().
			Foreground(cNeonGreen).
			Bold(true).
			Render(msg)
	}
	if !m.ready {
		return "\n  Initializing..."
	}

	header := m.headerView()
	tabs := m.tabsView()
	footer := m.footerView()

	// Focus-aware borders.
	contentBorder := cPink // Always active color
	contentStyle := contentBaseStyle.BorderForeground(contentBorder)

	var body string
	body = contentStyle.Width(m.width - 4).Height(m.mainH).Render(m.viewport.View())

	ui := lipgloss.JoinVertical(lipgloss.Left, header, tabs, body, footer)
	ui = appStyle.Render(ui)
	// Hard guarantee: never print more than the terminal height.
	return lipgloss.Place(m.width, m.height, lipgloss.Left, lipgloss.Top, ui)
}

// --- SSH Server ---

func teaHandler(s ssh.Session) (tea.Model, []tea.ProgramOption) {
	pty, _, active := s.Pty()
	if !active {
		fmt.Println("no active terminal, skipping")
		return nil, nil
	}

	lipgloss.SetColorProfile(termenv.TrueColor)
	// Prevent rune width mismatches over SSH/locales that can cause box-drawing/
	// block characters to measure inconsistently between lines.
	runewidth.EastAsianWidth = false
	runewidth.CreateLUT()

	r, _ := glamour.NewTermRenderer(
		glamour.WithStandardStyle("dark"),
		glamour.WithWordWrap(80),
	)

	// Extract session info for analytics
	sessionID := s.Context().SessionID()
	user := s.User()
	ip := s.RemoteAddr().String()
	clientVersion := s.Context().ClientVersion()
	ptyInfo, _, _ := s.Pty()
	terminalType := ptyInfo.Term
	width := ptyInfo.Window.Width
	height := ptyInfo.Window.Height

	// Track session start
	trackSessionStart(sessionID, user, ip, clientVersion, terminalType, width, height)

	// Enable mouse tracking - DECSET mode 1000 (basic), 1002 (cell motion), 1006 (SGR)
	// These need to be sent to the PTY to enable mouse reporting in xterm-compatible terminals
	fmt.Fprintf(pty.Slave, "\x1b[?1000h")
	fmt.Fprintf(pty.Slave, "\x1b[?1002h")
	fmt.Fprintf(pty.Slave, "\x1b[?1006h")

	m := initialModel(r)
	m.sessionID = sessionID
	m.startTime = time.Now()
	m.tabsViewed = []string{m.activeItem}

	// Initial update to set content
	m.updateViewportContent()

	// Track initial tab view
	trackEvent(sessionID, "tab_switch", m.activeItem)

	return m, []tea.ProgramOption{
		tea.WithAltScreen(),
		tea.WithMouseCellMotion(),
		tea.WithInput(pty.Slave),
		tea.WithOutput(pty.Slave),
	}
}

// --- Analytics ---

var mongoClient *mongo.Client
var analyticsCollection *mongo.Collection

func initAnalytics() {
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Println("MONGODB_URI not set, analytics disabled")
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Printf("Failed to connect to MongoDB: %v", err)
		return
	}

	if err := client.Ping(ctx, nil); err != nil {
		log.Printf("Failed to ping MongoDB: %v", err)
		return
	}

	mongoClient = client
	analyticsCollection = client.Database("portfolio").Collection("sessions")
	log.Println("Analytics connected to MongoDB")
}

func trackSessionStart(sessionID, user, ip, clientVersion, terminalType string, width, height int) {
	if analyticsCollection == nil {
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	doc := bson.M{
		"session_id":     sessionID,
		"user":           user,
		"ip_address":     ip,
		"client_version": clientVersion,
		"terminal_type":  terminalType,
		"window_width":   width,
		"window_height":  height,
		"start_time":     time.Now(),
		"tabs_viewed":    []string{},
		"events":         []bson.M{},
	}

	if _, err := analyticsCollection.InsertOne(ctx, doc); err != nil {
		log.Printf("Failed to track session start: %v", err)
	}
}

func trackSessionEnd(sessionID string, duration time.Duration, tabs []string) {
	if analyticsCollection == nil {
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"session_id": sessionID}
	update := bson.M{
		"$set": bson.M{
			"end_time":         time.Now(),
			"duration_seconds": duration.Seconds(),
			"tabs_viewed":      tabs,
		},
	}

	if _, err := analyticsCollection.UpdateOne(ctx, filter, update); err != nil {
		log.Printf("Failed to track session end: %v", err)
	}
}

func trackEvent(sessionID, eventType, tabName string) {
	if analyticsCollection == nil {
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	event := bson.M{
		"type":      eventType,
		"tab":       tabName,
		"timestamp": time.Now(),
	}

	filter := bson.M{"session_id": sessionID}
	update := bson.M{"$push": bson.M{"events": event}}

	if _, err := analyticsCollection.UpdateOne(ctx, filter, update); err != nil {
		log.Printf("Failed to track event: %v", err)
	}
}

func main() {
	initAnalytics()
	warmBlogCacheOnStartup()

	port := getPort()
	s, err := wish.NewServer(
		wish.WithAddress(fmt.Sprintf("%s:%d", host, port)),
		wish.WithHostKeyPath(".ssh/term_info_ed25519"),
		wish.WithMiddleware(
			bubbletea.Middleware(teaHandler),
			activeterm.Middleware(),
			logging.Middleware(),
		),
	)
	if err != nil {
		log.Fatalln(err)
	}

	log.Printf("Starting Portfolio SSH server on %s:%d", host, port)

	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		if err = s.ListenAndServe(); err != nil && err != ssh.ErrServerClosed {
			log.Fatalln(err)
		}
	}()

	<-done
	log.Println("Stopping SSH server...")

	if mongoClient != nil {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		mongoClient.Disconnect(ctx)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := s.Shutdown(ctx); err != nil {
		log.Fatalln(err)
	}
}
