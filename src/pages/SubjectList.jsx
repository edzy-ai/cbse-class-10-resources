import { useParams, Link } from 'react-router-dom'

const subjectBooks = {
  mathematics: [{ id: 'mathematics', label: 'Mathematics' }],
  science: [{ id: 'science', label: 'Science' }],
  english: [
    { id: 'first-flight', label: 'First Flight' },
    { id: 'foot-prints-without-feet', label: 'Footprints Without Feet' },
    { id: 'words-and-expressions-ii', label: 'Words and Expressions II' },
  ],
  'social-science': [
    { id: 'contemporary-india', label: 'Contemporary India' },
    { id: 'democratic-politics', label: 'Democratic Politics' },
    { id: 'india-and-the-contemporary-world-ii', label: 'India and the Contemporary World II' },
    { id: 'understanding-economic-development', label: 'Understanding Economic Development' },
  ],
  hindi: [
    { id: 'kshitij-ii', label: 'Kshitij II' },
    { id: 'kritika', label: 'Kritika' },
    { id: 'sparsh', label: 'Sparsh' },
    { id: 'sanchayan-ii', label: 'Sanchayan II' },
  ],
  sanskrit: [
    { id: 'shemushi-ii', label: 'Shemushi II' },
    { id: 'abhyaswaan-bhav-ii', label: 'Abhyaswaan Bhav II' },
    { id: 'vyakaranavithi', label: 'Vyakaranavithi' },
  ],
  'health-and-physical-education': [
    { id: 'health-and-physical-education', label: 'Health and Physical Education' },
  ],
  urdu: [{ id: 'nawa-e-urdu', label: 'Nawa-e-Urdu' }],
}

export default function SubjectList() {
  const { subject } = useParams()
  const books = subjectBooks[subject] || []

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <Link to="/" className="text-blue-600 hover:underline text-sm">← Home</Link>
      <h1 className="text-3xl font-bold text-slate-900 capitalize my-4">{subject.replace(/-/g, ' ')}</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {books.map(b => (
          <Link
            key={b.id}
            to={`/subjects/${subject}/books/${b.id}`}
            className="bg-white border border-slate-200 rounded-2xl p-5 text-slate-900 hover:shadow-md transition-shadow no-underline"
          >
            <h3 className="text-lg font-semibold">{b.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
