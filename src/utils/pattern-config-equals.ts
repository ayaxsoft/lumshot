import { PatternConfig } from '../store/types'

export const patternConfigsEqual = (left: PatternConfig, right: PatternConfig): boolean =>
  left.type === right.type &&
  left.foreground === right.foreground &&
  left.background === right.background &&
  left.size === right.size
