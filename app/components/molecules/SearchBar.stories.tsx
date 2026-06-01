import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect, fn } from '@storybook/test'
import { useState } from 'react'
import SearchBar from './SearchBar'

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
    recentSearches: ['Revenue', 'Churn Rate', 'Q3 Dashboard'],
  },
  decorators: [
    (Story) => <div className="p-6"><Story /></div>,
  ],
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: { query: '' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Type to search…')
    await expect(input).toBeInTheDocument()
    await expect(input).toHaveValue('')
    await expect(canvas.queryByText('Clear search')).not.toBeInTheDocument()
  },
}

export const WithQuery: Story = {
  args: { query: 'revenue' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('Clear search')).toBeInTheDocument()
  },
}

export const NoRecents: Story = {
  args: { query: '', recentSearches: [] },
}

// Stateful wrapper so interactions actually update the input value
function StatefulSearchBar(args: React.ComponentProps<typeof SearchBar>) {
  const [query, setQuery] = useState('')
  return (
    <SearchBar
      {...args}
      query={query}
      onChange={(q) => { setQuery(q); args.onChange?.(q) }}
    />
  )
}

export const TypingAndClear: Story = {
  render: (args) => <StatefulSearchBar {...args} />,
  args: { query: '', onChange: fn() },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Type to search…')

    await step('type a query → onChange called per keystroke', async () => {
      await userEvent.type(input, 'rev')
      await expect(args.onChange).toHaveBeenCalledTimes(3)
      await expect(args.onChange).toHaveBeenLastCalledWith('rev')
    })

    await step('clear button appears when query is non-empty', async () => {
      await expect(canvas.getByText('Clear search')).toBeInTheDocument()
    })

    await step('click clear → onChange called with empty string', async () => {
      await userEvent.click(canvas.getByText('Clear search'))
      await expect(args.onChange).toHaveBeenLastCalledWith('')
    })

    await step('clear button disappears after clearing', async () => {
      await expect(canvas.queryByText('Clear search')).not.toBeInTheDocument()
    })
  },
}

export const RecentSearchesDropdown: Story = {
  render: (args) => <StatefulSearchBar {...args} />,
  args: { query: '', onChange: fn(), recentSearches: ['Revenue', 'Churn Rate', 'Q3 Dashboard'] },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Type to search…')

    await step('focus empty input → recent searches visible', async () => {
      await userEvent.click(input)
      await expect(canvas.getByText('Recent searches')).toBeInTheDocument()
      await expect(canvas.getByText('Revenue')).toBeInTheDocument()
    })

    await step('click recent search → populates input', async () => {
      await userEvent.click(canvas.getByText('Revenue'))
      await expect(input).toHaveValue('Revenue')
      await expect(canvas.queryByText('Recent searches')).not.toBeInTheDocument()
    })
  },
}
