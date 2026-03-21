import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'

import { Slider } from '@/components/ui/slider'
import { IconAdjustments } from '@tabler/icons-react'

describe('Slider', () => {
  it('should render the slider', () => {
    render(<Slider label="Test" value={0} onChange={() => {}} min={0} max={100} step={1} />)
    expect(screen.getByTestId('slider')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('should render the slider with an icon', () => {
    const { container } = render(
      <Slider
        label="Test"
        value={0}
        onChange={() => {}}
        min={0}
        max={100}
        step={1}
        icon={<IconAdjustments data-testid="slider-leading-icon" stroke={1.5} />}
      />
    )
    expect(screen.getByTestId('slider')).toBeInTheDocument()
    expect(within(container).getByTestId('slider-leading-icon')).toBeInTheDocument()
  })

  it('should not render a leading icon wrapper when icon is omitted', () => {
    const { container } = render(
      <Slider label="Test" value={0} onChange={() => {}} min={0} max={100} step={1} />
    )
    expect(container.querySelectorAll('svg')).toHaveLength(0)
  })

  it('should render the slider with a value', () => {
    render(<Slider label="Test" value={50} onChange={() => {}} min={0} max={100} step={1} />)
    expect(screen.getByTestId('slider')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
  })

  it('should display fractional values used for scale-style sliders', () => {
    render(<Slider label="Scale" value={0.86} onChange={() => {}} min={0.5} max={1} step={0.01} />)
    expect(screen.getByText('0.86')).toBeInTheDocument()
  })

  it('should call onChange when the Radix thumb value changes via keyboard', () => {
    const onChange = vi.fn()
    render(<Slider label="Test" value={0} onChange={onChange} min={0} max={100} step={1} />)
    const thumb = screen.getByRole('slider')
    thumb.focus()
    fireEvent.keyDown(thumb, { key: 'ArrowRight' })
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('should decrement via ArrowLeft when above min', () => {
    const onChange = vi.fn()
    render(<Slider label="Test" value={10} onChange={onChange} min={0} max={100} step={1} />)
    const thumb = screen.getByRole('slider')
    thumb.focus()
    fireEvent.keyDown(thumb, { key: 'ArrowLeft' })
    expect(onChange).toHaveBeenCalledWith(9)
  })

  it('should not call onChange when ArrowRight would exceed max', () => {
    const onChange = vi.fn()
    render(<Slider label="Test" value={100} onChange={onChange} min={0} max={100} step={1} />)
    const thumb = screen.getByRole('slider')
    thumb.focus()
    fireEvent.keyDown(thumb, { key: 'ArrowRight' })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should not call onChange when ArrowLeft would go below min', () => {
    const onChange = vi.fn()
    render(<Slider label="Test" value={0} onChange={onChange} min={0} max={100} step={1} />)
    const thumb = screen.getByRole('slider')
    thumb.focus()
    fireEvent.keyDown(thumb, { key: 'ArrowLeft' })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should expose slider semantics for the thumb', () => {
    render(<Slider label="Test" value={33} onChange={() => {}} min={0} max={100} step={1} />)
    const thumb = screen.getByRole('slider')
    expect(thumb).toHaveAttribute('aria-valuenow', '33')
    expect(thumb).toHaveAttribute('aria-valuemin', '0')
    expect(thumb).toHaveAttribute('aria-valuemax', '100')
  })
})
