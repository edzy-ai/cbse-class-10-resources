import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Copy, Check, Calculator, FlaskConical, Languages, Landmark, BookMarked, Sparkles, GraduationCap, Scroll, HeartPulse, PenLine, BookOpen } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatYouWillFind from '../components/WhatYouWillFind'
import promptCategories from '../data/promptCategories'

const subjectConfig = {
  mathematics:                    { Icon: Calculator,   colorClass: 'text-blue-500',   bgClass: 'bg-blue-50',   desc: 'Real Numbers, Algebra, Geometry, Trigonometry, Statistics and more.' },
  science:                        { Icon: FlaskConical, colorClass: 'text-green-500',  bgClass: 'bg-green-50',  desc: 'Physics, Chemistry, Biology chapters with NCERT resources.' },
  english:                        { Icon: Languages,    colorClass: 'text-orange-500', bgClass: 'bg-orange-50', desc: 'First Flight, Footprints — prose, poetry, and supplementary readers.' },
  'social-science':               { Icon: Landmark,     colorClass: 'text-purple-500', bgClass: 'bg-purple-50', desc: 'History, Geography, Political Science, and Economics.' },
  hindi:                          { Icon: BookMarked,   colorClass: 'text-pink-500',   bgClass: 'bg-pink-50',   desc: 'Kshitij, Kritika, Sparsh, Sanchayan — all Hindi books.' },
  sanskrit:                       { Icon: Scroll,       colorClass: 'text-yellow-500', bgClass: 'bg-yellow-50', desc: 'Shemushi, Abhyaswaan Bhav, Vyakaranavithi.' },
  'health-and-physical-education':{ Icon: HeartPulse,   colorClass: 'text-teal-500',   bgClass: 'bg-teal-50',   desc: 'Physical education, yoga, sports and health.' },
  urdu:                           { Icon: PenLine,      colorClass: 'text-violet-500', bgClass: 'bg-violet-50', desc: 'Urdu textbooks and supplementary readers.' },
}

// hex colors for dynamic inline use (Tailwind can't do dynamic text-[color])
const subjectHex = {
  mathematics: '#3b82f6', science: '#22c55e', english: '#f97316',
  'social-science': '#a855f7', hindi: '#ec4899', sanskrit: '#eab308',
  'health-and-physical-education': '#14b8a6', urdu: '#8b5cf6',
}

function fmt(slug) { return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }

export default function Home() {
  const [data, setData]                 = useState(null)
  const [subjects, setSubjects]         = useState([])
  const [randomPrompt, setRandomPrompt] = useState(null)
  const [loading, setLoading]           = useState(false)
  const [copied, setCopied]             = useState(false)
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    fetch(`${base}data.json`)
      .then(r => r.json())
      .then(d => {
        setData(d)
        setSubjects(Object.keys(d).map(slug => ({
          id: slug,
          label: fmt(slug),
          ...(subjectConfig[slug] || { Icon: GraduationCap, colorClass: 'text-blue-500', bgClass: 'bg-blue-50', desc: '' }),
        })))
      })
      .catch(() => {})
  }, [base])

  function generate() {
    if (!data) return
    setLoading(true)
    const all = []
    for (const [subjectSlug, books] of Object.entries(data))
      for (const [bookSlug, chapters] of Object.entries(books))
        for (const [chapterSlug, chapter] of Object.entries(chapters))
          for (const p of chapter.prompts)
            all.push({ ...p, subjectSlug, bookSlug, chapterSlug, chapterTitle: chapter.meta.title })
    if (all.length) setRandomPrompt(all[Math.floor(Math.random() * all.length)])
    setLoading(false)
  }

  function copy() {
    if (!randomPrompt) return
    navigator.clipboard.writeText(randomPrompt.prompt).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">

            {/* Left */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
                CBSE Class 10<br />Resources
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md">
                Free chapter-wise NCERT and related resources organised by subject, book, and chapter for CBSE students.
              </p>
              <div className="flex gap-2.5 flex-wrap">
                {[
                  { Icon: BookOpen,  bgClass: 'bg-blue-50',   colorClass: 'text-blue-500',   label: 'Chapter-wise', sub: 'All chapters' },
                  { Icon: Zap,       bgClass: 'bg-purple-50', colorClass: 'text-purple-500', label: 'AI Prompts',   sub: 'ChatGPT, Claude' },
                  { Icon: Check,     bgClass: 'bg-green-50',  colorClass: 'text-green-500',  label: 'Free & Open',  sub: 'Always free' },
                ].map(b => (
                  <div key={b.label} className={`flex items-center gap-2 ${b.bgClass} border border-gray-100 rounded-xl px-3 py-2`}>
                    <b.Icon size={15} className={b.colorClass} />
                    <div>
                      <div className="text-xs font-bold text-gray-800">{b.label}</div>
                      <div className="text-[11px] text-gray-400">{b.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Random Prompt Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900 mb-1">
                <Sparkles size={14} className="text-indigo-500" /> Try a Random AI Prompt
              </div>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                Discover a random study prompt from any chapter of Class 10.
              </p>

              {randomPrompt && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3.5 mb-3.5">
                  <div className="text-xs font-bold text-indigo-600 mb-1.5">{randomPrompt.heading}</div>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">{randomPrompt.prompt}</p>
                  <div className="mt-2.5 flex gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-50 border border-blue-100 rounded px-2 py-0.5">
                      {fmt(randomPrompt.subjectSlug)}
                    </span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 rounded px-2 py-0.5">
                      {randomPrompt.chapterTitle || fmt(randomPrompt.chapterSlug)}
                    </span>
                    {(() => {
                      const entry = promptCategories.find(c => randomPrompt.prompt.startsWith(c.template.split('{{')[0].trim()))
                      return entry ? (
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded px-2 py-0.5">
                          {entry.label}
                        </span>
                      ) : null
                    })()}
                  </div>
                </div>
              )}

              <button
                onClick={generate}
                disabled={loading || !data}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                <Zap size={14} /> {loading ? 'Generating...' : 'Generate Random Prompt'}
              </button>

              {randomPrompt && (
                <button
                  onClick={copy}
                  className="w-full mt-2 border border-gray-200 rounded-xl py-2 text-xs font-medium text-gray-500 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-gray-50 transition-colors bg-white"
                >
                  {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy Prompt</>}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="max-w-6xl mx-auto px-6">
          <section className="pt-10 pb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Subjects</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {subjects.map(({ id, label, Icon, colorClass, bgClass, desc }) => (
                <Link key={id} to={`/subjects/${id}`} className="no-underline group">
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                    <div className={`w-11 h-11 ${bgClass} rounded-xl flex items-center justify-center mb-3`}>
                      <Icon size={22} className={colorClass} />
                    </div>
                    <div className={`text-sm font-bold mb-1.5 ${colorClass}`}>{label}</div>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-3">{desc}</p>
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
