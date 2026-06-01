import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect, fn, waitFor } from '@storybook/test'
import AssetModal from './AssetModal'
import type { Asset } from '@data/assets'

const kpi: Asset = {
  id: 1, name: 'Revenue Growth KPI', type: 'kpi',
  tags: ['finance', 'growth', 'mrr'], date: '07/12/2024',
  featured: true, trending: false, affiliate: true, afName: 'Acme Corp',
  desc: 'Month-over-month revenue performance tracker across all business units.',
  bq: ['Is revenue growth on track vs targets?', 'What drove the delta vs last month?', 'Which segment is underperforming?'],
  metricIds: ['net_revenue', 'mom_growth_pct', 'ytd_total'],
  calc: 'SUM(Revenue) / LAG(SUM(Revenue), 1) - 1', visuals: true,
}

const kpiNoAffiliate: Asset = { ...kpi, id: 11, affiliate: false, afName: undefined }

const layout: Asset = {
  id: 5, name: 'Q3 Executive Dashboard', type: 'layout',
  tags: ['q3', 'exec', 'quarterly'], date: '07/23/2024',
  featured: true, trending: false, affiliate: false,
  desc: 'Full executive summary layout for quarterly business review.',
  pages: 6, kpisUsed: ['Net Revenue', 'NPS', 'Churn Rate', 'Pipeline'],
}

const dataviz: Asset = {
  id: 7, name: 'Revenue Waterfall', type: 'dataviz',
  tags: ['finance', 'waterfall', 'revenue'], date: '07/08/2024',
  featured: true, trending: true, affiliate: true, afName: 'Acme Corp',
  desc: 'Visual breakdown of revenue by segment, showing additions and losses.',
  chartType: 'Waterfall chart', kpisFavs: ['Net Revenue', 'MoM Growth %'],
}

const storyboard: Asset = {
  id: 9, name: 'Market Expansion Story', type: 'storyboard',
  tags: ['strategy', 'growth', 'expansion'], date: '07/20/2024',
  featured: true, trending: false, affiliate: true, afName: 'GlobalBrand',
  desc: 'Strategic narrative for new market entry with supporting data points.',
  kpis: ['TAM', 'Market Share %', 'Unit Economics'], affiliates: ['GlobalBrand', 'Acme Corp'],
}

const meta = {
  title: 'Organisms/AssetModal',
  component: AssetModal,
  tags: ['autodocs'],
  args: {
    onClose: fn(),
    onFavorite: fn(),
    onRequest: fn(),
    isFavorite: false,
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen bg-black/40 p-5">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AssetModal>

export default meta
type Story = StoryObj<typeof meta>

export const KPI: Story        = { args: { asset: kpi } }
export const Layout: Story     = { args: { asset: layout } }
export const DataViz: Story    = { args: { asset: dataviz } }
export const Storyboard: Story = { args: { asset: storyboard } }
export const Favorited: Story  = { args: { asset: kpi, isFavorite: true } }

// ─── Integration tests ───────────────────────────────────────────────────────

export const CloseButton: Story = {
  args: { asset: kpi },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)

    await step('modal header is visible', async () => {
      await expect(canvas.getByText('Revenue Growth KPI')).toBeInTheDocument()
    })

    await step('click close → onClose called', async () => {
      const closeBtn = canvasElement.querySelector('button[class*="rounded-full"]') as HTMLElement
      await userEvent.click(closeBtn)
      await expect(args.onClose).toHaveBeenCalledTimes(1)
    })
  },
}

export const FavoriteToggle: Story = {
  args: { asset: kpiNoAffiliate, isFavorite: false },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)

    await step('favorite button shows "Favorite item"', async () => {
      await expect(canvas.getByText('Favorite item')).toBeInTheDocument()
    })

    await step('click favorite → onFavorite called with asset id', async () => {
      await userEvent.click(canvas.getByText('Favorite item'))
      await expect(args.onFavorite).toHaveBeenCalledWith(kpiNoAffiliate.id)
    })
  },
}

export const FavoritedState: Story = {
  args: { asset: kpiNoAffiliate, isFavorite: true },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('favorited state shows "Favorited" label', async () => {
      await expect(canvas.getByText('Favorited')).toBeInTheDocument()
    })

    await step('favorite button has fuchsia styling when active', async () => {
      const btn = canvas.getByText('Favorited').closest('button')!
      await expect(btn).toHaveClass('bg-fuchsia-50')
      await expect(btn).toHaveClass('text-fuchsia-700')
    })
  },
}

export const CopyLink: Story = {
  args: { asset: kpiNoAffiliate },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('copy button starts as "Copy link"', async () => {
      await expect(canvas.getByText('Copy link')).toBeInTheDocument()
    })

    await step('click copy → button changes to "Copied!"', async () => {
      await userEvent.click(canvas.getByText('Copy link'))
      await expect(canvas.getByText('Copied!')).toBeInTheDocument()
    })

    await step('"Copied!" resets back to "Copy link" after 1.8s', async () => {
      await waitFor(
        () => expect(canvas.getByText('Copy link')).toBeInTheDocument(),
        { timeout: 2500 }
      )
    })
  },
}

export const AccessBannerRequestButton: Story = {
  args: { asset: kpi },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)

    await step('affiliate access banner is visible for KPI with affiliate', async () => {
      await expect(canvas.getByText('Acme Corp')).toBeInTheDocument()
      await expect(canvas.getByText('Access required to view affiliate data')).toBeInTheDocument()
    })

    await step('click "Request access" → onRequest called', async () => {
      await userEvent.click(canvas.getByText('Request access'))
      await expect(args.onRequest).toHaveBeenCalledTimes(1)
    })
  },
}

export const KPIFieldsRendered: Story = {
  args: { asset: kpi },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('tags are displayed', async () => {
      await expect(canvas.getByText('finance')).toBeInTheDocument()
      await expect(canvas.getByText('growth')).toBeInTheDocument()
    })

    await step('business questions are shown', async () => {
      await expect(canvas.getByText('Is revenue growth on track vs targets?')).toBeInTheDocument()
    })

    await step('metric IDs are shown as outline tags', async () => {
      await expect(canvas.getByText('net_revenue')).toBeInTheDocument()
    })

    await step('calculation formula is displayed', async () => {
      await expect(canvas.getByText('SUM(Revenue) / LAG(SUM(Revenue), 1) - 1')).toBeInTheDocument()
    })
  },
}

export const LayoutFieldsRendered: Story = {
  args: { asset: layout },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('page count is visible', async () => {
      await expect(canvas.getByText('6')).toBeInTheDocument()
      await expect(canvas.getByText('Amount of pages')).toBeInTheDocument()
    })

    await step('KPIs being used are listed', async () => {
      await expect(canvas.getByText('Net Revenue')).toBeInTheDocument()
      await expect(canvas.getByText('NPS')).toBeInTheDocument()
    })
  },
}
