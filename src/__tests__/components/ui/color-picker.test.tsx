import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ColorPicker } from '../../../components/ui/color-picker'

describe('ColorPicker', () => {
  it('should render the color picker', () => {
    render(<ColorPicker value="#000000" onChange={() => {}} />)
    expect(screen.getByTestId('color-picker')).toBeInTheDocument()
  })
})
