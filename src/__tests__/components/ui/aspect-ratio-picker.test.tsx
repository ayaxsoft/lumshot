import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { AspectRatioPicker } from '@/components/ui/aspect-ratio-picker'

describe('AspectRatioPicker', () => {
  it('should render the picker and Auto', () => {
    render(<AspectRatioPicker value="auto" onChange={() => {}} />)
    expect(screen.getByTestId('aspect-ratio-picker')).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /Auto/i })).toBeInTheDocument()
  })

  it('should mark the selected preset', () => {
    render(<AspectRatioPicker value="1:1" onChange={() => {}} />)
    expect(screen.getByRole('radio', { name: /1:1/i })).toHaveAttribute('aria-checked', 'true')
  })
})
