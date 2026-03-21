import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as backgroundCss from '../../../utils/build-background-css'
import { BackgroundLayer } from '../../../components/canvas/background-layer'
import { BackgroundConfig } from '../../../store/types'

const stops = [
  { color: '#000000', position: 0 },
  { color: '#ffffff', position: 100 },
]

function cfg(
  partial: Partial<BackgroundConfig> & Pick<BackgroundConfig, 'type'>
): BackgroundConfig {
  const defaults: BackgroundConfig = {
    type: 'solid',
    solid: '#000000',
    gradient: {
      type: 'linear',
      stops: [...stops],
      angle: 135,
    },
    pattern: {
      type: 'dots',
      foreground: '#000000',
      background: '#ffffff',
      size: 16,
    },
    imageDataUrl: null,
  }
  return { ...defaults, ...partial }
}

describe('BackgroundLayer', () => {
  it('should render with solid color', () => {
    const background = cfg({ type: 'solid' })
    render(<BackgroundLayer background={background} />)
    const el = screen.getByTestId('background-layer')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('absolute', 'inset-0')
    expect(el).toHaveStyle({ background: '#000000' })
  })

  it('should render with linear gradient', () => {
    const background = cfg({
      type: 'gradient',
      gradient: { type: 'linear', stops: [...stops], angle: 135 },
    })
    render(<BackgroundLayer background={background} />)
    expect(screen.getByTestId('background-layer')).toHaveStyle({
      background: 'linear-gradient(135deg, #000000 0%, #ffffff 100%)',
    })
  })

  it('should render with radial gradient', () => {
    const background = cfg({
      type: 'radial',
      gradient: { type: 'radial', stops: [...stops] },
    })
    render(<BackgroundLayer background={background} />)
    expect(screen.getByTestId('background-layer')).toHaveStyle({
      background: 'radial-gradient(circle, #000000 0%, #ffffff 100%)',
    })
  })

  it('should render with mesh gradient', () => {
    const background = cfg({
      type: 'mesh',
      gradient: { type: 'mesh', stops: [...stops] },
    })
    render(<BackgroundLayer background={background} />)
    expect(screen.getByTestId('background-layer')).toHaveStyle({
      background: backgroundCss.buildBackgroundCSS(background),
    })
  })

  it('should render with image URL', () => {
    const background = cfg({
      type: 'image',
      imageDataUrl: 'https://example.com/bg.png',
    })
    render(<BackgroundLayer background={background} />)
    expect(screen.getByTestId('background-layer')).toHaveStyle({
      background: 'url(https://example.com/bg.png)',
    })
  })

  it('should render empty background when image type has no URL', () => {
    const background = cfg({ type: 'image', imageDataUrl: null })
    render(<BackgroundLayer background={background} />)
    expect(screen.getByTestId('background-layer')).toHaveStyle({ background: '' })
  })

  it('should render dots pattern', () => {
    const background = cfg({
      type: 'pattern',
      pattern: {
        type: 'dots',
        foreground: '#000000',
        background: '#ffffff',
        size: 16,
      },
    })
    render(<BackgroundLayer background={background} />)
    const el = screen.getByTestId('background-layer')
    const bg = el.style.background
    expect(bg).toContain('radial-gradient(circle, #000000 1px, transparent 1px)')
    expect(bg).toContain('#ffffff')
    expect(bg).toMatch(/16px/)
  })

  it('should render lines pattern', () => {
    const background = cfg({
      type: 'pattern',
      pattern: {
        type: 'lines',
        foreground: '#000000',
        background: '#ffffff',
        size: 12,
      },
    })
    render(<BackgroundLayer background={background} />)
    const bg = screen.getByTestId('background-layer').style.background
    expect(bg).toContain(
      'repeating-linear-gradient(90deg, #000000, #000000 1px, #ffffff 1px, #ffffff 12px)'
    )
  })

  it('should forward grid pattern config to buildBackgroundCSS', () => {
    const background = cfg({
      type: 'pattern',
      pattern: {
        type: 'grid',
        foreground: '#000000',
        background: '#ffffff',
        size: 8,
      },
    })
    const spy = vi.spyOn(backgroundCss, 'buildBackgroundCSS')
    render(<BackgroundLayer background={background} />)
    expect(spy).toHaveBeenCalledWith(background)
    spy.mockRestore()
  })
})
