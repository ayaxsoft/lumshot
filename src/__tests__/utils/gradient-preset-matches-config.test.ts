import { describe, it, expect } from 'vitest'
import { gradientConfigsEqual } from '../../utils/gradient-config-equals'
import { gradientPresetMatchesConfig } from '../../utils/gradient-preset-matches-config'
import { GradientConfig } from '../../store/types'

const linearStops: GradientConfig['stops'] = [
  { color: '#000000', position: 0 },
  { color: '#ffffff', position: 100 },
]

describe('gradientPresetMatchesConfig', () => {
  it('returns true when radial config shares stops and angle with a linear preset', () => {
    const preset: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 135 }
    const config: GradientConfig = { type: 'radial', stops: [...linearStops], angle: 135 }
    expect(gradientPresetMatchesConfig(config, preset)).toBe(true)
    expect(gradientConfigsEqual(config, preset)).toBe(false)
  })

  it('returns false when radial config differs in stops from the linear preset', () => {
    const preset: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 135 }
    const config: GradientConfig = {
      type: 'radial',
      stops: [
        { color: '#ff0000', position: 0 },
        { color: '#ffffff', position: 100 },
      ],
      angle: 135,
    }
    expect(gradientPresetMatchesConfig(config, preset)).toBe(false)
  })

  it('matches mesh config to preset by stops and angle', () => {
    const preset: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 90 }
    const config: GradientConfig = { type: 'mesh', stops: [...linearStops], angle: 90 }
    expect(gradientPresetMatchesConfig(config, preset)).toBe(true)
  })
})
