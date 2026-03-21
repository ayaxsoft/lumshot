import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GradientPresets } from '@/components/ui/gradient-presets'

describe('GradientPresets', () => {
  it('should render the gradient presets', () => {
    render(
      <GradientPresets
        config={{
          type: 'linear',
          stops: [
            { color: '#000000', position: 0 },
            { color: '#ffffff', position: 100 },
          ],
          angle: 135,
        }}
        onChange={() => {}}
      />
    )
    expect(screen.getByTestId('gradient-presets')).toBeInTheDocument()
    expect(screen.getByText('Sunset')).toBeInTheDocument()
  })
})
