import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect, fn } from '@storybook/test'
import AssetCard from './AssetCard'
import type { Asset } from '@data/assets'

const kpi: Asset = {
  id: 1, name: 'Revenue Growth KPI', type: 'kpi',
  tags: ['finance', 'growth', 'mrr'], date: '07/12/2024',
  featured: true, trending: false, affiliate: true, afName: 'Acme Corp',
  desc: 'Month-over-month revenue performance tracker across all business units.',
  bq: ['Is revenue growth on track vs targets?'], metricIds: ['net_revenue'],
  calc: 'SUM(Revenue) / LAG(SUM(Revenue), 1) - 1', visuals: true,
}

const layout: Asset = {
  id: 5, name: 'Q3 Executive Dashboard', type: 'layout',
  tags: ['q3', 'exec'], date: '07/23/2024',
  featured: true, trending: false, affiliate: false,
  desc: 'Full executive summary layout for quarterly business review.',
  pages: 6, kpisUsed: ['Net Revenue', 'NPS'],
}

const dataviz: Asset = {
  id: 7, name: 'Revenue Waterfall', type: 'dataviz',
  tags: ['finance', 'waterfall'], date: '07/08/2024',
  featured: true, trending: true, affiliate: false,
  desc: 'Visual breakdown of revenue by segment, showing additions and losses.',
  chartType: 'Waterfall chart', kpisFavs: ['Net Revenue'],
}

const storyboard: Asset = {
  id: 9, name: 'Market Expansion Story', type: 'storyboard',
  tags: ['strategy', 'growth'], date: '07/20/2024',
  featured: true, trending: false, affiliate: false,
  desc: 'Strategic narrative for new market entry with supporting data points.',
  kpis: ['TAM', 'Market Share %'], affiliates: [],
}

const meta = {
  title: 'Molecules/AssetCard',
  component: AssetCard,
  tags: ['autodocs'],
  args: {
    onOpen: fn(),
    onFavorite: fn(),
    isFavorite: false,
  },
  decorators: [
    (Story) => <div className="max-w-sm p-4"><Story /></div>,
  ],
} satisfies Meta<typeof AssetCard>

export default meta
type Story = StoryObj<typeof meta>

export const KPI: Story        = { args: { asset: kpi } }
export const Layout: Story     = { args: { asset: layout } }
export const DataViz: Story    = { args: { asset: dataviz } }
export const Storyboard: Story = { args: { asset: storyboard } }

export const Favorited: Story = {
  args: { asset: kpi, isFavorite: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const heartBtn = canvas.getByTitle('Favorite')
    await expect(heartBtn).toHaveClass('opacity-100')
    await expect(heartBtn).toHaveClass('text-fuchsia-500')
  },
}

export const CardClickOpensAsset: Story = {
  args: { asset: kpi },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)

    await step('card text is rendered', async () => {
      await expect(canvas.getByText('Revenue Growth KPI')).toBeInTheDocument()
      await expect(canvas.getByText('Month-over-month revenue performance tracker across all business units.')).toBeInTheDocument()
    })

    await step('click card → onOpen called with asset id', async () => {
      await userEvent.click(canvas.getByText('Revenue Growth KPI'))
      await expect(args.onOpen).toHaveBeenCalledWith(1)
    })
  },
}

export const FavoriteButtonNoCardClick: Story = {
  args: { asset: kpi },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    const heartBtn = canvas.getByTitle('Favorite')

    await step('hover card to reveal heart button', async () => {
      await userEvent.hover(canvas.getByText('Revenue Growth KPI'))
    })

    await step('click heart → onFavorite called, onOpen NOT called', async () => {
      await userEvent.click(heartBtn)
      await expect(args.onFavorite).toHaveBeenCalledWith(1)
      await expect(args.onOpen).not.toHaveBeenCalled()
    })
  },
}

export const AllTypes: Story = {
  args: { asset: kpi },
  render: (args) => (
    <div className="grid grid-cols-1 gap-2.5 max-w-sm p-4">
      {[kpi, layout, dataviz, storyboard].map(a => (
        <AssetCard key={a.id} {...args} asset={a} />
      ))}
    </div>
  ),
}
