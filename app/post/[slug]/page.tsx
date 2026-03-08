import { getSortedNotesData } from "@/lib/notes"
import { Sidebar } from "@/components/garden/sidebar"
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Properly await the params
  const { slug } = await params;
  
  // 2. Decode the slug (this turns %2C back into a comma)
  const decodedSlug = decodeURIComponent(slug);
  
  const allNotes = getSortedNotesData();
  
  // 3. Find the specific note using the decoded slug
  // We check .id or .slug to ensure the comma-version matches your file
  const note = allNotes.find((n: any) => n.id === decodedSlug || n.slug === decodedSlug);

  // 4. Safety Check: If note is undefined, stop here and show an error
  if (!note) {
    return (
      <div className="flex min-h-screen bg-[#FBFAF8]">
        <Sidebar notes={allNotes} />
        <main className="flex-1 ml-64 p-20 font-mono">
          <h1 className="text-2xl mb-4">Note not found</h1>
          <p className="text-stone-500">Looked for: {decodedSlug}</p>
        </main>
      </div>
    );
  }

  // 5. If found, render the beautiful version
  return (
    <div className="flex min-h-screen bg-[#FBFAF8]">
      <Sidebar notes={allNotes} />
      
      <main className="flex-1 ml-64">
        <article className="max-w-2xl mx-auto py-20 px-8">
          <header className="mb-12">
            <h1 className="text-5xl font-serif font-bold text-stone-900 mb-6 lowercase tracking-tight">
              {note.title}
            </h1>
            
            <div className="not-prose flex items-center gap-3 text-stone-400 font-mono text-[15px] uppercase tracking-[0.2em]" 
                 style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
              <time>{note.date}</time>
              <span>•</span>
              <span>{note.readTime}</span>
              <span>•</span>
              <span className="text-stone-600 font-bold">{note.category}</span>
            </div>
          </header>

          <div className="markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkBreaks]}
              components={{
                h1: ({node, ...props}) => <h1 {...props} />,
                h2: ({node, ...props}) => <h2 {...props} />,
                h3: ({node, ...props}) => <h3 {...props} />,
                p: ({node, ...props}) => <p {...props} />,
                img: ({node, ...props}) => (
                  <img {...props} alt={props.alt || ""} className="rounded-xl border border-stone-200 shadow-sm" />
                )
              }}
            >
              {note.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}