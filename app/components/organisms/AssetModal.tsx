'use client'
import { useState } from 'react'
import { assetAccent } from '@theme'
import type { Asset } from '@data/assets'
import TypeBadge from '@/components/atoms/TypeBadge'
import AssetIconBox from '@/components/atoms/AssetIcon'
import Tag from '@/components/atoms/Tag'
import FieldLabel from '@/components/atoms/FieldLabel'
import { CloseIcon, CopyIcon, HeartIcon } from '@/components/atoms/icons'

interface Props {
  asset: Asset
  isFavorite: boolean
  onClose: () => void
  onFavorite: (id: number) => void
  onRequest: () => void
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
      <div className={`h-[3px] flex-shrink-0 ${assetAccent[asset.type]}`} />

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
          <FieldLabel>Tags</FieldLabel>
          <div className="flex flex-wrap gap-1.5">
            {asset.tags.map(t => <Tag key={t} label={t} />)}
          </div>
        </div>

        <div>
          <FieldLabel>Description</FieldLabel>
          <p className="text-[13.5px] text-zinc-700 leading-relaxed">{asset.desc}</p>
        </div>

        {asset.type === 'kpi' && <>
          <div>
            <FieldLabel>Business questions</FieldLabel>
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
            <FieldLabel>Metric IDs</FieldLabel>
            <div className="flex flex-wrap gap-1.5">
              {asset.metricIds?.map(m => <Tag key={m} label={m} variant="outline" />)}
            </div>
          </div>
          <div>
            <FieldLabel>Calculation</FieldLabel>
            <div className="font-mono text-[12px] bg-zinc-900 text-zinc-100 rounded-xl px-4 py-3 leading-relaxed">{asset.calc}</div>
          </div>
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-black/[0.07] bg-zinc-50">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${asset.visuals ? 'bg-green-500' : 'bg-zinc-300'}`} />
            <span className="text-[13.5px] text-zinc-700">{asset.visuals ? 'Visuals available for this KPI' : 'No visuals available for this KPI'}</span>
          </div>
          {asset.affiliate && <AccessBanner name={asset.afName ?? ''} subtitle="Access required to view affiliate data" onRequest={onRequest} />}
        </>}

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
            <FieldLabel>KPIs being used</FieldLabel>
            <div className="flex flex-wrap gap-1.5">
              {asset.kpisUsed?.map(k => <Tag key={k} label={k} variant="outline" />)}
            </div>
          </div>
          <div>
            <FieldLabel>Preview layout</FieldLabel>
            <div className="border-[1.5px] border-dashed border-black/[0.12] rounded-2xl h-28 flex flex-col items-center justify-center gap-2 text-zinc-400 text-[13px] cursor-pointer hover:bg-zinc-50 hover:border-black/[0.2] transition-all">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-6 h-6">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
              </svg>
              Click to expand preview
            </div>
          </div>
        </>}

        {asset.type === 'dataviz' && <>
          <div>
            <FieldLabel>Chart type</FieldLabel>
            <p className="text-[13.5px] text-zinc-700">{asset.chartType}</p>
          </div>
          <div>
            <FieldLabel>Applicable KPI favorites</FieldLabel>
            <div className="flex flex-wrap gap-1.5">
              {asset.kpisFavs?.map(k => <Tag key={k} label={k} variant="outline" />)}
            </div>
          </div>
          <div>
            <FieldLabel>Asset info context</FieldLabel>
            <p className="text-[13.5px] text-zinc-700 leading-relaxed">Interact with this chart to filter by date range, affiliate, or dimension. All selections sync across the layout.</p>
          </div>
          {asset.affiliate && <AccessBanner name={asset.afName ?? ''} subtitle="Restricted — request access to unlock" onRequest={onRequest} />}
        </>}

        {asset.type === 'storyboard' && <>
          <div>
            <FieldLabel>Coupled KPIs / filters</FieldLabel>
            <div className="flex flex-wrap gap-1.5">
              {asset.kpis?.map(k => <Tag key={k} label={k} variant="outline" />)}
            </div>
          </div>
          {asset.affiliates && asset.affiliates.length > 0 && <>
            <div>
              <FieldLabel>Applicable affiliates</FieldLabel>
              <div className="flex flex-wrap gap-1.5">
                {asset.affiliates.map(a => <Tag key={a} label={a} variant="outline" />)}
              </div>
            </div>
            <AccessBanner name="Restricted access required" subtitle="This storyboard requires affiliate approval" onRequest={onRequest} />
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

function AccessBanner({ name, subtitle, onRequest }: { name: string; subtitle: string; onRequest: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-3">
      <div>
        <p className="text-[13.5px] font-medium text-amber-800">{name}</p>
        <p className="text-[12px] text-amber-700/70 mt-0.5">{subtitle}</p>
      </div>
      <button
        onClick={onRequest}
        className="px-3.5 py-1.5 bg-zinc-900 text-white text-[12.5px] font-medium rounded-lg hover:opacity-80 transition-opacity whitespace-nowrap"
      >
        Request access
      </button>
    </div>
  )
}
