import type { CSSProperties } from 'react'

import type { AspectRatio, NaturalImageSize } from '../store/types'

import { resolveCanvasAspectRatioCss } from './resolve-canvas-aspect-ratio-css'
import { resolveCanvasAspectRatioNumber } from './resolve-canvas-aspect-ratio-number'

export const buildCanvasFrameBoxStyle = (
  aspectRatio: AspectRatio,
  naturalSize?: NaturalImageSize
): Pick<CSSProperties, 'aspectRatio' | 'width' | 'height' | 'maxWidth' | 'maxHeight'> => {
  const aspectRatioCss = resolveCanvasAspectRatioCss(aspectRatio, naturalSize)
  const ratioWidthOverHeight = resolveCanvasAspectRatioNumber(aspectRatio, naturalSize)

  if (ratioWidthOverHeight >= 1) {
    return {
      aspectRatio: aspectRatioCss,
      width: '100%',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    }
  }

  return {
    aspectRatio: aspectRatioCss,
    height: '100%',
    width: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  }
}
