import { assetBadge } from '@theme'
import type { AssetType } from '@data/assets'

export default function TypeBadge({ type }: { type: AssetType }) {
  const { label, chip, dot } = assetBadge[type]
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${chip}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
      {label}
    </span>
  )
}
