import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  KpiIcon,
  LayoutIcon,
  DatavizIcon,
  StoryboardIcon,
  SearchIcon,
  HeartIcon,
  CloseIcon,
  CopyIcon,
  PlusIcon,
  InfoIcon,
  AssetIcon,
} from './icons'
import type { AssetType } from '@data/assets'

describe('simple icons', () => {
  const icons = [KpiIcon, LayoutIcon, DatavizIcon, StoryboardIcon, SearchIcon, CloseIcon, CopyIcon, PlusIcon, InfoIcon]
  for (const Icon of icons) {
    it(`${Icon.name} renders an svg`, () => {
      const { container } = render(<Icon />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  }
})

describe('HeartIcon', () => {
  it('renders unfilled by default (fill=none)', () => {
    const { container } = render(<HeartIcon />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('fill')).toBe('none')
  })

  it('renders filled when filled=true', () => {
    const { container } = render(<HeartIcon filled />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('fill')).toBe('currentColor')
  })
})

describe('AssetIcon', () => {
  const TYPES: AssetType[] = ['kpi', 'layout', 'dataviz', 'storyboard']
  for (const type of TYPES) {
    it(`renders svg for type "${type}"`, () => {
      const { container } = render(<AssetIcon type={type} />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  }
})
