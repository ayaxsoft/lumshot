import { ImageConfig, ImageMeta } from '../../store/types'
import { buildImageFrameStyle } from '../../utils/build-image-frame-style'

interface ImageLayerProps {
  image: ImageMeta
  config: ImageConfig
}

export const ImageLayer = ({ image, config }: ImageLayerProps) => {
  return (
    <div data-testid="image-layer" className="absolute inset-0 flex items-center justify-center">
      <div
        style={{
          width: `${(1 - config.padding / 100) * config.scale * 100}%`,
        }}
      >
        <img
          src={image.dataUrl}
          alt={image.path}
          className="block w-full"
          style={buildImageFrameStyle(
            config.borderRadius,
            config.offsetX,
            config.offsetY,
            config.shadow
          )}
        />
      </div>
    </div>
  )
}
