import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  it('renders "Nothing here yet" when no query', () => {
    render(<EmptyState />)
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument()
    expect(screen.getByText('No assets in this category.')).toBeInTheDocument()
  })

  it('renders search-specific message when query is provided', () => {
    render(<EmptyState query="xyz" />)
    expect(screen.getByText('Not seeing it… try search')).toBeInTheDocument()
    expect(screen.getByText(/No assets matched "xyz"/)).toBeInTheDocument()
  })

  it('includes the query term in the no-results message', () => {
    render(<EmptyState query="revenue" />)
    expect(screen.getByText(/revenue/)).toBeInTheDocument()
  })
})
