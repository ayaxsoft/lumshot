import { GRADIENT_ANGLES } from '../constants'
import { GradientConfig } from '../store/types'

const buildStops = (stops: GradientConfig['stops']): string =>
  stops.map((stop) => `${stop.color} ${stop.position}%`).join(', ')

export const buildGradientCSS = (gradient: GradientConfig): string => {
  const { type, stops, angle } = gradient
  const gradientAngle = angle ?? GRADIENT_ANGLES.LINEAR
  const stopsCSS = buildStops(stops)

  const gradientMap: Record<GradientConfig['type'], string> = {
    linear: `linear-gradient(${gradientAngle}deg, ${stopsCSS})`,
    radial: `radial-gradient(circle, ${stopsCSS})`,
    mesh: `radial-gradient(circle, ${stopsCSS})`,
  }

  return gradientMap[type]
}
