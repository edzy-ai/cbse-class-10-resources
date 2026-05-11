import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const allChapterPaths = import.meta.glob('/public/subjects/*/books/*/chapters/*/index.md')

export default function BookList() {
  const { subject, book } = useParams()
  const [chapters, setChapters] = useState([])

  useEffect(() => {
    const prefix = `/public/subjects/${subject}/books/${book}/chapters/`
    const matched = Object.keys(allChapterPaths)
      .filter(p => p.startsWith(prefix))
      .map(p => {
        const id = p.split('/').at(-2)
        return { id, label: id.replace(/-/g, ' ') }
      })
    setChapters(matched)
  }, [subject, book])

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <Link to={`/subjects/${subject}`} className="text-blue-600 hover:underline text-sm">← {subject.replace(/-/g, ' ')}</Link>
      <h1 className="text-3xl font-bold text-slate-900 capitalize my-4">{book.replace(/-/g, ' ')}</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {chapters.map(c => (
          <Link
            key={c.id}
            to={`/subjects/${subject}/books/${book}/chapters/${c.id}`}
            className="bg-white border border-slate-200 rounded-2xl p-5 text-slate-900 hover:shadow-md transition-shadow no-underline"
          >
            <h3 className="text-lg font-semibold capitalize">{c.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
