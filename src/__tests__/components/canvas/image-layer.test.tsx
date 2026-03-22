import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ImageLayer } from '../../../components/canvas/image-layer'
import { ImageConfig, ImageMeta } from '../../../store/types'

const testImage = (): ImageMeta => ({
  path: 'test.png',
  dataUrl:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAFUlEQVQIW2NkYGAwBuKzQAwDIDBBGQYQRoGZBpDIQDEuIAYGTqcAAHf',
  naturalWidth: 100,
  naturalHeight: 100,
})

const baseConfig = (overrides: Partial<ImageConfig> = {}): ImageConfig => ({
  padding: 0,
  borderRadius: 0,
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  aspectRatio: 'auto',
  shadow: {
    enabled: false,
    blur: 0,
    offsetX: 0,
    offsetY: 0,
    color: '#000000',
    opacity: 0,
  },
  ...overrides,
})

describe('ImageLayer', () => {
  it('should render wrapper, image src and alt', () => {
    render(<ImageLayer image={testImage()} config={baseConfig()} />)
    expect(screen.getByTestId('image-layer')).toBeInTheDocument()
    const img = screen.getByRole('img', { name: 'test.png' })
    expect(img).toHaveAttribute('src', testImage().dataUrl)
    expect(img.className).toContain('object-contain')
  })

  it('should use object-cover for fixed aspect ratios so the frame has no letterboxing gaps', () => {
    render(<ImageLayer image={testImage()} config={baseConfig({ aspectRatio: '1:1' })} />)
    const img = screen.getByRole('img', { name: 'test.png' })
    expect(img.className).toContain('object-cover')
    expect(img.className).not.toContain('object-contain')
  })

  it('should apply symmetric inset from padding on all sides', () => {
    render(<ImageLayer image={testImage()} config={baseConfig({ padding: 10, scale: 1 })} />)
    const inset = screen.getByTestId('canvas-frame-inset')
    expect(inset).toHaveStyle({
      top: '5%',
      bottom: '5%',
      left: '5%',
      right: '5%',
    })
  })

  it('should scale the frame slot in both dimensions', () => {
    render(<ImageLayer image={testImage()} config={baseConfig({ padding: 0, scale: 0.5 })} />)
    const scaleSlot = screen.getByTestId('canvas-frame-scale-slot')
    expect(scaleSlot).toHaveStyle({
      width: '50%',
      height: '50%',
    })
  })

  it('should apply borderRadius and transform on the image frame', () => {
    render(
      <ImageLayer
        image={testImage()}
        config={baseConfig({
          borderRadius: 12,
          offsetX: 4,
          offsetY: -6,
        })}
      />
    )
    const frame = screen.getByTestId('image-frame')
    expect(frame).toHaveStyle({
      borderRadius: '12px',
      transform: 'translate(4px, -6px)',
    })
  })

  it('should use image natural dimensions when aspect ratio is auto', () => {
    render(<ImageLayer image={testImage()} config={baseConfig()} />)
    expect(screen.getByTestId('image-frame')).toHaveStyle({
      aspectRatio: '100 / 100',
      maxHeight: '100%',
      maxWidth: '100%',
      width: '100%',
    })
  })

  it('should use height-first frame layout for portrait aspect ratio', () => {
    render(<ImageLayer image={testImage()} config={baseConfig({ aspectRatio: '9:16' })} />)
    expect(screen.getByTestId('image-frame')).toHaveStyle({
      aspectRatio: '9 / 16',
      height: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
      width: 'auto',
    })
  })

  it('should omit box shadow when shadow is disabled', () => {
    render(<ImageLayer image={testImage()} config={baseConfig()} />)
    const frame = screen.getByTestId('image-frame')
    expect(frame).toHaveStyle({ boxShadow: '' })
  })

  it('should apply box shadow when shadow is enabled', () => {
    render(
      <ImageLayer
        image={testImage()}
        config={baseConfig({
          shadow: {
            enabled: true,
            blur: 10,
            offsetX: 2,
            offsetY: 4,
            color: '#000000',
            opacity: 50,
          },
        })}
      />
    )
    const frame = screen.getByTestId('image-frame')
    expect(frame).toHaveStyle({ boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.5)' })
  })
})
