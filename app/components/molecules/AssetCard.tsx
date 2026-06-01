'use client'
import { assetAccent } from '@theme'
import type { Asset } from '@data/assets'
import TypeBadge from '@/components/atoms/TypeBadge'
import AssetIconBox from '@/components/atoms/AssetIcon'
import { HeartIcon } from '@/components/atoms/icons'

interface Props {
  asset: Asset
  isFavorite: boolean
  onOpen: (id: number) => void
  onFavorite: (id: number) => void
}

export default function AssetCard({ asset, isFavorite, onOpen, onFavorite }: Props) {
  return (
    <div
      onClick={() => onOpen(asset.id)}
      className="group relative flex items-start gap-3.5 bg-white border border-black/[0.08] rounded-2xl p-4 cursor-pointer
                 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)]
                 hover:border-black/[0.14] hover:-translate-y-px transition-all duration-150"
    >
      <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${assetAccent[asset.type]}`} />

      <AssetIconBox type={asset.type} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-900 leading-snug mb-1 tracking-tight">{asset.name}</p>
        <p className="text-[13px] text-zinc-500 leading-relaxed mb-2.5">{asset.desc}</p>
        <div className="flex items-center justify-between gap-2">
          <TypeBadge type={asset.type} />
          <span className="text-[11.5px] text-zinc-400 tabular-nums">{asset.date}</span>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onFavorite(asset.id) }}
        className={`absolute top-3 right-3 w-6.5 h-6.5 rounded-lg flex items-center justify-center
          transition-all duration-150
          ${isFavorite
            ? 'opacity-100 text-fuchsia-500'
            : 'opacity-0 group-hover:opacity-100 text-zinc-300 hover:text-zinc-500 hover:bg-zinc-100'
          }`}
        title="Favorite"
      >
        <HeartIcon filled={isFavorite} />
      </button>
    </div>
  )
}
