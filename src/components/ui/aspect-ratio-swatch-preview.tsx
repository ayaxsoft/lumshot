import {
  ASPECT_RATIO_SWATCH_AUTO_PREVIEW_MAX_PERCENT,
  ASPECT_RATIO_SWATCH_AUTO_PREVIEW_MAX_REM,
} from '@/constants'
import type { AspectRatio } from '@/store/types'
import { buildCanvasFrameBoxStyle } from '@/utils/build-canvas-frame-box-style'

interface AspectRatioSwatchPreviewProps {
  aspectRatio: AspectRatio
  compact?: boolean
}

export const AspectRatioSwatchPreview = ({
  aspectRatio,
  compact = false,
}: AspectRatioSwatchPreviewProps) => {
  if (compact && aspectRatio === 'auto') {
    return <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-white/[0.38]" />
  }

  if (compact) {
    return (
      <span aria-hidden className="flex h-4 w-[1.875rem] shrink-0 items-center justify-center">
        <span
          className="block max-h-full max-w-full rounded-sm bg-white/[0.38]"
          style={buildCanvasFrameBoxStyle(aspectRatio)}
        />
      </span>
    )
  }

  if (aspectRatio === 'auto') {
    return (
      <span
        aria-hidden
        className="aspect-square shrink-0 rounded-full bg-white/[0.28]"
        style={{
          width: `min(${ASPECT_RATIO_SWATCH_AUTO_PREVIEW_MAX_PERCENT}%, ${ASPECT_RATIO_SWATCH_AUTO_PREVIEW_MAX_REM}rem)`,
        }}
      />
    )
  }

  return (
    <span
      aria-hidden
      className="block max-h-full max-w-full rounded-md bg-white/[0.28]"
      style={buildCanvasFrameBoxStyle(aspectRatio)}
    />
  )
}
