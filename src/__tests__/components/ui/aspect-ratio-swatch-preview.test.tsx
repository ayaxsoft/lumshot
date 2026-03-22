import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'

import { AspectRatioSwatchPreview } from '@/components/ui/aspect-ratio-swatch-preview'

describe('AspectRatioSwatchPreview', () => {
  it('should render a circular hint for auto', () => {
    const { container } = render(<AspectRatioSwatchPreview aspectRatio="auto" />)
    const shape = container.querySelector('.rounded-full')
    expect(shape).toBeTruthy()
  })

  it('should render a landscape box for 16:9', () => {
    const { container } = render(<AspectRatioSwatchPreview aspectRatio="16:9" />)
    expect(container.firstElementChild).toHaveStyle({ aspectRatio: '16 / 9' })
  })
})
