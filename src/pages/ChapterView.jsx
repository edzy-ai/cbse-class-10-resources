import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Copy, Check, Share2, X } from 'lucide-react'
import { FaWhatsapp, FaTelegram, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const categoryStyle = {
  'Quick Understanding': { numBg: 'bg-green-50',  numBorder: 'border-green-400',  numText: 'text-green-600',  tagBg: 'bg-green-50',  tagText: 'text-green-600',  tagBorder: 'border-green-200',  divider: 'border-green-100',  tag: 'Learn'          },
  'Practice Questions':  { numBg: 'bg-blue-50',   numBorder: 'border-blue-400',   numText: 'text-blue-600',   tagBg: 'bg-blue-50',   tagText: 'text-blue-600',   tagBorder: 'border-blue-200',   divider: 'border-blue-100',   tag: 'Practice'       },
  'Quick Review':        { numBg: 'bg-orange-50', numBorder: 'border-orange-400', numText: 'text-orange-600', tagBg: 'bg-orange-50', tagText: 'text-orange-600', tagBorder: 'border-orange-200', divider: 'border-orange-100', tag: 'Quick Revision' },
  'Find My Mistake':     { numBg: 'bg-red-50',    numBorder: 'border-red-400',    numText: 'text-red-600',    tagBg: 'bg-red-50',    tagText: 'text-red-600',    tagBorder: 'border-red-200',    divider: 'border-red-100',    tag: 'Find My Mistake'},
  'Exam Prep':           { numBg: 'bg-purple-50', numBorder: 'border-purple-400', numText: 'text-purple-600', tagBg: 'bg-purple-50', tagText: 'text-purple-600', tagBorder: 'border-purple-200', divider: 'border-purple-100', tag: 'Exam Prep'      },
}
const fallbackStyle = { numBg: 'bg-gray-50', numBorder: 'border-gray-300', numText: 'text-gray-600', tagBg: 'bg-gray-50', tagText: 'text-gray-600', tagBorder: 'border-gray-200', divider: 'border-gray-100', tag: 'Prompt' }

const aiTools = [
  { name: 'ChatGPT', svg: 'openai.svg',       url: 'https://chat.openai.com' },
  { name: 'Gemini',  svg: 'gemini-color.svg', url: 'https://gemini.google.com' },
  { name: 'Claude',  svg: 'claude-color.svg', url: 'https://claude.ai' },
]

const shareApps = [
  { name: 'WhatsApp', Icon: FaWhatsapp, colorClass: 'text-green-500',  getUrl: t => `https://wa.me/?text=${encodeURIComponent(t)}` },
  { name: 'Telegram', Icon: FaTelegram, colorClass: 'text-sky-500',    getUrl: t => `https://t.me/share/url?text=${encodeURIComponent(t)}` },
  { name: 'X',        Icon: FaXTwitter, colorClass: 'text-gray-900',   getUrl: t => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}` },
  { name: 'LinkedIn', Icon: FaLinkedin, colorClass: 'text-blue-600',   getUrl: t => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(t)}` },
  { name: 'Email',    Icon: MdEmail,    colorClass: 'text-gray-500',   getUrl: t => `mailto:?body=${encodeURIComponent(t)}` },
]

function fmt(slug) { return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }

export default function ChapterView() {
  const { subject, book, chapter } = useParams()
  const [chapterData, setChapterData] = useState(null)
  const [expanded, setExpanded]       = useState(new Set())
  const [copied, setCopied]           = useState(null)
  const [shareModal, setShareModal]   = useState(null)
  const [modalCopied, setModalCopied] = useState(false)
  const base = import.meta.env.BASE_URL

  useEffect(() => {
    fetch(`${base}data.json`)
      .then(r => r.json())
      .then(data => {
        const c = ((data[subject] || {})[book] || {})[chapter]
        setChapterData(c || null)
        if (c?.prompts) setExpanded(new Set(c.prompts.map((_, i) => i)))
      })
      .catch(() => {})
  }, [subject, book, chapter, base])

  const prompts = chapterData?.prompts || []
  const meta    = chapterData?.meta    || {}
  const edzyColor = meta.edzyColor || null
  const fg = edzyColor?.light?.foreground || '#6366F1'
  const bg = edzyColor?.light?.background || '#EEF2FF'

  async function openWithPrompt(url, promptText) {
    await navigator.clipboard.writeText(promptText)
    window.open(url, '_blank')
  }

  function copy(text, idx) {
    navigator.clipboard.writeText(text).then(() => { setCopied(idx); setTimeout(() => setCopied(null), 2000) })
  }

  function copyModal() {
    if (!shareModal) return
    navigator.clipboard.writeText(shareModal.prompt).then(() => { setModalCopied(true); setTimeout(() => setModalCopied(false), 2000) })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SEO
        title={meta.title ? `${meta.title} – Class 10 ${fmt(subject)}` : `Class 10 ${fmt(subject)} Prompts`}
        description={`Free AI prompts for ${meta.title || fmt(chapter)} — CBSE Class 10 ${fmt(subject)}. Includes Quick Understanding, Practice Questions, Quick Review, Find My Mistake, and Exam Prep prompts. Use with ChatGPT, Gemini, or Claude to study smarter.`}
      />
      <Navbar />
      <main className="flex-1">

        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-7">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-1 text-xs text-gray-400 mb-2 flex-wrap">
              <Link to="/" className="text-gray-400 no-underline hover:text-gray-600">Subject</Link><ChevronRight size={11} />
              <Link to={`/subjects/${subject}`} className="text-gray-400 no-underline hover:text-gray-600">{fmt(subject)}</Link><ChevronRight size={11} />
              <Link to={`/subjects/${subject}/books/${book}`} className="text-gray-400 no-underline hover:text-gray-600">{fmt(book)}</Link><ChevronRight size={11} />
              <span className="font-semibold" style={{ color: fg }}>{meta.title || fmt(chapter)}</span>
            </div>

            <div className="flex items-start gap-4 min-w-0">
              {meta.svgIcon && (
                <img
                  src={meta.svgIcon}
                  alt=""
                  className="w-12 h-12 rounded-xl object-contain p-1.5 shrink-0"
                  style={{ backgroundColor: fg }}
                  onError={e => e.target.style.display = 'none'}
                />
              )}
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-tight break-words">
                  {meta.title || fmt(chapter)}
                </h1>
                {meta.bookName && (
                  <p className="text-xs text-gray-400 mt-1 break-words">
                    Subject: {fmt(subject)} › Book: {meta.bookName} › Chapter: {meta.title}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Prompt cards */}
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-7">
          {prompts.length === 0 && (
            <div className="text-center text-gray-400 py-16 text-sm">No prompts found for this chapter.</div>
          )}

          {prompts.map((p, idx) => {
            const s      = categoryStyle[p.heading] || fallbackStyle
            const isOpen = expanded.has(idx)
            return (
              <div
                key={idx}
                className={`bg-white border rounded-2xl mb-2.5 overflow-hidden transition-colors duration-200 ${isOpen ? `border-${s.divider.split('-')[1]}-200` : 'border-gray-100'}`}
              >
                {/* Header row */}
                <div
                  onClick={() => setExpanded(prev => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n })}
                  className="flex items-center gap-2.5 px-4 py-3.5 cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-full ${s.numBg} border-2 ${s.numBorder} flex items-center justify-center font-bold text-xs ${s.numText} shrink-0`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-gray-900 leading-snug">{p.heading}</span>
                      <span className={`text-[10px] font-bold ${s.tagText} ${s.tagBg} border ${s.tagBorder} rounded-full px-2.5 py-0.5 shrink-0`}>{s.tag}</span>
                    </div>
                    {/* Copy + Share on mobile */}
                    <div className="flex items-center gap-1.5 mt-1.5 sm:hidden" onClick={e => e.stopPropagation()}>
                      <button onClick={() => copy(p.prompt, idx)} className="flex items-center gap-1 px-2.5 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                        {copied === idx ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                      </button>
                      <button onClick={() => setShareModal(p)} className="flex items-center gap-1 px-2.5 py-1 bg-white text-[#1D4ED8] border border-gray-200 rounded-lg text-xs font-semibold cursor-pointer hover:bg-gray-50 transition-colors">
                        <Share2 size={11} /> Share
                      </button>
                    </div>
                  </div>
                  {/* Copy + Share on desktop */}
                  <div className="hidden sm:flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                    <button onClick={() => copy(p.prompt, idx)} className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                      {copied === idx ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                    </button>
                    <button onClick={() => setShareModal(p)} className="flex items-center gap-1 px-3 py-1.5 bg-white text-[#1D4ED8] border border-gray-200 rounded-lg text-xs font-semibold cursor-pointer hover:bg-gray-50 transition-colors">
                      <Share2 size={11} /> Share
                    </button>
                  </div>
                  <ChevronDown size={15} className={`text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div className={`border-t ${s.divider} px-4 py-4`}>
                    <p className="font-sans text-sm text-gray-700 leading-relaxed line-clamp-3 m-0">{p.prompt}</p>
                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">USE IN</span>
                      {aiTools.map(({ name, svg, url }) => (
                        <button
                          key={name}
                          onClick={() => openWithPrompt(url, p.prompt)}
                          className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-[11px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <img src={`${base}${svg}`} alt={name} className="w-3.5 h-3.5" /> {name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </main>
      <Footer />

      {/* Share Modal */}
      {shareModal && (() => {
        const pageUrl = `https://edzy-ai.github.io/cbse-class-10-resources/#${window.location.hash.slice(1)}`
        const shareMessage = `Found a useful CBSE Class 10 ${fmt(subject)} prompt.\n\nChapter: ${meta.title || fmt(chapter)}\nPrompt: ${shareModal.heading}\n\nUse it with ChatGPT, Gemini, or Claude to learn faster.\n\n${pageUrl}\n\nFree CBSE resources by Edzy.`
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShareModal(null)}>
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <h3 className="font-bold text-base text-gray-900">Share this prompt</h3>
                <button onClick={() => setShareModal(null)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="px-5 pb-3 flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-900 leading-snug flex-1 min-w-0 truncate">{shareModal.heading}</span>
                <span className="shrink-0 text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5">{(categoryStyle[shareModal.heading] || fallbackStyle).tag}</span>
                <button onClick={copyModal} className="shrink-0 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors">
                  {modalCopied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                </button>
              </div>
              <div className="px-5 pb-4">
                <textarea readOnly value={shareModal.prompt} rows={5} className="w-full px-3 py-3 border border-gray-200 rounded-xl text-xs text-gray-600 resize-none font-sans leading-relaxed outline-none focus:border-indigo-300 bg-gray-50" />
              </div>
              <div className="px-5 pb-5">
                <p className="text-xs font-semibold text-gray-500 mb-3">Share on</p>
                <div className="grid grid-cols-5 gap-2">
                  {shareApps.map(({ name, Icon, colorClass: ic, getUrl }) => (
                    <a key={name} href={getUrl(shareMessage)} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 py-3 bg-gray-50 border border-gray-100 rounded-xl no-underline hover:bg-gray-100 transition-colors">
                      <Icon size={22} className={ic} />
                      <span className="text-[10px] text-gray-600 font-medium">{name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
