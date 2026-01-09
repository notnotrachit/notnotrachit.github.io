# Rachit | Modern Brutalist Portfolio (v3)

A high-impact, kinetic typography portfolio built with **TanStack Start**, **React 19**, and **Tailwind CSS v4**.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (SSR + Client Hydration)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Oxide engine, CSS variables)
- **Animation**: [GSAP](https://gsap.com/) (ScrollTrigger) & [Lenis](https://lenis.studio/) (Smooth Scroll)
- **Type Safety**: TypeScript
- **Icons**: Lucide React

## Design Philosophy

- **Modern Brutalism**: High contrast, large typography, raw layout structure.
- **Kinetic**: Scroll-driven typography and interactions.
- **Editorial**: Layouts inspired by Swiss design and editorial print.

## Getting Started

### Prerequisites

- Node.js 22+ (Required for TanStack Start)
- pnpm or npm

### Installation

```bash
npm install
# or
pnpm install
```

### Development

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000` to view the portfolio.

### Build for Production

```bash
npm run build
# or
pnpm build
```

To preview the production build:

```bash
npm run start
# or
pnpm start
```

## Project Structure

```
src/
├── components/         # React components
│   ├── sections/       # Page sections (Hero, Projects, etc.)
│   └── ui/             # Reusable UI elements (Navbar, Cursor, etc.)
├── routes/             # TanStack Router file-based routes
│   ├── __root.tsx      # Root layout (Html, Head, Body)
│   └── index.tsx       # Homepage
├── router.tsx          # Router configuration
├── client.tsx          # Client entry point
├── ssr.tsx             # Server entry point
└── index.css           # Global styles & Tailwind v4 theme
```
