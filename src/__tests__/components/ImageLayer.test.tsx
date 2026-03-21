import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ImageLayer } from '../../components/canvas/ImageLayer'
import { ImageConfig, ImageMeta } from '../../store/types'

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
  })

  it('should set inner wrapper width from padding and scale', () => {
    const { container } = render(
      <ImageLayer image={testImage()} config={baseConfig({ padding: 10, scale: 1 })} />
    )
    const wrapper = container.querySelector('[data-testid="image-layer"] > div')
    expect(wrapper).toBeTruthy()
    expect(wrapper).toHaveStyle({ width: '90%' })
  })

  it('should combine padding and scale in width percentage', () => {
    const { container } = render(
      <ImageLayer image={testImage()} config={baseConfig({ padding: 0, scale: 0.5 })} />
    )
    const wrapper = container.querySelector('[data-testid="image-layer"] > div')
    expect(wrapper).toHaveStyle({ width: '50%' })
  })

  it('should apply borderRadius and transform on the img', () => {
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
    const img = screen.getByRole('img', { name: 'test.png' })
    expect(img).toHaveStyle({
      borderRadius: '12px',
      transform: 'translate(4px, -6px)',
    })
  })

  it('should omit box shadow when shadow is disabled', () => {
    render(<ImageLayer image={testImage()} config={baseConfig()} />)
    const img = screen.getByRole('img', { name: 'test.png' })
    expect(img).toHaveStyle({ boxShadow: '' })
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
    const img = screen.getByRole('img', { name: 'test.png' })
    expect(img).toHaveStyle({ boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.5)' })
  })
})
