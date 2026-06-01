'use client'
import { useState } from 'react'
import { Asset } from '../data/assets'
import TypeBadge from './TypeBadge'
import AssetIconBox from './AssetIcon'
import { CloseIcon, CopyIcon, HeartIcon } from './icons'

interface Props {
  asset: Asset
  isFavorite: boolean
  onClose: () => void
  onFavorite: (id: number) => void
  onRequest: () => void
}

const TOPBAR: Record<string, string> = {
  kpi: 'bg-blue-500', layout: 'bg-green-500', dataviz: 'bg-amber-500', storyboard: 'bg-fuchsia-500'
}

export default function AssetModal({ asset, isFavorite, onClose, onFavorite, onRequest }: Props) {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="flex flex-col w-full max-w-[540px] max-h-[88vh] bg-white rounded-2xl border border-black/[0.07] overflow-hidden
                    shadow-[0_20px_60px_rgba(0,0,0,0.16),0_0_0_1px_rgba(0,0,0,0.06)] animate-modal">
      <div className={`h-[3px] flex-shrink-0 ${TOPBAR[asset.type]}`} />

      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-black/[0.07] flex-shrink-0">
        <div className="flex items-start gap-3.5">
          <AssetIconBox type={asset.type} size="lg" />
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight leading-snug text-zinc-900">{asset.name}</h2>
            <div className="flex items-center gap-2 mt-1.5">
              <TypeBadge type={asset.type} />
              <span className="text-[12px] text-zinc-400">{asset.date}</span>
            </div>
          </div>
        </div>
        <button onClick={onClose}
          className="w-7.5 h-7.5 rounded-full bg-zinc-100 border border-black/[0.07] flex items-center justify-center hover:bg-zinc-200 transition-colors flex-shrink-0 mt-0.5">
          <CloseIcon />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            {asset.tags.map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500 border border-black/[0.07]">{t}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Description</p>
          <p className="text-[13.5px] text-zinc-700 leading-relaxed">{asset.desc}</p>
        </div>

        {/* KPI fields */}
        {asset.type === 'kpi' && <>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Business questions</p>
            <div className="flex flex-col gap-1.5">
              {asset.bq?.map((q, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-zinc-50 border border-black/[0.07] rounded-xl px-3.5 py-2.5">
                  <span className="font-mono text-[10px] text-zinc-400 bg-white border border-black/[0.07] rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5">Q{i+1}</span>
                  <p className="text-[13.5px] text-zinc-800 leading-snug">{q}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Metric IDs</p>
            <div className="flex flex-wrap gap-1.5">
              {asset.metricIds?.map(m => <span key={m} className="text-[12.5px] px-3 py-1 rounded-full border border-black/[0.12] text-zinc-500 bg-white">{m}</span>)}
            </div>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Calculation</p>
            <div className="font-mono text-[12px] bg-zinc-900 text-zinc-100 rounded-xl px-4 py-3 leading-relaxed">{asset.calc}</div>
          </div>
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/[0.07] bg-zinc-50">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${asset.visuals ? 'bg-green-500' : 'bg-zinc-300'}`} />
            <span className="text-[13.5px] text-zinc-700">{asset.visuals ? 'Visuals available for this KPI' : 'No visuals available for this KPI'}</span>
          </div>
          {asset.affiliate && (
            <div className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-3">
              <div>
                <p className="text-[13.5px] font-medium text-amber-800">Affiliate applicability: {asset.afName}</p>
                <p className="text-[12px] text-amber-700/70 mt-0.5">Access required to view affiliate data</p>
              </div>
              <button onClick={onRequest} className="px-3.5 py-1.5 bg-zinc-900 text-white text-[12.5px] font-medium rounded-lg hover:opacity-80 transition-opacity whitespace-nowrap">
                Request access
              </button>
            </div>
          )}
        </>}

        {/* Layout fields */}
        {asset.type === 'layout' && <>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-zinc-50 border border-black/[0.07] rounded-xl px-3.5 py-3">
              <p className="text-[22px] font-semibold tracking-tight text-zinc-900">{asset.pages}</p>
              <p className="text-[12px] text-zinc-400 mt-0.5">Amount of pages</p>
            </div>
            <div className="bg-zinc-50 border border-black/[0.07] rounded-xl px-3.5 py-3">
              <p className="text-[18px] font-semibold tracking-tight text-zinc-900">{asset.date}</p>
              <p className="text-[12px] text-zinc-400 mt-0.5">Last updated</p>
            </div>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">KPIs being used</p>
            <div className="flex flex-wrap gap-1.5">
              {asset.kpisUsed?.map(k => <span key={k} className="text-[12.5px] px-3 py-1 rounded-full border border-black/[0.12] text-zinc-500 bg-white">{k}</span>)}
            </div>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Preview layout</p>
            <div className="border-[1.5px] border-dashed border-black/[0.12] rounded-2xl h-28 flex flex-col items-center justify-center gap-2 text-zinc-400 text-[13px] cursor-pointer hover:bg-zinc-50 hover:border-black/[0.2] transition-all">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
              </svg>
              Click to expand preview
            </div>
          </div>
        </>}

        {/* Data viz fields */}
        {asset.type === 'dataviz' && <>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Chart type</p>
            <p className="text-[13.5px] text-zinc-700">{asset.chartType}</p>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Applicable KPI favorites</p>
            <div className="flex flex-wrap gap-1.5">
              {asset.kpisFavs?.map(k => <span key={k} className="text-[12.5px] px-3 py-1 rounded-full border border-black/[0.12] text-zinc-500 bg-white">{k}</span>)}
            </div>
          </div>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Asset info context</p>
            <p className="text-[13.5px] text-zinc-700 leading-relaxed">Interact with this chart to filter by date range, affiliate, or dimension. All selections sync across the layout.</p>
          </div>
          {asset.affiliate && (
            <div className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-3">
              <div>
                <p className="text-[13.5px] font-medium text-amber-800">Affiliate: {asset.afName}</p>
                <p className="text-[12px] text-amber-700/70 mt-0.5">Restricted — request access to unlock</p>
              </div>
              <button onClick={onRequest} className="px-3.5 py-1.5 bg-zinc-900 text-white text-[12.5px] font-medium rounded-lg hover:opacity-80 transition-opacity whitespace-nowrap">
                Request access
              </button>
            </div>
          )}
        </>}

        {/* Storyboard fields */}
        {asset.type === 'storyboard' && <>
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Coupled KPIs / filters</p>
            <div className="flex flex-wrap gap-1.5">
              {asset.kpis?.map(k => <span key={k} className="text-[12.5px] px-3 py-1 rounded-full border border-black/[0.12] text-zinc-500 bg-white">{k}</span>)}
            </div>
          </div>
          {asset.affiliates && asset.affiliates.length > 0 && <>
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">Applicable affiliates</p>
              <div className="flex flex-wrap gap-1.5">
                {asset.affiliates.map(a => <span key={a} className="text-[12.5px] px-3 py-1 rounded-full border border-black/[0.12] text-zinc-500 bg-white">{a}</span>)}
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-3">
              <div>
                <p className="text-[13.5px] font-medium text-amber-800">Restricted access required</p>
                <p className="text-[12px] text-amber-700/70 mt-0.5">This storyboard requires affiliate approval</p>
              </div>
              <button onClick={onRequest} className="px-3.5 py-1.5 bg-zinc-900 text-white text-[12.5px] font-medium rounded-lg hover:opacity-80 transition-opacity whitespace-nowrap">
                Request access
              </button>
            </div>
          </>}
        </>}
      </div>

      <div className="flex gap-2 px-5 py-3.5 border-t border-black/[0.07] flex-shrink-0">
        <button
          onClick={() => onFavorite(asset.id)}
          className={`flex-1 h-10 flex items-center justify-center gap-2 rounded-xl text-[13.5px] font-medium transition-all duration-150
            ${isFavorite
              ? 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200'
              : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
        >
          <HeartIcon filled={isFavorite} />
          {isFavorite ? 'Favorited' : 'Favorite item'}
        </button>
        <button
          onClick={copyLink}
          className="h-10 px-4 flex items-center gap-2 bg-white border border-black/[0.12] rounded-xl text-[13.5px] text-zinc-500 hover:bg-zinc-50 hover:border-black/[0.2] transition-all"
          style={{ color: copied ? '#15803D' : undefined }}
        >
          <CopyIcon />
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  )
}
