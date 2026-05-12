import { Layers, ChevronRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1b69] px-6 py-7 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white/15 rounded-xl p-2.5 flex items-center justify-center">
            <Layers size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">Learn with Edzy</div>
            <div className="text-white/60 text-xs mt-0.5 leading-relaxed">
              Need step-by-step explanations and interactive help?<br />
              Explore Edzy for a better learning experience.
            </div>
          </div>
        </div>
        <a
          href="https://www.edzy.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl no-underline flex items-center gap-1.5 whitespace-nowrap hover:bg-gray-50"
        >
          Explore Edzy <ChevronRight size={14} />
        </a>
      </div>
      <div className="bg-[#111] py-2.5 px-6 text-center text-[11px] text-white/35">
        Built for students. Structured by subject, book, and chapter.
      </div>
    </footer>
  )
}
