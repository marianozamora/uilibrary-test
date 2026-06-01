import '@testing-library/jest-dom'
import { vi } from 'vitest'

Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: vi.fn().mockResolvedValue(undefined) },
  configurable: true,
})
