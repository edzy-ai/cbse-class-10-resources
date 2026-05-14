import { ChevronRight } from 'lucide-react'

const base = import.meta.env.BASE_URL

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="bg-gradient-to-r from-[#006BFF] to-[#4B35F5] px-5 py-5 sm:px-12 sm:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="bg-white/15 rounded-xl p-2 sm:p-3 flex items-center justify-center shrink-0">
            <img src={`${base}Frame.svg`} alt="Edzy" className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div>
            <div className="text-white font-bold text-sm sm:text-base">Edzy For classes 6-12</div>
            <div className="text-white/100 text-xs sm:text-sm mt-0.5 sm:mt-1 leading-relaxed max-w-sm">
              Edzy is a personal AI tutor for CBSE and State Board
              students, with curriculum-aligned guidance, practice,
              revision, and study plans that adapt to each learner.
            </div>
          </div>
        </div>
        <a
          href="https://www.edzy.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#1D4ED8] font-bold text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl no-underline flex items-center justify-center gap-1.5 whitespace-nowrap hover:bg-gray-50 self-start sm:self-auto"
        >
          Explore Edzy <ChevronRight size={14} />
        </a>
      </div>
      <div className="bg-gradient-to-r from-[#006BFF] to-[#4B35F5] px-5 pb-4 sm:px-12 text-center text-[9px] text-white/80">
        Built for students. Structured by subject, book, and chapter.
      </div>
    </footer>
  )
}
