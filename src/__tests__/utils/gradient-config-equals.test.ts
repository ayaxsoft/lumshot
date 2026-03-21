import { describe, it, expect } from 'vitest'
import { GRADIENT_ANGLES } from '../../constants'
import { gradientConfigsEqual } from '../../utils/gradient-config-equals'
import { GradientConfig } from '../../store/types'

const linearStops: GradientConfig['stops'] = [
  { color: '#000000', position: 0 },
  { color: '#ffffff', position: 100 },
]

describe('gradientConfigsEqual', () => {
  it('returns true when linear configs match including angle and stops', () => {
    const left: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 135 }
    const right: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 135 }
    expect(gradientConfigsEqual(left, right)).toBe(true)
  })

  it('returns false when linear angle differs', () => {
    const left: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 135 }
    const right: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 225 }
    expect(gradientConfigsEqual(left, right)).toBe(false)
  })

  it('returns true when both omit angle (defaults to GRADIENT_ANGLES.LINEAR)', () => {
    const left: GradientConfig = { type: 'linear', stops: [...linearStops] }
    const right: GradientConfig = { type: 'linear', stops: [...linearStops] }
    expect(gradientConfigsEqual(left, right)).toBe(true)
  })

  it('returns true when one omits angle and the other sets the default explicitly', () => {
    const left: GradientConfig = { type: 'linear', stops: [...linearStops] }
    const right: GradientConfig = {
      type: 'linear',
      stops: [...linearStops],
      angle: GRADIENT_ANGLES.LINEAR,
    }
    expect(gradientConfigsEqual(left, right)).toBe(true)
  })

  it('returns false when gradient types differ', () => {
    const linear: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 135 }
    const radial: GradientConfig = { type: 'radial', stops: [...linearStops] }
    expect(gradientConfigsEqual(linear, radial)).toBe(false)
  })

  it('returns false when radial vs mesh even with identical stops', () => {
    const radial: GradientConfig = { type: 'radial', stops: [...linearStops] }
    const mesh: GradientConfig = { type: 'mesh', stops: [...linearStops] }
    expect(gradientConfigsEqual(radial, mesh)).toBe(false)
  })

  it('returns true for radial when type, stops, and effective angle match', () => {
    const left: GradientConfig = { type: 'radial', stops: [...linearStops], angle: 90 }
    const right: GradientConfig = { type: 'radial', stops: [...linearStops], angle: 90 }
    expect(gradientConfigsEqual(left, right)).toBe(true)
  })

  it('returns true for mesh when configs match', () => {
    const left: GradientConfig = { type: 'mesh', stops: [...linearStops] }
    const right: GradientConfig = { type: 'mesh', stops: [...linearStops] }
    expect(gradientConfigsEqual(left, right)).toBe(true)
  })

  it('returns false when stop lists differ in length', () => {
    const left: GradientConfig = {
      type: 'linear',
      stops: [...linearStops],
      angle: 135,
    }
    const right: GradientConfig = {
      type: 'linear',
      stops: [...linearStops, { color: '#ff0000', position: 50 }],
      angle: 135,
    }
    expect(gradientConfigsEqual(left, right)).toBe(false)
  })

  it('returns false when a stop color differs at the same index', () => {
    const left: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 135 }
    const right: GradientConfig = {
      type: 'linear',
      stops: [
        { color: '#111111', position: 0 },
        { color: '#ffffff', position: 100 },
      ],
      angle: 135,
    }
    expect(gradientConfigsEqual(left, right)).toBe(false)
  })

  it('returns false when a stop position differs', () => {
    const left: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 135 }
    const right: GradientConfig = {
      type: 'linear',
      stops: [
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 99 },
      ],
      angle: 135,
    }
    expect(gradientConfigsEqual(left, right)).toBe(false)
  })

  it('returns false when stops are reordered (order is significant)', () => {
    const left: GradientConfig = {
      type: 'linear',
      stops: [
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 },
      ],
      angle: 135,
    }
    const right: GradientConfig = {
      type: 'linear',
      stops: [
        { color: '#ffffff', position: 100 },
        { color: '#000000', position: 0 },
      ],
      angle: 135,
    }
    expect(gradientConfigsEqual(left, right)).toBe(false)
  })

  it('returns true for two empty stop lists of the same type', () => {
    const left: GradientConfig = { type: 'linear', stops: [], angle: 0 }
    const right: GradientConfig = { type: 'linear', stops: [], angle: 0 }
    expect(gradientConfigsEqual(left, right)).toBe(true)
  })

  it('returns false when one stop list is empty and the other is not', () => {
    const left: GradientConfig = { type: 'linear', stops: [], angle: 135 }
    const right: GradientConfig = { type: 'linear', stops: [...linearStops], angle: 135 }
    expect(gradientConfigsEqual(left, right)).toBe(false)
  })
})
