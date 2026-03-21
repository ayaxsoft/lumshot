import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TypeSelector } from '@/components/ui/type-selector'

describe('TypeSelector', () => {
  it('should render the type selector', () => {
    render(<TypeSelector options={[]} value="test" onChange={() => {}} />)
    expect(screen.getByTestId('type-selector')).toBeInTheDocument()
  })
})
