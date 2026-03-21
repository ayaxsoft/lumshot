import { describe, it, expect } from 'vitest'
import { cn } from '../../utils/cn'

describe('cn', () => {
  it('returns a single class string unchanged', () => {
    expect(cn('rounded-md')).toBe('rounded-md')
  })

  it('joins multiple class strings with spaces', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center')
  })

  it('returns empty string when no inputs', () => {
    expect(cn()).toBe('')
  })

  it('omits null and undefined from clsx', () => {
    expect(cn('a', undefined, 'b', null)).toBe('a b')
  })

  it('supports object syntax from clsx', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active')
  })

  it('appends a class when a boolean guard is true', () => {
    const isActive = true
    expect(cn('tab', isActive && 'tab--active')).toBe('tab tab--active')
  })

  it('omits a class when a boolean guard is false', () => {
    const isActive = false
    expect(cn('tab', isActive && 'tab--active')).toBe('tab')
  })

  it('merges conflicting Tailwind utilities via tailwind-merge (last wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-sm', 'text-base')).toBe('text-base')
  })

  it('merges when later classes override earlier in one cn call', () => {
    expect(cn('p-2 p-4', 'p-6')).toBe('p-6')
  })
})
