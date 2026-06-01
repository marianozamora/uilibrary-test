import { assetIconStyle } from '@theme'
import { AssetIcon as Icon } from './icons'
import type { AssetType } from '@data/assets'

export default function AssetIconBox({ type, size = 'md' }: { type: AssetType; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'w-11 h-11' : 'w-12 h-12'
  return (
    <div className={`${dim} rounded-xl flex-shrink-0 flex items-center justify-center ${assetIconStyle[type]}`}>
      <Icon type={type} />
    </div>
  )
}
