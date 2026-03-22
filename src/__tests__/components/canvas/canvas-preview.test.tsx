import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import CanvasPreview from '@/components/canvas/canvas-preview'
import { CANVAS_EXPORT_SURFACE_TEST_ID } from '@/constants'
import type { AspectRatio, BackgroundConfig, ImageMeta, ShadowConfig } from '@/store/types'

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
    aspectRatio: 'auto' as AspectRatio,
  }

  return { editorSlice }
})

vi.mock('@/store/useEditorStore', () => ({
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
    expect(screen.getByTestId(CANVAS_EXPORT_SURFACE_TEST_ID)).toBeInTheDocument()
    expect(screen.getByTestId('dropzone')).toBeInTheDocument()
  })

  it('should apply image layout controls to the dropzone frame when there is no image', () => {
    editorSlice.padding = 20
    editorSlice.scale = 1
    editorSlice.borderRadius = 18
    editorSlice.offsetX = 6
    editorSlice.offsetY = -2
    render(<CanvasPreview />)
    const frame = screen.getByTestId('dropzone-frame')
    expect(frame).toHaveStyle({
      aspectRatio: '16 / 9',
      borderRadius: '18px',
      maxHeight: '100%',
      maxWidth: '100%',
      transform: 'translate(6px, -2px)',
      width: '100%',
    })
    expect(screen.getByTestId('canvas-frame-inset')).toHaveStyle({
      top: '10%',
      bottom: '10%',
      left: '10%',
      right: '10%',
    })
    expect(screen.getByTestId('canvas-frame-scale-slot')).toHaveStyle({
      width: '100%',
      height: '100%',
    })
  })

  it('should apply aspect ratio from store to the dropzone frame', () => {
    editorSlice.aspectRatio = '1:1'
    render(<CanvasPreview />)
    expect(screen.getByTestId('dropzone-frame')).toHaveStyle({
      aspectRatio: '1 / 1',
      maxHeight: '100%',
      maxWidth: '100%',
      width: '100%',
    })
  })

  it('should render canvas, background and image layers when image is set', () => {
    editorSlice.image = sampleImage
    render(<CanvasPreview />)
    expect(screen.getByTestId('canvas-preview')).toBeInTheDocument()
    expect(screen.getByTestId(CANVAS_EXPORT_SURFACE_TEST_ID)).toBeInTheDocument()
    expect(screen.getByTestId('background-layer')).toBeInTheDocument()
    expect(screen.getByTestId('image-layer')).toBeInTheDocument()
  })
})
