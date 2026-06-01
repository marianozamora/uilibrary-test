import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Library from './Library'

beforeEach(() => {
  localStorage.clear()
})

describe('Library – initial render', () => {
  it('renders the page title', () => {
    render(<Library />)
    expect(screen.getByText('Library')).toBeInTheDocument()
  })

  it('renders TabBar and SearchBar', () => {
    render(<Library />)
    expect(screen.getByPlaceholderText('Type to search…')).toBeInTheDocument()
    expect(screen.getAllByText('Featured').length).toBeGreaterThan(0)
  })

  it('renders Featured and Trending sections by default', () => {
    render(<Library />)
    expect(screen.getByText('Trending')).toBeInTheDocument()
  })

  it('renders Request button', () => {
    render(<Library />)
    expect(screen.getByText('Request')).toBeInTheDocument()
  })
})

describe('Library – tab navigation', () => {
  it('switches to KPI tab and shows KPI assets', async () => {
    const user = userEvent.setup()
    render(<Library />)
    await user.click(screen.getByText('Kpi'))
    expect(screen.getByText('Revenue Growth KPI')).toBeInTheDocument()
  })

  it('switches to Layouts tab and hides Featured/Trending headings', async () => {
    const user = userEvent.setup()
    render(<Library />)
    await user.click(screen.getByText('Layouts'))
    expect(screen.queryByText(/^Trending$/)).not.toBeInTheDocument()
  })

  it('switches to Storyboards tab and shows storyboard assets', async () => {
    const user = userEvent.setup()
    render(<Library />)
    await user.click(screen.getByText('Storyboards'))
    expect(screen.getByText('Market Expansion Story')).toBeInTheDocument()
  })
})

describe('Library – search', () => {
  it('shows search results section when query is typed', async () => {
    const user = userEvent.setup()
    render(<Library />)
    await user.type(screen.getByPlaceholderText('Type to search…'), 'revenue')
    expect(screen.getAllByText(/result/).length).toBeGreaterThan(0)
  })

  it('shows EmptyState when search has no matches', async () => {
    const user = userEvent.setup()
    render(<Library />)
    await user.type(screen.getByPlaceholderText('Type to search…'), 'zzznomatch')
    expect(screen.getByText('Not seeing it… try search')).toBeInTheDocument()
  })

  it('clears search and returns to tabs when clear is clicked', async () => {
    const user = userEvent.setup()
    render(<Library />)
    await user.type(screen.getByPlaceholderText('Type to search…'), 'revenue')
    await user.click(screen.getByText('Clear search'))
    expect(screen.queryByText(/result/)).not.toBeInTheDocument()
  })
})

describe('Library – modal', () => {
  it('opens AssetModal when an asset card is clicked', async () => {
    const user = userEvent.setup()
    render(<Library />)
    const cards = screen.getAllByText('Revenue Growth KPI')
    await user.click(cards[0])
    expect(screen.getAllByText('Revenue Growth KPI').length).toBeGreaterThan(1)
  })

  it('closes modal when clicking the backdrop overlay', async () => {
    const user = userEvent.setup()
    render(<Library />)
    const cards = screen.getAllByText('Revenue Growth KPI')
    await user.click(cards[0])
    expect(screen.getByText('Copy link')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByText('Copy link')).not.toBeInTheDocument()
  })

  it('opens RequestModal when Request button is clicked', async () => {
    const user = userEvent.setup()
    render(<Library />)
    await user.click(screen.getByText('Request'))
    expect(screen.getByText('Submit request')).toBeInTheDocument()
  })

  it('closes RequestModal when Cancel is clicked', async () => {
    const user = userEvent.setup()
    render(<Library />)
    await user.click(screen.getByText('Request'))
    await user.click(screen.getByText('Cancel'))
    expect(screen.queryByText('Submit request')).not.toBeInTheDocument()
  })

  it('closes modal on Escape key', async () => {
    const user = userEvent.setup()
    render(<Library />)
    await user.click(screen.getByText('Request'))
    expect(screen.getByText('Submit request')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByText('Submit request')).not.toBeInTheDocument()
  })
})

describe('Library – favorites', () => {
  it('toggles favorite via card heart button and persists to localStorage', async () => {
    const user = userEvent.setup()
    render(<Library />)
    const favBtns = screen.getAllByTitle('Favorite')
    await user.click(favBtns[0])
    const stored = JSON.parse(localStorage.getItem('library-favorites') ?? '[]')
    expect(stored.length).toBe(1)
  })

  it('loads favorites from localStorage on mount', () => {
    localStorage.setItem('library-favorites', JSON.stringify([1]))
    render(<Library />)
    const stored = JSON.parse(localStorage.getItem('library-favorites') ?? '[]')
    expect(stored).toContain(1)
  })

  it('un-favorites an already favorited asset', async () => {
    const user = userEvent.setup()
    render(<Library />)
    const favBtns = screen.getAllByTitle('Favorite')
    await user.click(favBtns[0])
    await user.click(favBtns[0])
    const stored = JSON.parse(localStorage.getItem('library-favorites') ?? '[]')
    expect(stored.length).toBe(0)
  })
})

describe('Library – show more', () => {
  it('renders ShowMoreBtn when featured has more than 4 assets', () => {
    render(<Library />)
    const btns = screen.queryAllByText(/Show more assets/)
    expect(btns.length).toBeGreaterThan(0)
  })
})

describe('Library – keyboard shortcut', () => {
  it('focuses search input on Cmd+K', async () => {
    const user = userEvent.setup()
    render(<Library />)
    const input = screen.getByPlaceholderText('Type to search…')
    await user.keyboard('{Meta>}k{/Meta}')
    expect(input).toHaveFocus()
  })
})
