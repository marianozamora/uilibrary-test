import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from '@storybook/test'
import {
  KpiIcon, LayoutIcon, DatavizIcon, StoryboardIcon,
  SearchIcon, HeartIcon, CloseIcon, CopyIcon, PlusIcon, InfoIcon,
} from './icons'

const meta = {
  title: 'Atoms/Icons',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj

const ICONS = [
  { label: 'KpiIcon',            node: <KpiIcon /> },
  { label: 'LayoutIcon',         node: <LayoutIcon /> },
  { label: 'DatavizIcon',        node: <DatavizIcon /> },
  { label: 'StoryboardIcon',     node: <StoryboardIcon /> },
  { label: 'SearchIcon',         node: <SearchIcon /> },
  { label: 'HeartIcon',          node: <HeartIcon /> },
  { label: 'HeartIcon (filled)', node: <HeartIcon filled /> },
  { label: 'CloseIcon',          node: <CloseIcon /> },
  { label: 'CopyIcon',           node: <CopyIcon /> },
  { label: 'PlusIcon',           node: <PlusIcon /> },
  { label: 'InfoIcon',           node: <InfoIcon /> },
]

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-6">
      {ICONS.map(({ label, node }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
            {node}
          </div>
          <span className="text-[11px] text-zinc-400">{label}</span>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const { label } of ICONS) {
      await expect(canvas.getByText(label)).toBeInTheDocument()
    }
    const svgs = canvasElement.querySelectorAll('svg')
    await expect(svgs.length).toBe(ICONS.length)
  },
}
