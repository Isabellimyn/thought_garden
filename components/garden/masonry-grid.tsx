import { GardenCard } from "./garden-card"

export function MasonryGrid({ notes }: { notes: any[] }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {notes.map((note, index) => (
        <GardenCard 
          key={note.slug} 
          {...note} 
          // Inject dynamic heights or bottom margins here
          className={
            index % 3 === 0 ? "mb-10" : 
            index % 2 === 0 ? "mb-4" : 
            "mb-16"
          } 
        />
      ))}
    </div>
  )
}
