import { describe, it, expect } from 'vitest'

import { buildImageFrameStyle } from '../../utils/build-image-frame-style'
import type { ShadowConfig } from '../../store/types'

const disabledShadow: ShadowConfig = {
  enabled: false,
  blur: 0,
  offsetX: 0,
  offsetY: 0,
  color: '#000000',
  opacity: 0,
}

describe('buildImageFrameStyle', () => {
  it('should set radius, transform and omit shadow when disabled', () => {
    expect(buildImageFrameStyle(16, 3, -4, disabledShadow)).toEqual({
      borderRadius: '16px',
      boxShadow: '',
      transform: 'translate(3px, -4px)',
    })
  })

  it('should include box shadow when enabled', () => {
    const shadow: ShadowConfig = {
      enabled: true,
      blur: 8,
      offsetX: 1,
      offsetY: 2,
      color: '#000000',
      opacity: 50,
    }
    expect(buildImageFrameStyle(0, 0, 0, shadow)).toEqual({
      borderRadius: '0px',
      boxShadow: '1px 2px 8px rgba(0, 0, 0, 0.5)',
      transform: 'translate(0px, 0px)',
    })
  })
})
