import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect, fn } from '@storybook/test'
import TabBar from './TabBar'

const meta = {
  title: 'Molecules/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  args: { onChange: fn() },
  decorators: [
    (Story) => <div className="p-6"><Story /></div>,
  ],
} satisfies Meta<typeof TabBar>

export default meta
type Story = StoryObj<typeof meta>

export const Featured: Story = {
  args: { active: 'featured' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByText('Featured')
    await expect(btn).toHaveClass('bg-zinc-900')
    await expect(btn).toHaveClass('text-white')
  },
}

export const KPI: Story = { args: { active: 'kpi' } }
export const Layouts: Story = { args: { active: 'layouts' } }
export const Storyboards: Story = { args: { active: 'storyboards' } }

export const TabClickInteraction: Story = {
  args: { active: 'featured' },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)

    await step('click KPI tab → onChange called with "kpi"', async () => {
      await userEvent.click(canvas.getByText('Kpi'))
      await expect(args.onChange).toHaveBeenCalledWith('kpi')
    })

    await step('click Layouts tab → onChange called with "layouts"', async () => {
      await userEvent.click(canvas.getByText('Layouts'))
      await expect(args.onChange).toHaveBeenCalledWith('layouts')
    })

    await step('click Storyboards tab → onChange called with "storyboards"', async () => {
      await userEvent.click(canvas.getByText('Storyboards'))
      await expect(args.onChange).toHaveBeenCalledWith('storyboards')
    })

    await step('click Featured tab → onChange called with "featured"', async () => {
      await userEvent.click(canvas.getByText('Featured'))
      await expect(args.onChange).toHaveBeenCalledWith('featured')
    })
  },
}
