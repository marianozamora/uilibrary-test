import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TypeBadge from './TypeBadge'
import type { AssetType } from '@data/assets'

const CASES: { type: AssetType; label: string }[] = [
  { type: 'kpi',        label: 'KPI' },
  { type: 'layout',     label: 'Layout' },
  { type: 'dataviz',    label: 'Data viz' },
  { type: 'storyboard', label: 'Storyboard' },
]

describe('TypeBadge', () => {
  for (const { type, label } of CASES) {
    it(`renders label "${label}" for type "${type}"`, () => {
      render(<TypeBadge type={type} />)
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  }

  it('renders a dot span inside the badge', () => {
    const { container } = render(<TypeBadge type="kpi" />)
    const spans = container.querySelectorAll('span span')
    expect(spans.length).toBeGreaterThan(0)
  })
})
