import { AssetType } from '../data/assets'
import { AssetIcon as Icon } from './icons'

const ICON_BG: Record<AssetType, string> = {
  kpi:        'bg-blue-50 text-blue-500',
  layout:     'bg-green-50 text-green-500',
  dataviz:    'bg-amber-50 text-amber-500',
  storyboard: 'bg-fuchsia-50 text-fuchsia-500',
}

export default function AssetIconBox({ type, size = 'md' }: { type: AssetType; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'w-11 h-11' : 'w-12 h-12'
  return (
    <div className={`${dim} rounded-xl flex-shrink-0 flex items-center justify-center ${ICON_BG[type]}`}>
      <Icon type={type} />
    </div>
  )
}
