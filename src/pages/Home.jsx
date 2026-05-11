import { Link } from 'react-router-dom'

const subjects = [
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'science', label: 'Science' },
  { id: 'english', label: 'English' },
  { id: 'social-science', label: 'Social Science' },
  { id: 'hindi', label: 'Hindi' },
  { id: 'sanskrit', label: 'Sanskrit' },
  { id: 'health-and-physical-education', label: 'Health & Physical Education' },
  { id: 'urdu', label: 'Urdu' },
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Class 10 CBSE Resources</h1>
      <p className="text-slate-500 mb-8">Free chapter-wise resources organized by subject → book → chapter.</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {subjects.map(s => (
          <Link
            key={s.id}
            to={`/subjects/${s.id}`}
            className="bg-white border border-slate-200 rounded-2xl p-5 text-slate-900 hover:shadow-md transition-shadow no-underline"
          >
            <h3 className="text-lg font-semibold capitalize">{s.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
