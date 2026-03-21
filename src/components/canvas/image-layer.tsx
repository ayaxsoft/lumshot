import { ImageConfig, ImageMeta } from '../../store/types'
import { buildShadowCSS } from '../../utils/build-shadow-css'

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
          className="w-full block"
          style={{
            borderRadius: `${config.borderRadius}px`,
            boxShadow: buildShadowCSS(config.shadow),
            transform: `translate(${config.offsetX}px, ${config.offsetY}px)`,
          }}
        />
      </div>
    </div>
  )
}
