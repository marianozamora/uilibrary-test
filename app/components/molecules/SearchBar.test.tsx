import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('renders the input with placeholder', () => {
    render(<SearchBar query="" onChange={vi.fn()} />)
    expect(screen.getByPlaceholderText('Type to search…')).toBeInTheDocument()
  })

  it('shows the current query value in the input', () => {
    render(<SearchBar query="revenue" onChange={vi.fn()} />)
    expect(screen.getByPlaceholderText('Type to search…')).toHaveValue('revenue')
  })

  it('does not show Clear button when query is empty', () => {
    render(<SearchBar query="" onChange={vi.fn()} />)
    expect(screen.queryByText('Clear search')).not.toBeInTheDocument()
  })

  it('shows Clear button when query is non-empty', () => {
    render(<SearchBar query="rev" onChange={vi.fn()} />)
    expect(screen.getByText('Clear search')).toBeInTheDocument()
  })

  it('calls onChange with empty string on Clear click', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<SearchBar query="rev" onChange={onChange} />)
    await user.click(screen.getByText('Clear search'))
    expect(onChange).toHaveBeenCalledWith('')
  })

  it('calls onChange on each typed character', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<SearchBar query="" onChange={onChange} />)
    await user.type(screen.getByPlaceholderText('Type to search…'), 'abc')
    expect(onChange).toHaveBeenCalledTimes(3)
  })

  it('shows recent searches dropdown on focus when query is empty', async () => {
    const user = userEvent.setup()
    render(<SearchBar query="" onChange={vi.fn()} recentSearches={['Revenue', 'Churn']} />)
    await user.click(screen.getByPlaceholderText('Type to search…'))
    expect(screen.getByText('Recent searches')).toBeInTheDocument()
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('Churn')).toBeInTheDocument()
  })

  it('does not show recent searches when query is non-empty on mount', () => {
    render(<SearchBar query="x" onChange={vi.fn()} recentSearches={['Revenue']} />)
    expect(screen.queryByText('Recent searches')).not.toBeInTheDocument()
  })

  it('does not show dropdown when recentSearches is empty', async () => {
    const user = userEvent.setup()
    render(<SearchBar query="" onChange={vi.fn()} recentSearches={[]} />)
    await user.click(screen.getByPlaceholderText('Type to search…'))
    expect(screen.queryByText('Recent searches')).not.toBeInTheDocument()
  })

  it('clicking a recent search calls onChange with that term', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<SearchBar query="" onChange={onChange} recentSearches={['Revenue']} />)
    await user.click(screen.getByPlaceholderText('Type to search…'))
    await user.click(screen.getByText('Revenue'))
    expect(onChange).toHaveBeenCalledWith('Revenue')
  })

  it('hides dropdown after clicking a recent search', async () => {
    const user = userEvent.setup()
    render(<SearchBar query="" onChange={vi.fn()} recentSearches={['Revenue']} />)
    await user.click(screen.getByPlaceholderText('Type to search…'))
    await user.click(screen.getByText('Revenue'))
    expect(screen.queryByText('Recent searches')).not.toBeInTheDocument()
  })

  it('hides dropdown on outside click', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <SearchBar query="" onChange={vi.fn()} recentSearches={['Revenue']} />
        <div data-testid="outside">outside</div>
      </div>
    )
    await user.click(screen.getByPlaceholderText('Type to search…'))
    expect(screen.getByText('Recent searches')).toBeInTheDocument()
    await user.click(screen.getByTestId('outside'))
    expect(screen.queryByText('Recent searches')).not.toBeInTheDocument()
  })
})
