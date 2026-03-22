import { PatternConfig } from '../store/types'

const svgPatternUrl = (svgMarkup: string): string =>
  `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}")`

const EQUILATERAL_TRIANGLE_HEIGHT_RATIO = Math.sqrt(3) / 2

export const buildPatternCSS = (config: PatternConfig): string => {
  const { type, foreground, background, size } = config
  const patternSize = `${size}px`
  const patternUnit = Math.max(8, size)

  switch (type) {
    case 'dots':
      return `${background} radial-gradient(circle, ${foreground} 1px, transparent 1px) 0 0 / ${patternSize} ${patternSize}`
    case 'lines':
      return `${background} repeating-linear-gradient(90deg, ${foreground}, ${foreground} 1px, ${background} 1px, ${background} ${patternUnit}px)`
    case 'grid':
      return `${background} linear-gradient(to bottom, ${foreground} 0, ${foreground} 1px, ${background} 1px) 0 0 / ${patternSize} ${patternSize}, linear-gradient(to right, ${foreground} 0, ${foreground} 1px, ${background} 1px) 0 0 / ${patternSize} ${patternSize}`
    case 'squares':
      return `${background} repeating-conic-gradient(from 0deg, ${foreground} 0% 25%, ${background} 0% 50%) 0 0 / ${patternSize} ${patternSize}`
    case 'circles':
      return `${background} radial-gradient(circle at 50% 50%, transparent 28%, ${foreground} 29%, ${foreground} 42%, transparent 43%) 0 0 / ${patternSize} ${patternSize}`
    case 'hexagons': {
      const hexagonHeight = Math.round(patternUnit * 1.75)
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${patternUnit}' height='${hexagonHeight}' viewBox='0 0 28 49'><rect width='28' height='49' fill='${background}'/><g fill='${foreground}'><path d='M14 0L28 8.5v14L14 31 0 22.5V8.5z'/><path d='M14 17L28 25.5v14L14 48 0 39.5V25.5z'/></g></svg>`
      return `${background} ${svgPatternUrl(svg)} 0 0 / ${patternUnit}px ${hexagonHeight}px`
    }
    case 'triangles': {
      const triangleBase = patternUnit * 2
      const triangleHeight = Math.round(triangleBase * EQUILATERAL_TRIANGLE_HEIGHT_RATIO)
      const triangleHalfBase = triangleBase / 2
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${triangleBase}' height='${triangleHeight}' viewBox='0 0 ${triangleBase} ${triangleHeight}'><rect width='${triangleBase}' height='${triangleHeight}' fill='${background}'/><polygon fill='${foreground}' points='${triangleHalfBase},0 ${triangleBase},${triangleHeight} 0,${triangleHeight}'/></svg>`
      return `${background} ${svgPatternUrl(svg)} 0 0 / ${triangleBase}px ${triangleHeight}px`
    }
    default:
      return background
  }
}
