import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FieldLabel from './FieldLabel'

describe('FieldLabel', () => {
  it('renders children text', () => {
    render(<FieldLabel>Tags</FieldLabel>)
    expect(screen.getByText('Tags')).toBeInTheDocument()
  })

  it('renders as a p element', () => {
    const { container } = render(<FieldLabel>Description</FieldLabel>)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('has uppercase and tracking classes', () => {
    const { container } = render(<FieldLabel>Test</FieldLabel>)
    const el = container.querySelector('p')!
    expect(el.className).toContain('uppercase')
    expect(el.className).toContain('tracking-widest')
  })
})
