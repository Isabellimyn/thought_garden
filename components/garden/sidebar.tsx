"use client"
import { Search } from "lucide-react"
import Link from "next/link"

// These are the "rules" for what the Sidebar needs to work
interface SidebarProps {
  notes?: any[]
  searchQuery?: string
  setSearchQuery?: (val: string) => void
}

const navLinks = [
  { label: "Experiences", href: "/experiences" },
  { label: "Essays", href: "/essays" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Library", href: "/library" },
]

export function Sidebar({ notes = [], searchQuery, setSearchQuery }: SidebarProps) {
  // We only want to show the 6 most recent notes in the sidebar
  const recentNotes = notes.slice(0, 6)

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col bg-background border-r border-border overflow-y-auto">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-border">
        <Link href="/">
          <h1 className="font-serif text-lg tracking-tight text-foreground hover:opacity-70 transition-opacity cursor-pointer">
            Hypertext Garden
          </h1>
        </Link>
      </div>

      <div className="flex flex-col flex-1 px-6 py-6 gap-8">
        {/* Search - Now connected to the Home Page */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Garden ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery?.(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-sm text-foreground rounded-md hover:bg-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Recent Thoughts - Now using REAL Obsidian notes */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Recent Thoughts
          </h2>
          <div className="flex flex-col gap-4">
            {recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <Link key={note.slug} href={`/post/${note.slug}`} className="group flex flex-col gap-0.5">
                  <span className="text-sm text-foreground leading-snug group-hover:text-muted-foreground transition-colors line-clamp-1">
                    {note.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {note.date}
                  </span>
                </Link>
              ))
            ) : (
              <p className="text-xs text-muted-foreground italic">No notes found...</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

// Inside your Sidebar.tsx
<nav className="space-y-2">
  <Link href="/essays" className="block hover:underline">essays</Link>
  <Link href="/experiences" className="block hover:underline">experiences</Link>
  <Link href="/thoughts" className="block hover:underline">thoughts</Link>
    <Link href="/library"className="block hover:underline">library</Link>

</nav>
