import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ShadowControls } from '@/components/ui/shadow-controls'
import { ShadowConfig } from '@/store/types'

const shadowFixture: ShadowConfig = {
  enabled: false,
  blur: 0,
  offsetX: 0,
  offsetY: 0,
  color: '#000000',
  opacity: 0,
}

describe('ShadowControls', () => {
  it('should render the shadow controls', () => {
    render(<ShadowControls shadow={shadowFixture} onChange={vi.fn()} />)
    expect(screen.getByTestId('shadow-controls')).toBeInTheDocument()
  })

  it('should render the color swatch when shadow is enabled', () => {
    render(<ShadowControls shadow={{ ...shadowFixture, enabled: true }} onChange={vi.fn()} />)
    expect(screen.getByTestId('color-swatch-popover-trigger')).toBeInTheDocument()
  })
})
