import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BackgroundPanel } from '../../../components/panels/background-panel'

describe('BackgroundPanel', () => {
  it('should render the background panel', () => {
    render(<BackgroundPanel />)
    expect(screen.getByTestId('background-panel')).toBeInTheDocument()
  })
})
