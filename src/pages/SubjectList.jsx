import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Calculator, FlaskConical, Languages, Landmark, BookMarked, Scroll, HeartPulse, PenLine, GraduationCap, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatYouWillFind from '../components/WhatYouWillFind'

const subjectMeta = {
  mathematics:                    { Icon: Calculator,   colorClass: 'text-blue-500',   bgClass: 'bg-blue-50'   },
  science:                        { Icon: FlaskConical, colorClass: 'text-green-500',  bgClass: 'bg-green-50'  },
  english:                        { Icon: Languages,    colorClass: 'text-orange-500', bgClass: 'bg-orange-50' },
  'social-science':               { Icon: Landmark,     colorClass: 'text-purple-500', bgClass: 'bg-purple-50' },
  hindi:                          { Icon: BookMarked,   colorClass: 'text-pink-500',   bgClass: 'bg-pink-50'   },
  sanskrit:                       { Icon: Scroll,       colorClass: 'text-yellow-500', bgClass: 'bg-yellow-50' },
  'health-and-physical-education':{ Icon: HeartPulse,   colorClass: 'text-teal-500',   bgClass: 'bg-teal-50'   },
  urdu:                           { Icon: PenLine,      colorClass: 'text-violet-500', bgClass: 'bg-violet-50' },
}

function fmt(slug) { return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }

export default function SubjectList() {
  const { subject } = useParams()
  const [books, setBooks] = useState([])
  const { Icon, colorClass, bgClass } = subjectMeta[subject] || { Icon: GraduationCap, colorClass: 'text-blue-500', bgClass: 'bg-blue-50' }
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    fetch(`${base}data.json`)
      .then(r => r.json())
      .then(data => {
        const subjectData = data[subject] || {}
        setBooks(Object.keys(subjectData).map(bookSlug => ({
          id: bookSlug,
          label: fmt(bookSlug),
          chapterCount: Object.keys(subjectData[bookSlug]).length,
        })))
      })
      .catch(() => {})
  }, [subject, base])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <div className="bg-white border-b border-gray-100 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
              <Link to="/" className="text-gray-400 no-underline hover:text-gray-600">Subject</Link>
              <ChevronRight size={11} />
              <span className={`font-semibold ${colorClass}`}>Book: {fmt(subject)}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">CBSE Class 10 {fmt(subject)}</h1>
            <p className="text-xs text-gray-400 mt-1">Subject: {fmt(subject)} › Book: {fmt(subject)}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <section className="pt-8 pb-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">Books</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {books.map(b => (
                <Link key={b.id} to={`/subjects/${subject}/books/${b.id}`} className="no-underline">
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                    <div className={`w-11 h-11 ${bgClass} rounded-xl flex items-center justify-center mb-3`}>
                      <Icon size={22} className={colorClass} />
                    </div>
                    <div className="text-sm font-bold text-gray-900 mb-1.5">{b.label}</div>
                    <p className="text-xs text-gray-400 mb-3">Resources organised by book, chapter, and page.</p>
                    <div className={`text-xs font-semibold ${colorClass}`}>Explore →</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <WhatYouWillFind />
        </div>
      </main>
      <Footer />
    </div>
  )
}
