import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const notesDirectory = path.join(process.cwd(), 'content')

export function getSortedNotesData() {
  // Ensure the directory exists
  if (!fs.existsSync(notesDirectory)) return [];

  const allItems = fs.readdirSync(notesDirectory)
  const fileNames = allItems.filter(fileName => fileName.endsWith('.md'))

  return fileNames.map((fileName) => {
    const fullPath = path.join(notesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const slug = fileName.replace(/\.md$/, '').toLowerCase().replace(/\s+/g, '-');

    // FIX IMAGES: Convert ![[image.png]] to <img src="/api/images/image.png">
    const processedContent = content.replace(/!\[\[(.*?)\]\]/g, (match, name) => {
      return `![${name}](/api/images/${name})`;
    });

    return {
      slug,
      content: processedContent,
      title: data.title || fileName.replace(/\.md$/, ''),
      date: data.date || "2026-03-01",
      // obsidian uses 'tags', we take the first one as category
      category: Array.isArray(data.tags) ? data.tags[0] : (data.tags || "thoughts"),
      status: data.status || "draft", // default to draft if missing
      ...data,
    }
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}