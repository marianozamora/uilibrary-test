'use client'
import { useState, useCallback, useEffect } from 'react'
import { ASSETS, type Asset } from '@data/assets'
import AssetCard from '@/components/molecules/AssetCard'
import SearchBar from '@/components/molecules/SearchBar'
import TabBar from '@/components/molecules/TabBar'
import Section from '@/components/molecules/Section'
import ShowMoreBtn from '@/components/molecules/ShowMoreBtn'
import EmptyState from '@/components/molecules/EmptyState'
import AssetModal from '@/components/organisms/AssetModal'
import RequestModal from '@/components/organisms/RequestModal'
import { InfoIcon } from '@/components/atoms/icons'

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
  const [showAllFeatured, setShowAllFeatured] = useState(false)
  const [showAllTrending, setShowAllTrending] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAV_KEY)
      if (stored) setFavorites(new Set(JSON.parse(stored)))
    } catch {}
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
  const openAsset = (id: number) => setModal({ type: 'asset', id })

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

        <SearchBar query={query} onChange={setQuery} recentSearches={RECENT} />
        <TabBar active={tab} onChange={changeTab} />

        {query ? (
          <Section title={`${pool.length} result${pool.length === 1 ? '' : 's'}`} sub={`Showing results for "${query}"`}>
            {pool.length === 0
              ? <EmptyState query={query} />
              : pool.map(a => <AssetCard key={a.id} asset={a} isFavorite={favorites.has(a.id)} onOpen={openAsset} onFavorite={toggleFav} />)
            }
          </Section>
        ) : tab === 'featured' ? (
          <>
            <Section title="Featured" sub="Curated top picks from this week.">
              {(showAllFeatured ? featured : featured.slice(0, SHOW_MAX)).map(a =>
                <AssetCard key={a.id} asset={a} isFavorite={favorites.has(a.id)} onOpen={openAsset} onFavorite={toggleFav} />
              )}
              {!showAllFeatured && featured.length > SHOW_MAX && (
                <ShowMoreBtn count={featured.length - SHOW_MAX} onClick={() => setShowAllFeatured(true)} />
              )}
            </Section>
            <Section title="Trending" sub="Most popular by community.">
              {(showAllTrending ? trending : trending.slice(0, SHOW_MAX)).map(a =>
                <AssetCard key={a.id} asset={a} isFavorite={favorites.has(a.id)} onOpen={openAsset} onFavorite={toggleFav} />
              )}
              {!showAllTrending && trending.length > SHOW_MAX && (
                <ShowMoreBtn count={trending.length - SHOW_MAX} onClick={() => setShowAllTrending(true)} />
              )}
            </Section>
          </>
        ) : (
          <Section>
            {pool.length === 0
              ? <EmptyState />
              : pool.map(a => <AssetCard key={a.id} asset={a} isFavorite={favorites.has(a.id)} onOpen={openAsset} onFavorite={toggleFav} />)
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
