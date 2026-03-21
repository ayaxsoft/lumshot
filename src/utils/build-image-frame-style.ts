import type { CSSProperties } from 'react'

import { ShadowConfig } from '../store/types'
import { buildShadowCSS } from './build-shadow-css'

export const buildImageFrameStyle = (
  borderRadius: number,
  offsetX: number,
  offsetY: number,
  shadow: ShadowConfig
): Pick<CSSProperties, 'borderRadius' | 'boxShadow' | 'transform'> => ({
  borderRadius: `${borderRadius}px`,
  boxShadow: buildShadowCSS(shadow),
  transform: `translate(${offsetX}px, ${offsetY}px)`,
})
