import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Meta, Scripts } from '@tanstack/start'
import type { ReactNode } from 'react'
import '../index.css'
import '@fontsource/outfit/latin.css'
import '@fontsource/space-grotesk/latin.css'
import { Navbar } from '../components/Navbar'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Rachit Khurana | Full Stack Dev',
      },
      {
        name: 'description',
        content: 'Building digital experiences. Minimalist & Modern.',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <Navbar />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <Meta />
      </head>
      <body className="font-sans bg-background text-foreground min-h-screen relative overflow-x-hidden">
        {/* Background Grid & Gradient */}
        <div className="fixed inset-0 z-[-1] bg-background bg-grid-small [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none" />
        
        {children}
        <Scripts />
      </body>
    </html>
  )
}
