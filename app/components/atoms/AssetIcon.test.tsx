import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import AssetIconBox from './AssetIcon'
import type { AssetType } from '@data/assets'

const TYPES: AssetType[] = ['kpi', 'layout', 'dataviz', 'storyboard']

describe('AssetIconBox', () => {
  for (const type of TYPES) {
    it(`renders without crashing for type "${type}"`, () => {
      const { container } = render(<AssetIconBox type={type} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  }

  it('md size applies w-12 class', () => {
    const { container } = render(<AssetIconBox type="kpi" size="md" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('w-12')
  })

  it('lg size applies w-11 class', () => {
    const { container } = render(<AssetIconBox type="kpi" size="lg" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('w-11')
  })

  it('defaults to md size when size prop is omitted', () => {
    const { container } = render(<AssetIconBox type="layout" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('w-12')
  })

  it('applies type-specific icon style class', () => {
    const { container } = render(<AssetIconBox type="kpi" />)
    const el = container.firstChild as HTMLElement
    expect(el.className).toContain('bg-blue-50')
  })
})
