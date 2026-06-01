import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'
import FieldLabel from './FieldLabel'

const meta = {
  title: 'Atoms/FieldLabel',
  component: FieldLabel,
  tags: ['autodocs'],
} satisfies Meta<typeof FieldLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Business questions' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText('Business questions')
    await expect(label).toBeInTheDocument()
    await expect(label).toHaveClass('uppercase')
    await expect(label).toHaveClass('tracking-widest')
  },
}

export const InContext: Story = {
  args: { children: '' },
  render: () => (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-xl w-64">
      <div>
        <FieldLabel>Tags</FieldLabel>
        <p className="text-sm text-zinc-500">finance, growth, mrr</p>
      </div>
      <div>
        <FieldLabel>Description</FieldLabel>
        <p className="text-sm text-zinc-700">Month-over-month revenue tracker.</p>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Tags')).toBeInTheDocument()
    await expect(canvas.getByText('Description')).toBeInTheDocument()
  },
}
