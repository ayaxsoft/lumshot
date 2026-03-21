import { BackgroundConfig } from '../store/types'
import { buildGradientCSS } from './build-gradient-css'
import { buildPatternCSS } from './build-pattern-css'

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
