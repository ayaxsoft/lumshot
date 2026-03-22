import { CANVAS_AUTO_FALLBACK_ASPECT_HEIGHT, CANVAS_AUTO_FALLBACK_ASPECT_WIDTH } from '../constants'
import type { AspectRatio, NaturalImageSize } from '../store/types'

export const resolveCanvasAspectRatioNumber = (
  aspectRatio: AspectRatio,
  naturalSize?: NaturalImageSize
): number => {
  if (aspectRatio === 'auto') {
    if (
      naturalSize !== undefined &&
      naturalSize.naturalWidth > 0 &&
      naturalSize.naturalHeight > 0
    ) {
      return naturalSize.naturalWidth / naturalSize.naturalHeight
    }
    return CANVAS_AUTO_FALLBACK_ASPECT_WIDTH / CANVAS_AUTO_FALLBACK_ASPECT_HEIGHT
  }
  const [widthPart, heightPart] = aspectRatio.split(':').map(Number)
  return widthPart / heightPart
}
