import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'
import TypeBadge from './TypeBadge'

const meta = {
  title: 'Atoms/TypeBadge',
  component: TypeBadge,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['kpi', 'layout', 'dataviz', 'storyboard'] },
  },
} satisfies Meta<typeof TypeBadge>

export default meta
type Story = StoryObj<typeof meta>

export const KPI: Story = {
  args: { type: 'kpi' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('KPI')).toBeInTheDocument()
  },
}

export const Layout: Story = {
  args: { type: 'layout' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Layout')).toBeInTheDocument()
  },
}

export const DataViz: Story = {
  args: { type: 'dataviz' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Data viz')).toBeInTheDocument()
  },
}

export const Storyboard: Story = {
  args: { type: 'storyboard' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Storyboard')).toBeInTheDocument()
  },
}

export const AllTypes: Story = {
  args: { type: 'kpi' },
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <TypeBadge type="kpi" />
      <TypeBadge type="layout" />
      <TypeBadge type="dataviz" />
      <TypeBadge type="storyboard" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const label of ['KPI', 'Layout', 'Data viz', 'Storyboard']) {
      await expect(canvas.getByText(label)).toBeInTheDocument()
    }
  },
}
