import { BackgroundConfig, PatternConfig } from '../store/types'
import { buildGradientCSS } from './build-gradient-css'

function buildPatternCSS(config: PatternConfig): string {
  const { type, foreground, background, size } = config
  const s = `${size}px`

  switch (type) {
    case 'dots':
      return `${background} radial-gradient(circle, ${foreground} 1px, transparent 1px) 0 0 / ${s} ${s}`
    case 'lines':
      return `${background} repeating-linear-gradient(90deg, ${foreground}, ${foreground} 1px, ${background} 1px, ${background} ${s})`
    case 'grid':
      return `${background} linear-gradient(${foreground} 1px, transparent 1px) 0 0 / ${s} ${s}, linear-gradient(90deg, ${foreground} 1px, transparent 1px) 0 0 / ${s} ${s}`
    default:
      return background
  }
}

export const buildBackgroundCSS = (background: BackgroundConfig): string => {
  const { type, solid, pattern, imageDataUrl, gradient } = background

  const backgroundMap: Record<BackgroundConfig['type'], () => string> = {
    solid: () => solid,
    gradient: () => buildGradientCSS(gradient),
    radial: () => buildGradientCSS(gradient),
    mesh: () => buildGradientCSS(gradient),
    image: () => (imageDataUrl ? `url(${imageDataUrl})` : ''),
    pattern: () => buildPatternCSS(pattern),
  }

  return backgroundMap[type]()
}
