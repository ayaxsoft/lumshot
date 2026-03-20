import { describe, it, expect } from 'vitest'
import { buildBackgroundCSS } from '../../utils/build-background-css'
import { BackgroundConfig } from '../../store/types'

describe('buildBackgroundCSS', () => {
  it('should return solid color for CSS `background` shorthand', () => {
    const background: BackgroundConfig = {
      type: 'solid',
      solid: '#000000',
      gradient: {
        type: 'linear',
        stops: [
          { color: '#000000', position: 0 },
          { color: '#ffffff', position: 100 },
        ],
        angle: 135,
      },
      pattern: {
        type: 'dots',
        foreground: '#ffffff',
        background: '#000000',
        size: 16,
      },
      imageDataUrl: null,
    }
    const css = buildBackgroundCSS(background)
    expect(css).toBe('#000000')
  })

  it('should return gradient CSS for `background-image`', () => {
    const background: BackgroundConfig = {
      type: 'gradient',
      gradient: {
        type: 'linear',
        stops: [
          { color: '#000000', position: 0 },
          { color: '#ffffff', position: 100 },
        ],
      },
      solid: '#000000',
      pattern: {
        type: 'dots',
        foreground: '#ffffff',
        background: '#000000',
        size: 16,
      },
      imageDataUrl: null,
    }
    const css = buildBackgroundCSS(background)
    expect(css).toBe('linear-gradient(135deg, #000000 0%, #ffffff 100%)')
  })

  it('should return radial gradient CSS for `background-image`', () => {
    const background: BackgroundConfig = {
      type: 'radial',
      gradient: {
        type: 'radial',
        stops: [
          { color: '#000000', position: 0 },
          { color: '#ffffff', position: 100 },
        ],
      },
      solid: '#000000',
      pattern: {
        type: 'dots',
        foreground: '#ffffff',
        background: '#000000',
        size: 16,
      },
      imageDataUrl: null,
    }
    const css = buildBackgroundCSS(background)
    expect(css).toBe('radial-gradient(circle, #000000 0%, #ffffff 100%)')
  })

  it('should return mesh gradient CSS for `background-image`', () => {
    const background: BackgroundConfig = {
      type: 'mesh',
      gradient: {
        type: 'mesh',
        stops: [
          { color: '#000000', position: 0 },
          { color: '#ffffff', position: 100 },
        ],
      },
      solid: '#000000',
      pattern: {
        type: 'dots',
        foreground: '#ffffff',
        background: '#000000',
        size: 16,
      },
      imageDataUrl: null,
    }
    const css = buildBackgroundCSS(background)
    expect(css).toBe('radial-gradient(circle, #000000 0%, #ffffff 100%)')
  })

  it('should return image URL for `background-image`', () => {
    const background: BackgroundConfig = {
      type: 'image',
      imageDataUrl: 'https://example.com/image.png',
      gradient: {
        type: 'linear',
        stops: [
          { color: '#000000', position: 0 },
          { color: '#ffffff', position: 100 },
        ],
      },
      solid: '#000000',
      pattern: {
        type: 'dots',
        foreground: '#ffffff',
        background: '#000000',
        size: 16,
      },
    }
    const css = buildBackgroundCSS(background)
    expect(css).toBe('url(https://example.com/image.png)')
  })

  it('should return empty string when image type has no imageDataUrl', () => {
    const background: BackgroundConfig = {
      type: 'image',
      imageDataUrl: null,
      gradient: {
        type: 'linear',
        stops: [
          { color: '#000000', position: 0 },
          { color: '#ffffff', position: 100 },
        ],
      },
      solid: '#000000',
      pattern: {
        type: 'dots',
        foreground: '#ffffff',
        background: '#000000',
        size: 16,
      },
    }
    expect(buildBackgroundCSS(background)).toBe('')
  })

  it('should return dots pattern as CSS `background` shorthand', () => {
    const background: BackgroundConfig = {
      type: 'pattern',
      pattern: {
        type: 'dots',
        foreground: '#ffffff',
        background: '#000000',
        size: 16,
      },
      gradient: {
        type: 'linear',
        stops: [
          { color: '#000000', position: 0 },
          { color: '#ffffff', position: 100 },
        ],
      },
      solid: '#000000',
      imageDataUrl: null,
    }
    const css = buildBackgroundCSS(background)
    expect(css).toBe(
      '#000000 radial-gradient(circle, #ffffff 1px, transparent 1px) 0 0 / 16px 16px'
    )
  })

  it('should return lines pattern as CSS `background` shorthand', () => {
    const background: BackgroundConfig = {
      type: 'pattern',
      pattern: {
        type: 'lines',
        foreground: '#ffffff',
        background: '#000000',
        size: 16,
      },
      gradient: {
        type: 'linear',
        stops: [
          { color: '#000000', position: 0 },
          { color: '#ffffff', position: 100 },
        ],
      },
      solid: '#000000',
      imageDataUrl: null,
    }
    const css = buildBackgroundCSS(background)
    expect(css).toBe(
      '#000000 repeating-linear-gradient(90deg, #ffffff, #ffffff 1px, #000000 1px, #000000 16px)'
    )
  })

  it('should return grid pattern as CSS `background` shorthand', () => {
    const background: BackgroundConfig = {
      type: 'pattern',
      pattern: {
        type: 'grid',
        foreground: '#ffffff',
        background: '#000000',
        size: 16,
      },
      gradient: {
        type: 'linear',
        stops: [
          { color: '#000000', position: 0 },
          { color: '#ffffff', position: 100 },
        ],
      },
      solid: '#000000',
      imageDataUrl: null,
    }
    const css = buildBackgroundCSS(background)
    expect(css).toBe(
      '#000000 linear-gradient(#ffffff 1px, transparent 1px) 0 0 / 16px 16px, linear-gradient(90deg, #ffffff 1px, transparent 1px) 0 0 / 16px 16px'
    )
  })
})
