import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Section } from '../../../components/ui/section'

describe('Section', () => {
  it('should render the section', () => {
    render(
      <Section title="Test" defaultOpen={true}>
        <div>Test</div>
      </Section>
    )
    expect(screen.getByTestId('section')).toBeInTheDocument()
  })
})
