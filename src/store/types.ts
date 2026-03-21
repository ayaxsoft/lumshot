export type BackgroundType = 'gradient' | 'solid' | 'radial' | 'mesh' | 'pattern' | 'image'

export type PatternType = 'dots' | 'lines' | 'grid'

export type AspectRatio = '1:1' | '4:3' | '16:9' | '9:16' | 'auto'

export type ExportFormat = 'png' | 'webp' | 'jpeg'

// Image loaded
export interface ImageMeta {
  path: string
  dataUrl: string
  naturalWidth: number
  naturalHeight: number
}

export interface ImageConfig {
  padding: number
  borderRadius: number
  scale: number
  offsetX: number
  offsetY: number
  shadow: ShadowConfig
}

export interface GradientStop {
  color: string
  position: number // 0-100
}

export interface GradientConfig {
  type: 'linear' | 'mesh' | 'radial'
  stops: GradientStop[]
  angle?: number // 0-360 only for linear
}

export interface PatternConfig {
  type: PatternType
  foreground: string
  background: string
  size: number // tile size in pixels (default 16)
}

export interface BackgroundConfig {
  type: BackgroundType
  gradient: GradientConfig
  solid: string // hex color
  pattern: PatternConfig
  imageDataUrl: string | null
}

export interface ShadowConfig {
  enabled: boolean
  blur: number // 0-60
  offsetX: number // -30-30
  offsetY: number // -30-30
  color: string // hex color
  opacity: number // 0-100
}

export interface TextConfig {
  enabled: boolean
  text: string
  fontSize: number // 1-100
  fontWeight: number // 100-900
  fontFamily: string
  textAlign: 'left' | 'center' | 'right'
}

export interface EditorState {
  image: ImageMeta | null
  background: BackgroundConfig
  padding: number // 0-50 (%)
  borderRadius: number // 0-40 (%)
  scale: number // 0.5-1.0
  offsetX: number // -100-100
  offsetY: number // -100-100
  shadow: ShadowConfig
  aspectRatio: AspectRatio
  exportFormat: ExportFormat
  exportResolution: 1 | 2 | 3
}
