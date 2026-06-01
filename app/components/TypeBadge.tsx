import { AssetType } from '../data/assets'

const CONFIG: Record<AssetType, { label: string; classes: string; dot: string }> = {
  kpi:        { label: 'KPI',        classes: 'bg-blue-50 text-blue-700 border border-blue-200',    dot: 'bg-blue-500' },
  layout:     { label: 'Layout',     classes: 'bg-green-50 text-green-700 border border-green-200', dot: 'bg-green-500' },
  dataviz:    { label: 'Data viz',   classes: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-500' },
  storyboard: { label: 'Storyboard', classes: 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200', dot: 'bg-fuchsia-500' },
}

export default function TypeBadge({ type }: { type: AssetType }) {
  const c = CONFIG[type]
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${c.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  )
}
