import { describe, it, expect } from 'vitest'
import { buildShadowCSS } from '../../utils/build-shadow-css'
import { ShadowConfig } from '../../store/types'

describe('buildShadowCSS', () => {
  it('returns empty string when shadow is disabled', () => {
    const shadowConfig: ShadowConfig = {
      enabled: false,
      blur: 10,
      offsetX: 10,
      offsetY: 10,
      color: '#000000',
      opacity: 100,
    }
    expect(buildShadowCSS(shadowConfig)).toBe('')
  })

  it('returns box-shadow values with rgba from hex and opacity 0–100', () => {
    const shadowConfig: ShadowConfig = {
      enabled: true,
      blur: 10,
      offsetX: 10,
      offsetY: 10,
      color: '#000000',
      opacity: 100,
    }
    expect(buildShadowCSS(shadowConfig)).toBe('10px 10px 10px rgba(0, 0, 0, 1)')
  })

  it('maps opacity percent to alpha (e.g. 10 → 0.1)', () => {
    const shadowConfig: ShadowConfig = {
      enabled: true,
      blur: 4,
      offsetX: 2,
      offsetY: 3,
      color: '#ff0000',
      opacity: 10,
    }
    expect(buildShadowCSS(shadowConfig)).toBe('2px 3px 4px rgba(255, 0, 0, 0.1)')
  })

  it('allows negative offsets within the editor range', () => {
    const shadowConfig: ShadowConfig = {
      enabled: true,
      blur: 12,
      offsetX: -8,
      offsetY: 5,
      color: '#336699',
      opacity: 50,
    }
    expect(buildShadowCSS(shadowConfig)).toBe('-8px 5px 12px rgba(51, 102, 153, 0.5)')
  })

  it('supports zero blur', () => {
    const shadowConfig: ShadowConfig = {
      enabled: true,
      blur: 0,
      offsetX: 0,
      offsetY: 0,
      color: '#000000',
      opacity: 100,
    }
    expect(buildShadowCSS(shadowConfig)).toBe('0px 0px 0px rgba(0, 0, 0, 1)')
  })

  it('returns visible structure with opacity 0 (fully transparent color)', () => {
    const shadowConfig: ShadowConfig = {
      enabled: true,
      blur: 6,
      offsetX: 1,
      offsetY: -2,
      color: '#00ff00',
      opacity: 0,
    }
    expect(buildShadowCSS(shadowConfig)).toBe('1px -2px 6px rgba(0, 255, 0, 0)')
  })
})
