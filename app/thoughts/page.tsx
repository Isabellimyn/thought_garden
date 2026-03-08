import { getSortedNotesData } from "@/lib/notes"
import GardenClient from "@/components/garden/GardenClient"

export default function ThoughtsPage() {
  const allNotes = getSortedNotesData();
  const thoughts = allNotes.filter(n => 
    n.category?.toLowerCase() === "thought" || 
    n.category?.toLowerCase() === "thoughts"
  );

  return <GardenClient initialNotes={thoughts} title="thoughts" isCategoryPage={true} />;
}