# Portfolio v3

A premium, high-performance portfolio website built with **TanStack Start**, **React**, **Tailwind CSS**, and **Framer Motion**.

## 🌟 Features

- **Modern Tech Stack**: Built on the bleeding edge with TanStack Start (SSR/ISR).
- **Premium Design**: "Deep Indigo/Aurora" aesthetic with glassmorphism, dynamic gradients, and smooth animations.
- **Interactive Stats**: A dedicated `/stats` page visualizing coding activity (languages, projects, editors) using Recharts.
- **Blog Integration**: Automatically fetches and displays latest articles from Dev.to on the `/blogs` page.
- **Link Hub**: A specialized `/links` page acting as a "Linktree" replacement.
- **Responsive**: Fully responsive design that works perfectly on mobile, tablet, and desktop.
- **Floating Navigation**: A macOS-style floating dock for easy navigation.

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) (v4 alpha)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) & [Simple Icons](https://simpleicons.org/)
- **Font**: Outfit & Space Grotesk

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/             # Generic UI elements (cards, clouds, etc.)
│   └── Navbar.tsx      # Global floating navigation
├── routes/             # File-based routing
│   ├── index.tsx       # Homepage (About, Projects, Experience, etc.)
│   ├── stats.tsx       # Coding statistics dashboard
│   ├── links.tsx       # Social links hub
│   ├── blogs.tsx       # Blog listing page
│   └── __root.tsx      # Global layout wrapper
├── data/               # Static content (JSON)
└── index.css           # Global styles and Tailwind configuration
```

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    # or
    pnpm install
    # or
    bun install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    npm start
    ```

## 🎨 Customization

- **Colors**: Edit `src/index.css` to modify the CSS variables for the theme.
- **Data**: Update files in `src/data/` to change projects, achievements, and certifications.
- **Blogs**: Update the Dev.to username in `src/routes/blogs.tsx` to fetch your own articles.
