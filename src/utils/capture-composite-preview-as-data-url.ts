import { toPng } from 'html-to-image'

import { CANVAS_EXPORT_SURFACE_TEST_ID } from '@/constants'

interface CaptureCompositePreviewAsDataUrlParams {
  exportResolution: number
}

export const captureCompositePreviewAsDataUrl = async ({
  exportResolution,
}: CaptureCompositePreviewAsDataUrlParams): Promise<string> => {
  const node = document.querySelector<HTMLElement>(
    `[data-testid="${CANVAS_EXPORT_SURFACE_TEST_ID}"]`
  )
  if (node === null) {
    throw new Error('Could not find the preview to export.')
  }

  return toPng(node, {
    pixelRatio: exportResolution,
    cacheBust: true,
    skipFonts: true,
  })
}
