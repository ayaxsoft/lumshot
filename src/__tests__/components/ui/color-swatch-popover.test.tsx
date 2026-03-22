import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import { COLOR_SWATCH_POPOVER_CONTENT_WIDTH_PX } from '@/constants'
import { ColorSwatchPopover } from '@/components/ui/color-swatch-popover'

describe('ColorSwatchPopover', () => {
  it('should render the swatch trigger with aria-label and color', () => {
    render(<ColorSwatchPopover value="#ff0000" onChange={() => {}} ariaLabel="Pick shadow color" />)
    const trigger = screen.getByTestId('color-swatch-popover-trigger')
    expect(trigger).toHaveAttribute('aria-label', 'Pick shadow color')
    expect(['#ff0000', 'rgb(255, 0, 0)']).toContain(trigger.style.backgroundColor)
  })

  it('should mount HexColorPicker in the popover when the trigger is clicked', () => {
    render(<ColorSwatchPopover value="#000000" onChange={vi.fn()} ariaLabel="Color" />)
    expect(document.querySelector('.react-colorful')).toBeNull()
    fireEvent.click(screen.getByTestId('color-swatch-popover-trigger'))
    expect(document.querySelector('.react-colorful')).not.toBeNull()
  })

  it('should set popover content width from constants', () => {
    render(<ColorSwatchPopover value="#000000" onChange={vi.fn()} ariaLabel="Color" />)
    fireEvent.click(screen.getByTestId('color-swatch-popover-trigger'))
    const content = document.querySelector('[data-radix-popper-content-wrapper]')
    expect(content).not.toBeNull()
    const inner = content?.firstElementChild as HTMLElement | null
    expect(inner).not.toBeNull()
    expect(inner?.style.width).toBe(`${COLOR_SWATCH_POPOVER_CONTENT_WIDTH_PX}px`)
  })
})
