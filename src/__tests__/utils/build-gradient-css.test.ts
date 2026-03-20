import { describe, it, expect } from 'vitest'
import { buildGradientCSS } from '../../utils/build-gradient-css'
import { GradientConfig } from '../../store/types'

describe('buildGradientCSS', () => {
  it('should build a linear gradient css', () => {
    const gradient: GradientConfig = {
      type: 'linear',
      stops: [
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 },
      ],
      angle: 135,
    }
    const css = buildGradientCSS(gradient)
    expect(css).toBe('linear-gradient(135deg, #000000 0%, #ffffff 100%)')
  })

  it('should build a radial gradient css', () => {
    const gradient: GradientConfig = {
      type: 'radial',
      stops: [
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 },
      ],
    }
    const css = buildGradientCSS(gradient)
    expect(css).toBe('radial-gradient(circle, #000000 0%, #ffffff 100%)')
  })

  it('should build a mesh gradient css', () => {
    const gradient: GradientConfig = {
      type: 'mesh',
      stops: [
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 },
      ],
    }
    const css = buildGradientCSS(gradient)
    expect(css).toBe('radial-gradient(circle, #000000 0%, #ffffff 100%)')
  })

  it('should build a gradient css with default angle', () => {
    const gradient: GradientConfig = {
      type: 'linear',
      stops: [
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 },
      ],
    }
    const css = buildGradientCSS(gradient)
    expect(css).toBe('linear-gradient(135deg, #000000 0%, #ffffff 100%)')
  })

  it('should build a gradient css with custom angle', () => {
    const gradient: GradientConfig = {
      type: 'linear',
      stops: [
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 },
      ],
      angle: 225,
    }
    const css = buildGradientCSS(gradient)
    expect(css).toBe('linear-gradient(225deg, #000000 0%, #ffffff 100%)')
  })

  it('should build a gradient css with custom stops', () => {
    const gradient: GradientConfig = {
      type: 'linear',
      stops: [
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 },
      ],
    }
    const css = buildGradientCSS(gradient)
    expect(css).toBe('linear-gradient(135deg, #000000 0%, #ffffff 100%)')
  })

  it('should build a gradient css with custom stops and custom angle', () => {
    const gradient: GradientConfig = {
      type: 'linear',
      stops: [
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 },
      ],
      angle: 225,
    }
    const css = buildGradientCSS(gradient)
    expect(css).toBe('linear-gradient(225deg, #000000 0%, #ffffff 100%)')
  })
})
