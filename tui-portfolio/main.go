package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

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
)

const (
	host = "0.0.0.0"
	port = 23234
)

// --- Styling ---

var (
	// Colors
	cNeonGreen = lipgloss.Color("#00F260")
	cNeonBlue  = lipgloss.Color("#0575E6")
	cPurple    = lipgloss.Color("#8E2DE2")
	cPink      = lipgloss.Color("#FF0080")
	cCyan      = lipgloss.Color("#00FFFF")
	cGrey      = lipgloss.Color("#BDC3C7")
	cDarkGrey  = lipgloss.Color("#34495E")

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

// --- ASCII Art ---

const logoText = `██████╗  █████╗  ██████╗ ██╗  ██╗ ██████╗████████╗
██╔══██╗██╔══██╗██╔════╝ ██║  ██║   ██║   ╚══██╔══╝
██████╔╝███████║██║      ███████║   ██║      ██║
██╔══██╗██╔══██║██║      ██╔══██║   ██║      ██║
██║  ██║██║  ██║╚██████╗ ██║  ██║ ██████╗    ██║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝`

const targetSubHeader = ">> Caffeine Powered BitFlipper <<"
const helpText = "↑/↓: Navigate • Enter: Select • PgUp/PgDn: Scroll • Esc: Back"

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
# 💼 Work Experience

### **Hyathi Technologies**
*Full Stack & Web3 Developer Intern* (Dec 2024 - Present)
- Building enterprise solutions using React, Next.js, Node.js, and Rust.

### **ClearMind AI**
*Full Stack Developer Intern* (Jun 2023 - Aug 2023)
- Engineered a journaling app scaling to 45k+ users with Next.js and OpenAI API.

### **Microsoft Learn Student Ambassadors**
*Beta MLSA* (Sep 2023 - Present)
- conducting workshops and building community around Microsoft technologies.
`,
	"Projects": `
# 🛠️ Selected Projects

## 1. **Owwn** (Featured)
> *Stack: Tanstack, Convex*
> An expense splitting web app built with modern tech.
> [Live Demo](https://owwn.rcht.dev/) | [GitHub](https://github.com/notnotrachit/owwn)

## 2. **QuizVerse**
> *Stack: NextJS, Solidity, Hedera, AI*
> Decentralized AI-powered quizzing platform on blockchain.
> [GitHub](https://github.com/notnotrachit/QuizVerse/)

## 3. **ClubKonnect**
> *Stack: Python, Django, Tailwind*
> A complete recruitment platform for university clubs with OAuth.
> [GitHub](https://github.com/notnotrachit/ClubKonnect)

## 4. **Sharepal**
> *Stack: GoLang, React Native, MongoDB*
> Group expense splitting mobile application.
> [GitHub](https://github.com/notnotrachit/sharepal)
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
- 🐧 **Linux**
- 🐙 **Git**
- ☸️ **K8s**
- 🚀 **CI/CD**
- 🐘 **Postgres**
- 🍃 **Mongo**
- 🔺 **Redis**
`,
}

// --- Model ---

type model struct {
	viewport    viewport.Model
	renderer    *glamour.TermRenderer
	activeItem  string
	width       int
	height      int
	quitting    bool
	ready       bool
	showHelp    bool

	tabs           []string
	activeTabIndex int

	// Animation
	subHeaderIdx  int
	subHeaderShow string

	// computed layout
	headerH int
	footerH int
	tabsH   int
	mainH   int
}

type tickMsg time.Time

func tick() tea.Cmd {
	return tea.Tick(50*time.Millisecond, func(t time.Time) tea.Msg {
		return tickMsg(t)
	})
}

func initialModel(r *glamour.TermRenderer) model {
	tabs := []string{"About Me", "Experience", "Projects", "Skills"}
	return model{
		tabs:           tabs,
		activeTabIndex: 0,
		renderer:       r,
		activeItem:     tabs[0],
	}
}

func (m model) Init() tea.Cmd {
	return tick()
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
	right := lipgloss.NewStyle().Foreground(soft).Render("Section: " + m.activeItem)

	keys := "←/→:nav tabs  ↑/↓:scroll  q:quit"
	if m.showHelp {
		keys = "esc:close help"
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
			return m, tea.Quit
		}

		// Tab Navigation (Left/Right/h/l)
		switch msg.String() {
		case "left", "h":
			m.activeTabIndex--
			if m.activeTabIndex < 0 {
				m.activeTabIndex = len(m.tabs) - 1
			}
			m.activeItem = m.tabs[m.activeTabIndex]
			m.updateViewportContent()
			m.viewport.GotoTop() // Reset scroll
			return m, nil
		case "right", "l":
			m.activeTabIndex++
			if m.activeTabIndex >= len(m.tabs) {
				m.activeTabIndex = 0
			}
			m.activeItem = m.tabs[m.activeTabIndex]
			m.updateViewportContent()
			m.viewport.GotoTop() // Reset scroll
			return m, nil
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
	}

	return m, tea.Batch(cmds...)
}

func (m *model) updateViewportContent() {
	mdContent := contentMap[m.activeItem]
	m.renderer, _ = glamour.NewTermRenderer(
		glamour.WithStandardStyle("dark"),
		glamour.WithWordWrap(m.viewport.Width),
	)
	rendered, _ := m.renderer.Render(mdContent)
	m.viewport.SetContent(rendered)
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
	if m.quitting {
		return "Thanks for visiting! Bye.\n"
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

	m := initialModel(r)
	// Initial update to set content
	m.updateViewportContent()

	return m, []tea.ProgramOption{
		tea.WithAltScreen(),
		// tea.WithMouseCellMotion(), // Disable mouse capture to allow native link clicking
		tea.WithInput(pty.Slave),
		tea.WithOutput(pty.Slave),
	}
}

func main() {
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
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := s.Shutdown(ctx); err != nil {
		log.Fatalln(err)
	}
}
