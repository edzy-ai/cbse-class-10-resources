import { BookOpen, Hash, Bookmark, Bot } from 'lucide-react'

const features = [
  { Icon: BookOpen, color: 'text-blue-500',   bg: 'bg-blue-50',   title: 'Book-wise structure', desc: 'Resources organised by subject, book, and chapter.' },
  { Icon: Hash,     color: 'text-green-500',  bg: 'bg-green-50',  title: 'Chapter numbers',     desc: 'Find the exact chapter with NCERT page numbers.' },
  { Icon: Bookmark, color: 'text-orange-500', bg: 'bg-orange-50', title: 'Page references',     desc: 'Accurate start and end pages from NCERT upgrades.' },
  { Icon: Bot,      color: 'text-purple-500', bg: 'bg-purple-50', title: 'AI prompts',          desc: 'Ready-made ChatGPT, Gemini, Claude prompts for self-study.' },
]

export default function WhatYouWillFind() {
  return (
    <section className="py-10">
      <h2 className="text-lg font-bold text-gray-900 mb-5">What you will find</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {features.map(({ Icon, color, bg, title, desc }) => (
          <div key={title} className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={17} className={color} />
            </div>
            <div className="text-sm font-semibold text-gray-900 mb-1">{title}</div>
            <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
