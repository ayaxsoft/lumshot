import { describe, it, expect } from 'vitest'
import { hexToRGBA } from '../../utils/hex-to-rgba'

describe('hexToRGBA', () => {
  it('should convert #000000 with opacity 1', () => {
    expect(hexToRGBA('#000000', 1)).toBe('rgba(0, 0, 0, 0.01)')
  })

  it('should convert #ffffff with fractional opacity', () => {
    expect(hexToRGBA('#ffffff', 0.5)).toBe('rgba(255, 255, 255, 0.005)')
  })

  it('should convert #ffffff with opacity 1', () => {
    expect(hexToRGBA('#ffffff', 1)).toBe('rgba(255, 255, 255, 0.01)')
  })

  it('should parse arbitrary 6-digit hex (#RRGGBB)', () => {
    expect(hexToRGBA('#336699', 0.25)).toBe('rgba(51, 102, 153, 0.0025)')
  })

  it('should pass through opacity 0', () => {
    expect(hexToRGBA('#ff0000', 0)).toBe('rgba(255, 0, 0, 0)')
  })
})
