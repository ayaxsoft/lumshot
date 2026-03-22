import { describe, it, expect } from 'vitest'

import { resolveCanvasAspectRatioNumber } from '@/utils/resolve-canvas-aspect-ratio-number'

describe('resolveCanvasAspectRatioNumber', () => {
  it('should map fixed presets to width-over-height', () => {
    expect(resolveCanvasAspectRatioNumber('1:1')).toBe(1)
    expect(resolveCanvasAspectRatioNumber('4:3')).toBeCloseTo(4 / 3)
    expect(resolveCanvasAspectRatioNumber('16:9')).toBeCloseTo(16 / 9)
    expect(resolveCanvasAspectRatioNumber('9:16')).toBeCloseTo(9 / 16)
  })

  it('should use natural ratio for auto when valid', () => {
    expect(resolveCanvasAspectRatioNumber('auto', { naturalWidth: 800, naturalHeight: 600 })).toBe(
      800 / 600
    )
  })

  it('should fall back to default aspect number for auto without valid natural size', () => {
    expect(resolveCanvasAspectRatioNumber('auto')).toBeCloseTo(16 / 9)
    expect(
      resolveCanvasAspectRatioNumber('auto', { naturalWidth: 0, naturalHeight: 100 })
    ).toBeCloseTo(16 / 9)
  })
})
