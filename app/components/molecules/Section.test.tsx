import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Section from './Section'

describe('Section', () => {
  it('renders children', () => {
    render(<Section><div>child</div></Section>)
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Section title="Featured"><div /></Section>)
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('renders subtitle when provided alongside title', () => {
    render(<Section title="Featured" sub="Top picks"><div /></Section>)
    expect(screen.getByText('Top picks')).toBeInTheDocument()
  })

  it('does not render title markup when title is omitted', () => {
    render(<Section><div>content</div></Section>)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('does not render subtitle when sub is omitted', () => {
    render(<Section title="Featured"><div /></Section>)
    expect(screen.queryByText('Top picks')).not.toBeInTheDocument()
  })
})
