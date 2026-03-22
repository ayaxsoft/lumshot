import { describe, it, expect } from 'vitest'

import { resolveCanvasAspectRatioCss } from '@/utils/resolve-canvas-aspect-ratio-css'

describe('resolveCanvasAspectRatioCss', () => {
  it('should map fixed presets', () => {
    expect(resolveCanvasAspectRatioCss('1:1')).toBe('1 / 1')
    expect(resolveCanvasAspectRatioCss('4:3')).toBe('4 / 3')
    expect(resolveCanvasAspectRatioCss('16:9')).toBe('16 / 9')
    expect(resolveCanvasAspectRatioCss('3:2')).toBe('3 / 2')
    expect(resolveCanvasAspectRatioCss('5:4')).toBe('5 / 4')
    expect(resolveCanvasAspectRatioCss('4:5')).toBe('4 / 5')
    expect(resolveCanvasAspectRatioCss('9:16')).toBe('9 / 16')
  })

  it('should use natural dimensions for auto when valid', () => {
    expect(resolveCanvasAspectRatioCss('auto', { naturalWidth: 800, naturalHeight: 600 })).toBe(
      '800 / 600'
    )
  })

  it('should fall back to configured default aspect for auto without valid natural size', () => {
    expect(resolveCanvasAspectRatioCss('auto')).toBe('16 / 9')
    expect(resolveCanvasAspectRatioCss('auto', { naturalWidth: 0, naturalHeight: 100 })).toBe(
      '16 / 9'
    )
  })
})
