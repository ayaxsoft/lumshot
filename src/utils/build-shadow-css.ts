import { ShadowConfig } from '../store/types'
import { hexToRGBA } from './hex-to-rgba'

export const buildShadowCSS = (shadow: ShadowConfig): string => {
  const { enabled, blur, offsetX, offsetY, color, opacity } = shadow

  if (!enabled) return ''

  return `${offsetX}px ${offsetY}px ${blur}px ${hexToRGBA(color, opacity)}`
}
