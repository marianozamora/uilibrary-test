import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'
import AssetIconBox from './AssetIcon'

const meta = {
  title: 'Atoms/AssetIconBox',
  component: AssetIconBox,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['kpi', 'layout', 'dataviz', 'storyboard'] },
    size: { control: 'radio', options: ['md', 'lg'] },
  },
} satisfies Meta<typeof AssetIconBox>

export default meta
type Story = StoryObj<typeof meta>

export const KpiMd: Story = {
  args: { type: 'kpi', size: 'md' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const box = canvasElement.firstElementChild
    await expect(box).toBeInTheDocument()
    await expect(box).toHaveClass('bg-blue-50')
  },
}

export const LayoutLg: Story = {
  args: { type: 'layout', size: 'lg' },
  play: async ({ canvasElement }) => {
    const box = canvasElement.firstElementChild
    await expect(box).toHaveClass('bg-green-50')
    await expect(box).toHaveClass('w-11')
  },
}

export const DatavizMd: Story = {
  args: { type: 'dataviz', size: 'md' },
  play: async ({ canvasElement }) => {
    const box = canvasElement.firstElementChild
    await expect(box).toHaveClass('bg-amber-50')
  },
}

export const StoryboardLg: Story = {
  args: { type: 'storyboard', size: 'lg' },
  play: async ({ canvasElement }) => {
    const box = canvasElement.firstElementChild
    await expect(box).toHaveClass('bg-fuchsia-50')
  },
}

export const AllTypes: Story = {
  args: { type: 'kpi' },
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      {(['kpi', 'layout', 'dataviz', 'storyboard'] as const).map(type => (
        <div key={type} className="flex flex-col items-center gap-2">
          <AssetIconBox type={type} size="lg" />
          <span className="text-xs text-zinc-400">{type}</span>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const type of ['kpi', 'layout', 'dataviz', 'storyboard']) {
      await expect(canvas.getByText(type)).toBeInTheDocument()
    }
  },
}
