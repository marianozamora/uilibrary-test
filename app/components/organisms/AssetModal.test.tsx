import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AssetModal from './AssetModal'
import type { Asset } from '@data/assets'

const kpiAsset: Asset = {
  id: 1,
  name: 'Revenue Growth KPI',
  type: 'kpi',
  tags: ['finance', 'growth'],
  date: '07/12/2024',
  featured: true,
  trending: false,
  affiliate: true,
  afName: 'Acme Corp',
  desc: 'Month-over-month revenue performance tracker.',
  bq: ['Is revenue on track?', 'What drove the delta?'],
  metricIds: ['net_revenue', 'mom_growth_pct'],
  calc: 'SUM(Revenue) / LAG(SUM(Revenue), 1) - 1',
  visuals: true,
}

const layoutAsset: Asset = {
  id: 5,
  name: 'Q3 Executive Dashboard',
  type: 'layout',
  tags: ['q3', 'exec'],
  date: '07/23/2024',
  featured: true,
  trending: false,
  affiliate: false,
  desc: 'Full executive summary layout.',
  pages: 6,
  kpisUsed: ['Net Revenue', 'NPS'],
}

const datavizAsset: Asset = {
  id: 7,
  name: 'Revenue Waterfall',
  type: 'dataviz',
  tags: ['finance'],
  date: '07/08/2024',
  featured: true,
  trending: true,
  affiliate: true,
  afName: 'Acme Corp',
  desc: 'Visual breakdown of revenue.',
  chartType: 'Waterfall chart',
  kpisFavs: ['Net Revenue'],
}

const storyboardAsset: Asset = {
  id: 9,
  name: 'Market Expansion Story',
  type: 'storyboard',
  tags: ['strategy'],
  date: '07/20/2024',
  featured: true,
  trending: false,
  affiliate: false,
  desc: 'Strategic narrative for new market entry.',
  kpis: ['TAM', 'Market Share %'],
  affiliates: ['GlobalBrand'],
}

const defaultProps = {
  isFavorite: false,
  onClose: vi.fn(),
  onFavorite: vi.fn(),
  onRequest: vi.fn(),
}

describe('AssetModal – common', () => {
  it('renders asset name', () => {
    render(<AssetModal asset={kpiAsset} {...defaultProps} />)
    expect(screen.getByText('Revenue Growth KPI')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<AssetModal asset={kpiAsset} {...defaultProps} />)
    expect(screen.getByText('Month-over-month revenue performance tracker.')).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<AssetModal asset={kpiAsset} {...defaultProps} />)
    expect(screen.getByText('finance')).toBeInTheDocument()
    expect(screen.getByText('growth')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<AssetModal asset={kpiAsset} {...defaultProps} onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: '' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onFavorite with asset id when Favorite button clicked', async () => {
    const onFavorite = vi.fn()
    const user = userEvent.setup()
    render(<AssetModal asset={kpiAsset} {...defaultProps} onFavorite={onFavorite} />)
    await user.click(screen.getByText('Favorite item'))
    expect(onFavorite).toHaveBeenCalledWith(1)
  })

  it('shows "Favorited" text when isFavorite is true', () => {
    render(<AssetModal asset={kpiAsset} {...defaultProps} isFavorite />)
    expect(screen.getByText('Favorited')).toBeInTheDocument()
  })

  it('shows "Copy link" button', () => {
    render(<AssetModal asset={kpiAsset} {...defaultProps} />)
    expect(screen.getByText('Copy link')).toBeInTheDocument()
  })
})

describe('AssetModal – copy link', () => {
  afterEach(() => { vi.useRealTimers() })

  it('shows "Copied!" after clicking copy link', async () => {
    const user = userEvent.setup()
    render(<AssetModal asset={kpiAsset} {...defaultProps} />)
    await user.click(screen.getByText('Copy link'))
    expect(screen.getByText('Copied!')).toBeInTheDocument()
  })

  it('reverts to "Copy link" after 1800ms', () => {
    vi.useFakeTimers()
    render(<AssetModal asset={kpiAsset} {...defaultProps} />)
    fireEvent.click(screen.getByText('Copy link'))
    expect(screen.getByText('Copied!')).toBeInTheDocument()
    act(() => { vi.advanceTimersByTime(1800) })
    expect(screen.getByText('Copy link')).toBeInTheDocument()
  })
})

describe('AssetModal – KPI type', () => {
  it('renders business questions', () => {
    render(<AssetModal asset={kpiAsset} {...defaultProps} />)
    expect(screen.getByText('Is revenue on track?')).toBeInTheDocument()
  })

  it('renders metric IDs as outline tags', () => {
    render(<AssetModal asset={kpiAsset} {...defaultProps} />)
    expect(screen.getByText('net_revenue')).toBeInTheDocument()
  })

  it('renders calculation formula', () => {
    render(<AssetModal asset={kpiAsset} {...defaultProps} />)
    expect(screen.getByText('SUM(Revenue) / LAG(SUM(Revenue), 1) - 1')).toBeInTheDocument()
  })

  it('renders "Visuals available" when visuals=true', () => {
    render(<AssetModal asset={kpiAsset} {...defaultProps} />)
    expect(screen.getByText('Visuals available for this KPI')).toBeInTheDocument()
  })

  it('renders "No visuals available" when visuals=false', () => {
    const asset = { ...kpiAsset, visuals: false }
    render(<AssetModal asset={asset} {...defaultProps} />)
    expect(screen.getByText('No visuals available for this KPI')).toBeInTheDocument()
  })

  it('renders AccessBanner with onRequest button when affiliate=true', async () => {
    const onRequest = vi.fn()
    const user = userEvent.setup()
    render(<AssetModal asset={kpiAsset} {...defaultProps} onRequest={onRequest} />)
    const btns = screen.getAllByText('Request access')
    await user.click(btns[0])
    expect(onRequest).toHaveBeenCalledTimes(1)
  })

  it('does not render AccessBanner when affiliate=false', () => {
    const asset = { ...kpiAsset, affiliate: false }
    render(<AssetModal asset={asset} {...defaultProps} />)
    expect(screen.queryByText('Request access')).not.toBeInTheDocument()
  })
})

describe('AssetModal – layout type', () => {
  it('renders pages count', () => {
    render(<AssetModal asset={layoutAsset} {...defaultProps} />)
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('Amount of pages')).toBeInTheDocument()
  })

  it('renders KPIs being used', () => {
    render(<AssetModal asset={layoutAsset} {...defaultProps} />)
    expect(screen.getByText('Net Revenue')).toBeInTheDocument()
    expect(screen.getByText('NPS')).toBeInTheDocument()
  })

  it('renders preview layout placeholder', () => {
    render(<AssetModal asset={layoutAsset} {...defaultProps} />)
    expect(screen.getByText('Click to expand preview')).toBeInTheDocument()
  })
})

describe('AssetModal – dataviz type', () => {
  it('renders chart type', () => {
    render(<AssetModal asset={datavizAsset} {...defaultProps} />)
    expect(screen.getByText('Waterfall chart')).toBeInTheDocument()
  })

  it('renders applicable KPI favorites', () => {
    render(<AssetModal asset={datavizAsset} {...defaultProps} />)
    expect(screen.getByText('Net Revenue')).toBeInTheDocument()
  })

  it('renders AccessBanner for affiliate dataviz', async () => {
    const onRequest = vi.fn()
    const user = userEvent.setup()
    render(<AssetModal asset={datavizAsset} {...defaultProps} onRequest={onRequest} />)
    await user.click(screen.getByText('Request access'))
    expect(onRequest).toHaveBeenCalledTimes(1)
  })
})

describe('AssetModal – storyboard type', () => {
  it('renders coupled KPIs', () => {
    render(<AssetModal asset={storyboardAsset} {...defaultProps} />)
    expect(screen.getByText('TAM')).toBeInTheDocument()
    expect(screen.getByText('Market Share %')).toBeInTheDocument()
  })

  it('renders applicable affiliates', () => {
    render(<AssetModal asset={storyboardAsset} {...defaultProps} />)
    expect(screen.getByText('GlobalBrand')).toBeInTheDocument()
  })

  it('renders AccessBanner for storyboard with affiliates', async () => {
    const onRequest = vi.fn()
    const user = userEvent.setup()
    render(<AssetModal asset={storyboardAsset} {...defaultProps} onRequest={onRequest} />)
    await user.click(screen.getByText('Request access'))
    expect(onRequest).toHaveBeenCalledTimes(1)
  })

  it('does not render affiliate section when affiliates is empty', () => {
    const asset = { ...storyboardAsset, affiliates: [] }
    render(<AssetModal asset={asset} {...defaultProps} />)
    expect(screen.queryByText('Request access')).not.toBeInTheDocument()
  })
})
