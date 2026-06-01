import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ShowMoreBtn from './ShowMoreBtn'

describe('ShowMoreBtn', () => {
  it('renders count in label', () => {
    render(<ShowMoreBtn count={3} onClick={vi.fn()} />)
    expect(screen.getByText('Show more assets (3 more)')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<ShowMoreBtn count={5} onClick={onClick} />)
    await user.click(screen.getByText('Show more assets (5 more)'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
