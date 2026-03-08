import { getSortedNotesData } from "@/lib/notes"
import GardenClient from "@/components/garden/GardenClient"

export default function ExperiencesPage() {
  const allNotes = getSortedNotesData();
  const experiences = allNotes.filter(n => n.category?.toLowerCase() === "experience" || n.category?.toLowerCase() === "experiences");

  return <GardenClient initialNotes={experiences} title="experiences" isCategoryPage={true} />;
}