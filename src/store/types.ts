export type BackgroundType = 'gradient' | 'solid' | 'radial' | 'mesh' | 'pattern' | 'image'

export type PatternType =
  | 'dots'
  | 'lines'
  | 'grid'
  | 'squares'
  | 'hexagons'
  | 'triangles'
  | 'circles'

export type AspectRatio =
  | 'auto'
  | '16:9'
  | '3:2'
  | '4:3'
  | '5:4'
  | '1:1'
  | '4:5'
  | '3:4'
  | '2:3'
  | '9:16'

export interface ExportPayload {
  dataUrl: string
  format: ExportFormat
  resolution: number
}
export interface CanvasAspectRatioOption {
  label: string
  value: AspectRatio
}

export type ExportFormat = 'png' | 'webp' | 'jpeg'

export interface NaturalImageSize {
  naturalWidth: number
  naturalHeight: number
}

export interface ImageMeta extends NaturalImageSize {
  path: string
  dataUrl: string
}

export interface ImageConfig {
  padding: number
  borderRadius: number
  scale: number
  offsetX: number
  offsetY: number
  shadow: ShadowConfig
  aspectRatio: AspectRatio
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

export interface MeshRadialLayerSpec {
  ellipseWidthPercent: number
  ellipseHeightPercent: number
  atXPercent: number
  atYPercent: number
  transparentAtPercent: number
  colorStopIndex: 0 | 1 | 2
}

export interface PatternConfig {
  type: PatternType
  foreground: string
  background: string
  size: number // tile size in pixels (default 16)
}

export interface PatternPreset extends PatternConfig {
  label: string
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
  pendingImage: ImageMeta | null // image that is being pasted
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
