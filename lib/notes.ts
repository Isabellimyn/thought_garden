import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const notesDirectory = path.join(process.cwd(), 'content')

export function getSortedNotesData() {
  const allItems = fs.readdirSync(notesDirectory)
  const fileNames = allItems.filter(fileName => fileName.endsWith('.md'))

  return fileNames.map((fileName) => {
    const fullPath = path.join(notesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Get file system stats for the fallback date
    const stats = fs.statSync(fullPath);

    // 1. Setup slug (keeping it simple for your existing comma logic)
    const slug = fileName.replace(/\.md$/, '').toLowerCase().trim().replace(/\s+/g, '-'); 

    // 2. Read Time logic
    const wordsPerMinute = 200;
    const noOfWords = content.split(/\s+/g).length;
    const readTime = `${Math.ceil(noOfWords / wordsPerMinute)} min read`;

    // 3. Fix Obsidian links and images
    const processedContent = content
      .replace(/!\[\[(.*?)\]\]/g, (match, name) => {
        const safeName = encodeURIComponent(name.trim());
        return `\n\n![${name}](/api/images/${safeName})\n\n`; 
      })
      .replace(/\[\[(.*?)\]\]/g, '[$1]($1)');

    // 4. Category logic
    let category = "thoughts";
    if (Array.isArray(data.tags) && data.tags.length > 0) {
      category = data.tags[0];
    } else if (typeof data.tags === 'string') {
      category = data.tags;
    }

    // 5. Date Logic: Use Markdown date, or file creation date
    // We format it to a string so it's consistent
    const rawDate = data.date ? new Date(data.date) : stats.birthtime;
    const formattedDate = rawDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return {
      slug,
      id: slug, // Added id to match your page.tsx lookup
      title: data.title || fileName.replace(/\.md$/, ''),
      date: formattedDate, 
      category, 
      pinned: data.pinned || false,
      isPublished: data.status === 'publish', 
      body: processedContent.slice(0, 150) + "...",
      content: processedContent,
      readTime,
      ...data,
    }
  })
  .filter(note => note.isPublished === true) 
  .sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    // Sort by actual date values
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })
}