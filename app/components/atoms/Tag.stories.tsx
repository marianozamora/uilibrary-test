import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'
import Tag from './Tag'

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['soft', 'outline'] },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Soft: Story = {
  args: { label: 'finance', variant: 'soft' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tag = canvas.getByText('finance')
    await expect(tag).toBeInTheDocument()
    await expect(tag).toHaveClass('bg-zinc-100')
  },
}

export const Outline: Story = {
  args: { label: 'net_revenue', variant: 'outline' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tag = canvas.getByText('net_revenue')
    await expect(tag).toBeInTheDocument()
    await expect(tag).toHaveClass('bg-white')
  },
}

export const AllVariants: Story = {
  args: { label: '' },
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      {['finance', 'growth', 'mrr', 'retention'].map(l => <Tag key={l} label={l} variant="soft" />)}
      {['net_revenue', 'mom_growth_pct', 'ytd_total'].map(l => <Tag key={l} label={l} variant="outline" />)}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('finance')).toBeInTheDocument()
    await expect(canvas.getByText('net_revenue')).toBeInTheDocument()
  },
}
