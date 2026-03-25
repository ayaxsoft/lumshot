import { ImageConfig, ImageMeta } from '../../store/types'
import { buildCanvasFrameBoxStyle } from '../../utils/build-canvas-frame-box-style'
import { buildImageFrameStyle } from '../../utils/build-image-frame-style'
import { CanvasFrameSlot } from './canvas-frame-slot'

interface ImageLayerProps {
  image: ImageMeta
  config: ImageConfig
}

export const ImageLayer = ({ image, config }: ImageLayerProps) => {
  const frameStyle = {
    ...buildCanvasFrameBoxStyle(config.aspectRatio, image),
    ...buildImageFrameStyle(config.borderRadius, config.offsetX, config.offsetY, config.shadow),
  }

  const imageObjectFitClass = config.aspectRatio === 'auto' ? 'object-contain' : 'object-cover'

  return (
    <div data-testid="image-layer" className="absolute inset-0">
      <CanvasFrameSlot
        padding={config.padding}
        scale={config.scale}
        frameStyle={frameStyle}
        frameTestId="image-frame"
      >
        <img
          src={image.dataUrl}
          alt={image.path}
          className={`block h-full w-full ${imageObjectFitClass} object-center`}
        />
      </CanvasFrameSlot>
    </div>
  )
}
