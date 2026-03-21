import { GRADIENT_ANGLES } from '../constants'
import { GradientConfig } from '../store/types'

export const gradientStopsAndAngleEqual = (
  left: GradientConfig,
  right: GradientConfig
): boolean => {
  const leftAngle = left.angle ?? GRADIENT_ANGLES.LINEAR
  const rightAngle = right.angle ?? GRADIENT_ANGLES.LINEAR
  if (leftAngle !== rightAngle) {
    return false
  }
  if (left.stops.length !== right.stops.length) {
    return false
  }
  return left.stops.every((stop, index) => {
    const otherStop = right.stops[index]
    return stop.color === otherStop.color && stop.position === otherStop.position
  })
}
