import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function ChapterView() {
  const { subject, book, chapter } = useParams()
  const [content, setContent] = useState('')
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    fetch(`${base}subjects/${subject}/books/${book}/chapters/${chapter}/index.md`)
      .then(r => r.text())
      .then(text => {
        let cleaned = text.replace(/^---[\s\S]*?---\r?\n/, '')
        cleaned = cleaned.replace(/<[^>]+>/g, '')
        setContent(cleaned)
      })
  }, [subject, book, chapter])

  function resolveLink(href) {
    if (!href) return null
    if (href.startsWith('http')) return { external: true, href }
    if (href.includes('/ai/') || href.includes('ai/')) {
      const aiType = href.split('/').pop().replace('.md', '')
      return { external: false, to: `/subjects/${subject}/books/${book}/chapters/${chapter}/ai/${aiType}` }
    }
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="text-sm text-slate-500 mb-4 flex flex-wrap gap-1 items-center">
        <Link to="/" className="text-slate-500 hover:underline">Home</Link> <span>→</span>
        <Link to={`/subjects/${subject}`} className="text-slate-500 hover:underline capitalize">{subject.replace(/-/g, ' ')}</Link> <span>→</span>
        <Link to={`/subjects/${subject}/books/${book}`} className="text-slate-500 hover:underline capitalize">{book.replace(/-/g, ' ')}</Link> <span>→</span>
        <span className="capitalize">{chapter.replace(/-/g, ' ')}</span>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 flex flex-wrap gap-3 items-center">
        <strong className="text-slate-700 text-sm">AI Prompts:</strong>
        <Link to={`/subjects/${subject}/books/${book}/chapters/${chapter}/ai/chatgpt-prompts`} className="text-blue-600 hover:underline text-sm">ChatGPT</Link>
        <Link to={`/subjects/${subject}/books/${book}/chapters/${chapter}/ai/claude-prompts`} className="text-blue-600 hover:underline text-sm">Claude</Link>
        <Link to={`/subjects/${subject}/books/${book}/chapters/${chapter}/ai/codex-prompts`} className="text-blue-600 hover:underline text-sm">Codex</Link>
      </div>
      <div className="prose prose-slate prose-headings:capitalize prose-a:text-blue-600 max-w-none">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => {
              const resolved = resolveLink(href)
              if (!resolved) return <span>{children}</span>
              if (resolved.external) return <a href={resolved.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{children}</a>
              return <Link to={resolved.to} className="text-blue-600 hover:underline">{children}</Link>
            }
          }}
        >{content}</ReactMarkdown>
      </div>
    </div>
  )
}
