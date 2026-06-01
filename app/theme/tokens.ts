export const fontFamilies = {
  serif: ['Instrument Serif', 'serif'] as const,
  mono:  ['JetBrains Mono', 'monospace'] as const,
  sans:  ['Inter', 'sans-serif'] as const,
}

export const assetTypeHex = {
  kpi:        '#3B82F6',
  layout:     '#22C55E',
  dataviz:    '#F59E0B',
  storyboard: '#D946EF',
} as const

export const assetTypeNames = {
  kpi:        'KPI',
  layout:     'Layout',
  dataviz:    'Data viz',
  storyboard: 'Storyboard',
} as const
