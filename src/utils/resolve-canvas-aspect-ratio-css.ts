import {
  CANVAS_AUTO_FALLBACK_ASPECT_HEIGHT,
  CANVAS_AUTO_FALLBACK_ASPECT_WIDTH,
  CANVAS_FIXED_ASPECT_RATIO_CSS,
} from '../constants'
import type { AspectRatio, NaturalImageSize } from '../store/types'

export const resolveCanvasAspectRatioCss = (
  aspectRatio: AspectRatio,
  naturalSize?: NaturalImageSize
): string => {
  if (aspectRatio === 'auto') {
    if (
      naturalSize !== undefined &&
      naturalSize.naturalWidth > 0 &&
      naturalSize.naturalHeight > 0
    ) {
      return `${naturalSize.naturalWidth} / ${naturalSize.naturalHeight}`
    }
    return `${CANVAS_AUTO_FALLBACK_ASPECT_WIDTH} / ${CANVAS_AUTO_FALLBACK_ASPECT_HEIGHT}`
  }
  return CANVAS_FIXED_ASPECT_RATIO_CSS[aspectRatio]
}
