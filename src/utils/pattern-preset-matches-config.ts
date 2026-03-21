import { PatternConfig } from '../store/types'
import { patternConfigsEqual } from './pattern-config-equals'

export const patternPresetMatchesConfig = (config: PatternConfig, preset: PatternConfig): boolean =>
  patternConfigsEqual(config, preset)
