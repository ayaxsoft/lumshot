import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sidebar } from '../../../components/panels/sidebar'

describe('Sidebar', () => {
  it('should render the sidebar', () => {
    render(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
})
