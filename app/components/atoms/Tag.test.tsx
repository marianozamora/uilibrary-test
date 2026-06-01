import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Tag from './Tag'

describe('Tag', () => {
  it('renders label text', () => {
    render(<Tag label="finance" />)
    expect(screen.getByText('finance')).toBeInTheDocument()
  })

  it('soft variant (default) renders bg-zinc-100 class', () => {
    const { container } = render(<Tag label="x" />)
    expect(container.firstChild).toHaveClass('bg-zinc-100')
  })

  it('outline variant renders border class and white bg', () => {
    const { container } = render(<Tag label="x" variant="outline" />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('bg-white')
    expect(el).toHaveClass('border')
  })

  it('soft variant does not have bg-white', () => {
    const { container } = render(<Tag label="x" variant="soft" />)
    expect(container.firstChild).not.toHaveClass('bg-white')
  })
})
