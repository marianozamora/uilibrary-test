import { describe, it, expect } from 'vitest'
import { fontFamilies, assetTypeHex, assetTypeNames } from './tokens'
import { assetIconStyle, assetAccent, assetBadge } from './variants'

const TYPES = ['kpi', 'layout', 'dataviz', 'storyboard'] as const

describe('tokens', () => {
  it('fontFamilies has serif, mono, sans', () => {
    expect(fontFamilies.serif[0]).toBe('Instrument Serif')
    expect(fontFamilies.mono[0]).toBe('JetBrains Mono')
    expect(fontFamilies.sans[0]).toBe('Inter')
  })

  it('assetTypeHex has a hex value for each type', () => {
    for (const t of TYPES) {
      expect(assetTypeHex[t]).toMatch(/^#[0-9A-Fa-f]{6}$/)
    }
  })

  it('assetTypeNames has a label for each type', () => {
    expect(assetTypeNames.kpi).toBe('KPI')
    expect(assetTypeNames.layout).toBe('Layout')
    expect(assetTypeNames.dataviz).toBe('Data viz')
    expect(assetTypeNames.storyboard).toBe('Storyboard')
  })
})

describe('variants', () => {
  it('assetIconStyle has classes for each type', () => {
    for (const t of TYPES) {
      expect(assetIconStyle[t]).toContain('bg-')
      expect(assetIconStyle[t]).toContain('text-')
    }
  })

  it('assetAccent has bg- class for each type', () => {
    for (const t of TYPES) {
      expect(assetAccent[t]).toMatch(/^bg-/)
    }
  })

  it('assetBadge has label, chip, dot for each type', () => {
    for (const t of TYPES) {
      expect(assetBadge[t].label).toBeTruthy()
      expect(assetBadge[t].chip).toContain('bg-')
      expect(assetBadge[t].dot).toContain('bg-')
    }
  })

  it('assetBadge kpi label is KPI', () => {
    expect(assetBadge.kpi.label).toBe('KPI')
  })
})
