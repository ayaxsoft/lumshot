import { describe, it, expect } from 'vitest'
import { GRADIENT_ANGLES } from '../../constants'
import { gradientStopsAndAngleEqual } from '../../utils/gradient-stops-and-angle-equal'
import { GradientConfig } from '../../store/types'

const linearStops: GradientConfig['stops'] = [
  { color: '#000000', position: 0 },
  { color: '#ffffff', position: 100 },
]

describe('gradientStopsAndAngleEqual', () => {
  it('ignores gradient type and compares stops and angle', () => {
    const linear: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 135 }
    const radial: GradientConfig = { type: 'radial', stops: [...linearStops], angle: 135 }
    expect(gradientStopsAndAngleEqual(linear, radial)).toBe(true)
  })

  it('returns false when angles differ', () => {
    const left: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 135 }
    const right: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 90 }
    expect(gradientStopsAndAngleEqual(left, right)).toBe(false)
  })

  it('uses GRADIENT_ANGLES.LINEAR when angle is omitted on both sides', () => {
    const left: GradientConfig = { type: 'linear', stops: [...linearStops] }
    const right: GradientConfig = { type: 'radial', stops: [...linearStops] }
    expect(gradientStopsAndAngleEqual(left, right)).toBe(true)
  })

  it('treats omitted angle as equal to explicit default', () => {
    const left: GradientConfig = { type: 'linear', stops: [...linearStops] }
    const right: GradientConfig = {
      type: 'radial',
      stops: [...linearStops],
      angle: GRADIENT_ANGLES.LINEAR,
    }
    expect(gradientStopsAndAngleEqual(left, right)).toBe(true)
  })
})
