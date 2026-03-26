import { describe, it, expect, beforeEach } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'

import { ImagePanel } from '@/components/panels/image-panel'
import { useEditorStore } from '@/store/useEditorStore'

describe('ImagePanel', () => {
  beforeEach(() => {
    useEditorStore.getState().reset()
  })

  it('should render the image panel', () => {
    render(<ImagePanel />)
    expect(screen.getByTestId('image-panel')).toBeInTheDocument()
    expect(screen.getByTestId('padding-slider')).toBeInTheDocument()
    expect(screen.getByTestId('border-radius-slider')).toBeInTheDocument()
    expect(screen.getByTestId('scale-slider')).toBeInTheDocument()
    expect(screen.getByTestId('offset-x-slider')).toBeInTheDocument()
    expect(screen.getByTestId('offset-y-slider')).toBeInTheDocument()
    expect(screen.getByTestId('shadow-controls')).toBeInTheDocument()
  })

  it('should reflect initial store values in slider readouts', () => {
    render(<ImagePanel />)
    expect(within(screen.getByTestId('padding-slider')).getByText('10')).toBeInTheDocument()
    expect(within(screen.getByTestId('border-radius-slider')).getByText('12')).toBeInTheDocument()
    expect(within(screen.getByTestId('scale-slider')).getByText('100%')).toBeInTheDocument()
    expect(within(screen.getByTestId('offset-x-slider')).getByText('0')).toBeInTheDocument()
    expect(within(screen.getByTestId('offset-y-slider')).getByText('0')).toBeInTheDocument()
  })

  it('should update padding in the store when the padding slider changes', () => {
    render(<ImagePanel />)
    const thumb = within(screen.getByTestId('padding-slider')).getByRole('slider')
    thumb.focus()
    fireEvent.keyDown(thumb, { key: 'ArrowRight' })
    expect(useEditorStore.getState().padding).toBe(11)
  })

  it('should update border radius in the store when the border radius slider changes', () => {
    render(<ImagePanel />)
    const thumb = within(screen.getByTestId('border-radius-slider')).getByRole('slider')
    thumb.focus()
    fireEvent.keyDown(thumb, { key: 'ArrowRight' })
    expect(useEditorStore.getState().borderRadius).toBe(13)
  })

  it('should update scale in the store when the scale slider changes', () => {
    render(<ImagePanel />)
    const thumb = within(screen.getByTestId('scale-slider')).getByRole('slider')
    thumb.focus()
    fireEvent.keyDown(thumb, { key: 'ArrowLeft' })
    expect(useEditorStore.getState().scale).toBeCloseTo(0.99, 5)
  })

  it('should update offset X without changing offset Y', () => {
    useEditorStore.getState().setOffset(0, 7)
    render(<ImagePanel />)
    const thumb = within(screen.getByTestId('offset-x-slider')).getByRole('slider')
    thumb.focus()
    fireEvent.keyDown(thumb, { key: 'ArrowRight' })
    expect(useEditorStore.getState().offsetX).toBe(1)
    expect(useEditorStore.getState().offsetY).toBe(7)
  })

  it('should update offset Y without changing offset X', () => {
    useEditorStore.getState().setOffset(4, 0)
    render(<ImagePanel />)
    const thumb = within(screen.getByTestId('offset-y-slider')).getByRole('slider')
    thumb.focus()
    fireEvent.keyDown(thumb, { key: 'ArrowRight' })
    expect(useEditorStore.getState().offsetX).toBe(4)
    expect(useEditorStore.getState().offsetY).toBe(1)
  })
})
