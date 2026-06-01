'use client'
import { useState, useCallback, useRef, useEffect } from 'react'
import { ASSETS, Asset } from '../data/assets'
import AssetCard from './AssetCard'
import AssetModal from './AssetModal'
import RequestModal from './RequestModal'
import { SearchIcon, InfoIcon } from './icons'

type Tab = 'featured' | 'kpi' | 'layouts' | 'storyboards'
type ModalState = { type: 'asset'; id: number } | { type: 'request' } | null

const RECENT = ['Revenue', 'Churn Rate', 'Q3 Dashboard']
const SHOW_MAX = 4
const FAV_KEY = 'library-favorites'

export default function Library() {
  const [tab, setTab] = useState<Tab>('featured')
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [modal, setModal] = useState<ModalState>(null)
  const [showRecent, setShowRecent] = useState(false)
  const [showAllFeatured, setShowAllFeatured] = useState(false)
  const [showAllTrending, setShowAllTrending] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAV_KEY)
      if (stored) setFavorites(new Set(JSON.parse(stored)))
    } catch {}
  }, [])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowRecent(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.getElementById('search-input')?.focus()
      }
      if (e.key === 'Escape') setModal(null)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const toggleFav = useCallback((id: number) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      try { localStorage.setItem(FAV_KEY, JSON.stringify(Array.from(next))) } catch {}
      return next
    })
  }, [])

  function getPool(): Asset[] {
    let pool = [...ASSETS]
    if (tab === 'kpi') pool = pool.filter(a => a.type === 'kpi')
    else if (tab === 'layouts') pool = pool.filter(a => a.type === 'layout')
    else if (tab === 'storyboards') pool = pool.filter(a => a.type === 'storyboard')
    if (query) {
      const q = query.toLowerCase()
      pool = pool.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.desc.toLowerCase().includes(q) ||
        a.tags.some(t => t.includes(q))
      )
    }
    return pool
  }

  function changeTab(t: Tab) {
    setTab(t)
    setShowAllFeatured(false)
    setShowAllTrending(false)
  }

  const pool = getPool()
  const featured = pool.filter(a => a.featured)
  const trending  = pool.filter(a => a.trending)

  const activeAsset = modal?.type === 'asset' ? ASSETS.find(a => a.id === modal.id) ?? null : null

  return (
    <div className="min-h-screen" style={{ background: '#F5F4EF' }}>
      <div className="max-w-[860px] mx-auto px-6 py-8 relative">

        <button
          onClick={() => setModal({ type: 'request' })}
          className="absolute top-8 right-6 flex items-center gap-1.5 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white text-[13px] font-medium rounded-xl transition-colors"
        >
          <InfoIcon />
          Request
        </button>

        <div className="text-center pb-7 pt-3">
          <h1 className="font-serif-display text-5xl tracking-tight text-zinc-900 mb-2.5">Library</h1>
          <p className="text-[14px] text-zinc-400">Browse for assets needed to report and present analysis.</p>
        </div>

        <div className="max-w-[560px] mx-auto mb-5" ref={searchRef}>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              id="search-input"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowRecent(false) }}
              onFocus={() => { if (!query) setShowRecent(true) }}
              placeholder="Type to search…"
              className="w-full h-11 pl-10 pr-14 text-[14px] border border-black/[0.12] rounded-xl bg-white text-zinc-900 outline-none
                         shadow-[0_1px_3px_rgba(0,0,0,0.06)] focus:border-black/[0.22] focus:ring-[3px] focus:ring-black/[0.06]
                         transition-all placeholder:text-zinc-300"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-zinc-300 bg-zinc-100 border border-black/[0.07] rounded px-1.5 py-0.5 pointer-events-none">⌘K</span>

            {showRecent && (
              <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border border-black/[0.12] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.10)] overflow-hidden">
                <p className="px-3.5 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300">Recent searches</p>
                {RECENT.map(r => (
                  <button key={r} onMouseDown={() => { setQuery(r); setShowRecent(false) }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13.5px] text-zinc-500 hover:bg-zinc-50 text-left transition-colors">
                    <SearchIcon />{r}
                  </button>
                ))}
              </div>
            )}
          </div>
          {query && (
            <button onClick={() => setQuery('')} className="mt-2 ml-1 text-[12.5px] text-zinc-400 hover:text-zinc-600 transition-colors">
              Clear search
            </button>
          )}
        </div>

        <div className="max-w-[560px] mx-auto mb-9">
          <div className="grid grid-cols-4 border border-black/[0.12] rounded-xl overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            {(['featured','kpi','layouts','storyboards'] as Tab[]).map((t, i, arr) => (
              <button key={t}
                onClick={() => changeTab(t)}
                className={`py-2.5 text-[13.5px] transition-all
                  ${i < arr.length - 1 ? 'border-r border-black/[0.09]' : ''}
                  ${tab === t ? 'bg-zinc-900 text-white font-medium' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600'}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {query ? (
          <Section title={`${pool.length} result${pool.length === 1 ? '' : 's'}`} sub={`Showing results for "${query}"`}>
            {pool.length === 0
              ? <Empty query={query} />
              : pool.map(a => <AssetCard key={a.id} asset={a} isFavorite={favorites.has(a.id)} onOpen={id => setModal({ type: 'asset', id })} onFavorite={toggleFav} />)
            }
          </Section>
        ) : tab === 'featured' ? (
          <>
            <Section title="Featured" sub="Curated top picks from this week.">
              {(showAllFeatured ? featured : featured.slice(0, SHOW_MAX)).map(a =>
                <AssetCard key={a.id} asset={a} isFavorite={favorites.has(a.id)} onOpen={id => setModal({ type: 'asset', id })} onFavorite={toggleFav} />
              )}
              {!showAllFeatured && featured.length > SHOW_MAX && (
                <ShowMoreBtn count={featured.length - SHOW_MAX} onClick={() => setShowAllFeatured(true)} />
              )}
            </Section>
            <Section title="Trending" sub="Most popular by community.">
              {(showAllTrending ? trending : trending.slice(0, SHOW_MAX)).map(a =>
                <AssetCard key={a.id} asset={a} isFavorite={favorites.has(a.id)} onOpen={id => setModal({ type: 'asset', id })} onFavorite={toggleFav} />
              )}
              {!showAllTrending && trending.length > SHOW_MAX && (
                <ShowMoreBtn count={trending.length - SHOW_MAX} onClick={() => setShowAllTrending(true)} />
              )}
            </Section>
          </>
        ) : (
          <Section title="" sub="">
            {pool.length === 0
              ? <Empty />
              : pool.map(a => <AssetCard key={a.id} asset={a} isFavorite={favorites.has(a.id)} onOpen={id => setModal({ type: 'asset', id })} onFavorite={toggleFav} />)
            }
          </Section>
        )}
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/40 backdrop-blur-sm"
          onClick={e => { if (e.target === e.currentTarget) setModal(null) }}
        >
          {modal.type === 'asset' && activeAsset && (
            <AssetModal
              asset={activeAsset}
              isFavorite={favorites.has(activeAsset.id)}
              onClose={() => setModal(null)}
              onFavorite={toggleFav}
              onRequest={() => setModal({ type: 'request' })}
            />
          )}
          {modal.type === 'request' && (
            <RequestModal onClose={() => setModal(null)} />
          )}
        </div>
      )}
    </div>
  )
}

function Section({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      {title && (
        <div className="mb-4">
          <h2 className="font-serif-display text-[30px] font-normal tracking-tight text-zinc-900">{title}</h2>
          {sub && <p className="text-[13px] text-zinc-400 mt-0.5">{sub}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">{children}</div>
    </div>
  )
}

function ShowMoreBtn({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="col-span-1 sm:col-span-2 flex items-center justify-center gap-2 py-3 bg-white border border-dashed border-black/[0.12] rounded-2xl
                 text-[13px] text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 hover:border-black/[0.2] transition-all
                 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      Show more assets ({count} more)
    </button>
  )
}

function Empty({ query }: { query?: string }) {
  return (
    <div className="col-span-1 sm:col-span-2 text-center py-12 text-zinc-400">
      <p className="text-[15px] font-medium text-zinc-500 mb-1.5">
        {query ? 'Not seeing it… try search' : 'Nothing here yet'}
      </p>
      <p className="text-[13.5px]">
        {query ? `No assets matched "${query}". Try a different term or tag.` : 'No assets in this category.'}
      </p>
    </div>
  )
}
