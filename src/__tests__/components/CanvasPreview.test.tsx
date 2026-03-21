import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CanvasPreview from '../../components/canvas/CanvasPreview'
import type { BackgroundConfig, ImageMeta, ShadowConfig } from '../../store/types'

const { editorSlice } = vi.hoisted(() => {
  const background: BackgroundConfig = {
    type: 'solid',
    solid: '#111111',
    gradient: {
      type: 'linear',
      stops: [
        { color: '#000000', position: 0 },
        { color: '#ffffff', position: 100 },
      ],
      angle: 135,
    },
    pattern: {
      type: 'dots',
      foreground: '#000000',
      background: '#ffffff',
      size: 16,
    },
    imageDataUrl: null,
  }

  const shadow: ShadowConfig = {
    enabled: false,
    blur: 0,
    offsetX: 0,
    offsetY: 0,
    color: '#000000',
    opacity: 0,
  }

  const editorSlice = {
    image: null as ImageMeta | null,
    background,
    shadow,
    padding: 10,
    borderRadius: 12,
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  }

  return { editorSlice }
})

vi.mock('../../store/useEditorStore', () => ({
  useEditorStore: (selector: (s: typeof editorSlice) => unknown) => selector(editorSlice),
}))

const sampleImage: ImageMeta = {
  path: 'a.png',
  dataUrl: 'data:image/png;base64,AA',
  naturalWidth: 100,
  naturalHeight: 100,
}

describe('CanvasPreview', () => {
  beforeEach(() => {
    editorSlice.image = null
  })

  it('should render DropZone when there is no image', () => {
    render(<CanvasPreview />)
    expect(screen.getByTestId('canvas-preview')).toBeInTheDocument()
    expect(screen.getByTestId('dropzone')).toBeInTheDocument()
  })

  it('should render canvas, background and image layers when image is set', () => {
    editorSlice.image = sampleImage
    render(<CanvasPreview />)
    expect(screen.getByTestId('canvas-preview')).toBeInTheDocument()
    expect(screen.getByTestId('background-layer')).toBeInTheDocument()
    expect(screen.getByTestId('image-layer')).toBeInTheDocument()
  })
})
