import { getSortedNotesData } from "@/lib/notes"
// REMOVE the { } around GardenClient
import GardenClient from "@/components/garden/GardenClient"

export default function Home() {
  const allNotes = getSortedNotesData()

  return (
    <GardenClient 
      initialNotes={allNotes} 
      title="thought garden" 
      isCategoryPage={false} 
    />
  )
}