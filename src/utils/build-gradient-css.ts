import { GRADIENT_ANGLES } from '../constants'
import { GradientConfig } from '../store/types'
import { buildMeshGradientCSS } from './build-mesh-gradient-css'

const buildStops = (stops: GradientConfig['stops']): string =>
  stops.map((stop) => `${stop.color} ${stop.position}%`).join(', ')

export const buildGradientCSS = (gradient: GradientConfig): string => {
  const { type, stops, angle } = gradient
  const gradientAngle = angle ?? GRADIENT_ANGLES.LINEAR
  const stopsCSS = buildStops(stops)

  const gradientMap: Record<GradientConfig['type'], string> = {
    linear: `linear-gradient(${gradientAngle}deg, ${stopsCSS})`,
    radial: `radial-gradient(circle, ${stopsCSS})`,
    mesh: buildMeshGradientCSS(gradient),
  }

  return gradientMap[type]
}
