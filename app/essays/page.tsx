import { getSortedNotesData } from "@/lib/notes"
// Keep the filename as garden-client, but name the import GardenClient
import GardenClient from "@/components/garden/GardenClient"

export default function EssaysPage() {
  const allNotes = getSortedNotesData();
  const essays = allNotes.filter(n => 
    n.category?.toLowerCase() === "essay" || 
    n.category?.toLowerCase() === "essays"
  );

  // React tags MUST be Capitalized and have NO hyphens
  return <GardenClient initialNotes={essays} title="essays" isCategoryPage={true} />;
}