import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface GardenCardProps {
  title: string
  body: string
  date: string
  readTime: string
  slug: string
  category: string // 👈 Added this
  pinned?: boolean // 👈 Added this (optional)
  className?: string
}

export function GardenCard({
  title,
  body,
  date,
  readTime,
  slug,
  category, // 👈 Added this
  pinned,   // 👈 Added this
  className = "",
}: GardenCardProps) {
  return (
    <Link href={`/post/${slug}`} className="block">
      <article
        className={`group rounded-lg border bg-card p-6 flex flex-col gap-4 cursor-pointer
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:shadow-md
          break-inside-avoid mb-6
          ${pinned ? 'border-amber-200 bg-amber-50/30' : 'border-border'} 
          ${className}`}
      >
        {/* Meta & Category Bubble */}
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground mb-1">
          <div className="flex items-center gap-2">
            {pinned && <span className="text-amber-600 font-bold uppercase tracking-tighter text-[10px]">Pinned</span>}
            <time>{date}</time>
            <span aria-hidden="true">·</span>
            <span>{readTime}</span>
          </div>
          
          <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium lowercase border border-stone-200">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-semibold text-card-foreground leading-tight text-balance group-hover:text-stone-700 transition-colors">
          {title}
        </h3>

        {/* Body */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {body}
        </p>

        <div className="flex-1" />

        {/* Read More */}
        <div className="flex items-center gap-1.5 text-sm text-card-foreground font-medium group-hover:gap-2.5 transition-all duration-300">
          <span>Read More</span>
          <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </article>
    </Link>
  )
}