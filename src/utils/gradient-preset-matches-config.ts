import { GradientConfig } from '../store/types'
import { gradientConfigsEqual } from './gradient-config-equals'
import { gradientStopsAndAngleEqual } from './gradient-stops-and-angle-equal'

export const gradientPresetMatchesConfig = (
  config: GradientConfig,
  preset: GradientConfig
): boolean => {
  return gradientConfigsEqual(config, preset) || gradientStopsAndAngleEqual(config, preset)
}
