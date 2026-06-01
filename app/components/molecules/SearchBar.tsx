'use client'
import { useRef, useEffect, useState } from 'react'
import { SearchIcon } from '@/components/atoms/icons'

interface Props {
  query: string
  onChange: (q: string) => void
  recentSearches?: string[]
}

export default function SearchBar({ query, onChange, recentSearches = [] }: Props) {
  const [showRecent, setShowRecent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowRecent(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="max-w-[560px] mx-auto mb-5" ref={containerRef}>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none">
          <SearchIcon />
        </span>
        <input
          id="search-input"
          value={query}
          onChange={e => { onChange(e.target.value); setShowRecent(false) }}
          onFocus={() => { if (!query) setShowRecent(true) }}
          placeholder="Type to search…"
          className="w-full h-11 pl-10 pr-14 text-[14px] border border-black/[0.12] rounded-xl bg-white text-zinc-900 outline-none
                     shadow-[0_1px_3px_rgba(0,0,0,0.06)] focus:border-black/[0.22] focus:ring-[3px] focus:ring-black/[0.06]
                     transition-all placeholder:text-zinc-300"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-zinc-300 bg-zinc-100 border border-black/[0.07] rounded px-1.5 py-0.5 pointer-events-none">
          ⌘K
        </span>

        {showRecent && recentSearches.length > 0 && (
          <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-black/[0.12] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden">
            <p className="px-3.5 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300">Recent searches</p>
            {recentSearches.map(r => (
              <button
                key={r}
                onMouseDown={() => { onChange(r); setShowRecent(false) }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13.5px] text-zinc-500 hover:bg-zinc-50 text-left transition-colors"
              >
                <SearchIcon />{r}
              </button>
            ))}
          </div>
        )}
      </div>

      {query && (
        <button
          onClick={() => onChange('')}
          className="mt-2 ml-1 text-[12.5px] text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          Clear search
        </button>
      )}
    </div>
  )
}
