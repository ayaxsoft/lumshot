import { GradientConfig } from '../store/types'
import { gradientStopsAndAngleEqual } from './gradient-stops-and-angle-equal'

export const gradientConfigsEqual = (left: GradientConfig, right: GradientConfig): boolean => {
  if (left.type !== right.type) {
    return false
  }
  return gradientStopsAndAngleEqual(left, right)
}
