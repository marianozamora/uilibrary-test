type AssetType = 'kpi' | 'layout' | 'dataviz' | 'storyboard'

export const assetIconStyle: Record<AssetType, string> = {
  kpi:        'bg-blue-50 text-blue-500',
  layout:     'bg-green-50 text-green-500',
  dataviz:    'bg-amber-50 text-amber-500',
  storyboard: 'bg-fuchsia-50 text-fuchsia-500',
}

export const assetAccent: Record<AssetType, string> = {
  kpi:        'bg-blue-500',
  layout:     'bg-green-500',
  dataviz:    'bg-amber-500',
  storyboard: 'bg-fuchsia-500',
}

export const assetBadge: Record<AssetType, { label: string; chip: string; dot: string }> = {
  kpi:        { label: 'KPI',        chip: 'bg-blue-50 text-blue-700 border border-blue-200',           dot: 'bg-blue-500' },
  layout:     { label: 'Layout',     chip: 'bg-green-50 text-green-700 border border-green-200',        dot: 'bg-green-500' },
  dataviz:    { label: 'Data viz',   chip: 'bg-amber-50 text-amber-700 border border-amber-200',        dot: 'bg-amber-500' },
  storyboard: { label: 'Storyboard', chip: 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200', dot: 'bg-fuchsia-500' },
}
