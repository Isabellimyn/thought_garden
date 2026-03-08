"use client"

import { useState } from "react"
import { Sidebar } from "@/components/garden/sidebar"
import { MasonryGrid } from "@/components/garden/masonry-grid"

interface Note {
  slug: string;
  title: string;
  date: string;
  body: string;
  category?: string;
  readTime?: string;
}

interface GardenClientProps {
  initialNotes: Note[];
  title?: string;
  isCategoryPage?: boolean;
}

export default function GardenClient({ 
  initialNotes = [], 
  title = "thought garden", 
  isCategoryPage = false 
}: GardenClientProps) {
  
  const [searchQuery, setSearchQuery] = useState("")

  // Filter notes based on search
  const filteredNotes = initialNotes.filter((note) =>
    note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.body?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-[#FBFAF8]">
      <Sidebar 
        notes={initialNotes} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <main className="flex-1 ml-64">
        <div className="max-w-6xl mx-auto px-10 py-16">
          <header className="mb-16 pt-8 border-b border-stone-100 pb-10">
            <h1 className="font-serif text-5xl font-bold text-stone-900 lowercase tracking-tighter mb-4">
              {title}
            </h1>
            
            {isCategoryPage && (
              <p className="text-stone-400 text-[12px] uppercase tracking-[0.2em]" 
                 style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
                archive / {filteredNotes.length} entries
              </p>
            )}
          </header>

          {/* Pass the filtered notes to the MasonryGrid. 
             Don't map them here; the MasonryGrid handles the layout.
          */}
          <MasonryGrid notes={filteredNotes} />
        </div>
      </main>
    </div>
  )
}