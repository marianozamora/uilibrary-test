import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TabBar from './TabBar'

describe('TabBar', () => {
  it('renders all four tabs', () => {
    render(<TabBar active="featured" onChange={vi.fn()} />)
    expect(screen.getByText('Featured')).toBeInTheDocument()
    expect(screen.getByText('Kpi')).toBeInTheDocument()
    expect(screen.getByText('Layouts')).toBeInTheDocument()
    expect(screen.getByText('Storyboards')).toBeInTheDocument()
  })

  it('active tab has bg-zinc-900 class', () => {
    render(<TabBar active="featured" onChange={vi.fn()} />)
    const btn = screen.getByText('Featured')
    expect(btn.className).toContain('bg-zinc-900')
  })

  it('inactive tabs do not have bg-zinc-900 class', () => {
    render(<TabBar active="featured" onChange={vi.fn()} />)
    const btn = screen.getByText('Kpi')
    expect(btn.className).not.toContain('bg-zinc-900')
  })

  it('calls onChange with "kpi" when Kpi tab is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<TabBar active="featured" onChange={onChange} />)
    await user.click(screen.getByText('Kpi'))
    expect(onChange).toHaveBeenCalledWith('kpi')
  })

  it('calls onChange with "layouts" when Layouts tab is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<TabBar active="featured" onChange={onChange} />)
    await user.click(screen.getByText('Layouts'))
    expect(onChange).toHaveBeenCalledWith('layouts')
  })

  it('calls onChange with "storyboards" when Storyboards tab is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<TabBar active="featured" onChange={onChange} />)
    await user.click(screen.getByText('Storyboards'))
    expect(onChange).toHaveBeenCalledWith('storyboards')
  })

  it('calls onChange with "featured" when Featured tab is clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<TabBar active="kpi" onChange={onChange} />)
    await user.click(screen.getByText('Featured'))
    expect(onChange).toHaveBeenCalledWith('featured')
  })
})
