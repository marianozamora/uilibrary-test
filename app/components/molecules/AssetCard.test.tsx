import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AssetCard from './AssetCard'
import type { Asset } from '@data/assets'

const asset: Asset = {
  id: 1,
  name: 'Revenue Growth KPI',
  type: 'kpi',
  tags: ['finance', 'growth'],
  date: '07/12/2024',
  featured: true,
  trending: false,
  affiliate: false,
  desc: 'Month-over-month revenue tracker.',
}

describe('AssetCard', () => {
  it('renders asset name and description', () => {
    render(<AssetCard asset={asset} isFavorite={false} onOpen={vi.fn()} onFavorite={vi.fn()} />)
    expect(screen.getByText('Revenue Growth KPI')).toBeInTheDocument()
    expect(screen.getByText('Month-over-month revenue tracker.')).toBeInTheDocument()
  })

  it('renders the date', () => {
    render(<AssetCard asset={asset} isFavorite={false} onOpen={vi.fn()} onFavorite={vi.fn()} />)
    expect(screen.getByText('07/12/2024')).toBeInTheDocument()
  })

  it('calls onOpen with asset id on card click', async () => {
    const onOpen = vi.fn()
    const user = userEvent.setup()
    render(<AssetCard asset={asset} isFavorite={false} onOpen={onOpen} onFavorite={vi.fn()} />)
    await user.click(screen.getByText('Revenue Growth KPI'))
    expect(onOpen).toHaveBeenCalledWith(1)
  })

  it('calls onFavorite on heart button click without triggering onOpen', async () => {
    const onOpen = vi.fn()
    const onFavorite = vi.fn()
    const user = userEvent.setup()
    render(<AssetCard asset={asset} isFavorite={false} onOpen={onOpen} onFavorite={onFavorite} />)
    await user.click(screen.getByTitle('Favorite'))
    expect(onFavorite).toHaveBeenCalledWith(1)
    expect(onOpen).not.toHaveBeenCalled()
  })

  it('renders TypeBadge for the asset type', () => {
    render(<AssetCard asset={asset} isFavorite={false} onOpen={vi.fn()} onFavorite={vi.fn()} />)
    expect(screen.getByText('KPI')).toBeInTheDocument()
  })

  it('renders filled heart when isFavorite is true', () => {
    const { container } = render(<AssetCard asset={asset} isFavorite onOpen={vi.fn()} onFavorite={vi.fn()} />)
    const svg = container.querySelector('button svg')!
    expect(svg.getAttribute('fill')).toBe('currentColor')
  })
})
