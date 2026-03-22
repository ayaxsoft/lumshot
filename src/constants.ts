import type { AspectRatio, MeshRadialLayerSpec, PatternPreset } from './store/types'

export const BACKGROUND_TYPE_GLYPH_VIEWBOX_PX = 24

export const COLOR_SWATCH_POPOVER_CONTENT_WIDTH_PX = 220

export const MESH_BASE_LINEAR_ANGLE_DEG = 160

export const MESH_FALLBACK_STOP_0_COLOR = '#7C3AED'
export const MESH_FALLBACK_STOP_1_COLOR = '#EC4899'

export const MESH_RADIAL_LAYER_SPECS: readonly MeshRadialLayerSpec[] = [
  {
    ellipseWidthPercent: 95,
    ellipseHeightPercent: 80,
    atXPercent: 8,
    atYPercent: 12,
    transparentAtPercent: 58,
    colorStopIndex: 0,
  },
  {
    ellipseWidthPercent: 85,
    ellipseHeightPercent: 95,
    atXPercent: 95,
    atYPercent: 8,
    transparentAtPercent: 52,
    colorStopIndex: 1,
  },
  {
    ellipseWidthPercent: 110,
    ellipseHeightPercent: 75,
    atXPercent: 88,
    atYPercent: 92,
    transparentAtPercent: 55,
    colorStopIndex: 1,
  },
  {
    ellipseWidthPercent: 75,
    ellipseHeightPercent: 90,
    atXPercent: 5,
    atYPercent: 88,
    transparentAtPercent: 50,
    colorStopIndex: 0,
  },
  {
    ellipseWidthPercent: 100,
    ellipseHeightPercent: 100,
    atXPercent: 48,
    atYPercent: 42,
    transparentAtPercent: 45,
    colorStopIndex: 2,
  },
]

export const GRADIENT_ANGLES = {
  LINEAR: 135,
}

const GRADIENT_PRESET_BASE = [
  {
    label: 'Sunset',
    stops: [
      { color: '#F97316', position: 0 },
      { color: '#EC4899', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Ocean',
    stops: [
      { color: '#06B6D4', position: 0 },
      { color: '#6366F1', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Forest',
    stops: [
      { color: '#10B981', position: 0 },
      { color: '#0EA5E9', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Candy',
    stops: [
      { color: '#F43F5E', position: 0 },
      { color: '#A855F7', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Midnight',
    stops: [
      { color: '#1E1B4B', position: 0 },
      { color: '#312E81', position: 50 },
      { color: '#4F46E5', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Peach',
    stops: [
      { color: '#FDBA74', position: 0 },
      { color: '#FB7185', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Aurora',
    stops: [
      { color: '#34D399', position: 0 },
      { color: '#818CF8', position: 50 },
      { color: '#F472B6', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Dusk',
    stops: [
      { color: '#1E293B', position: 0 },
      { color: '#7C3AED', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Flame',
    stops: [
      { color: '#EF4444', position: 0 },
      { color: '#F97316', position: 50 },
      { color: '#FACC15', position: 100 },
    ],
    angle: 90,
  },
  {
    label: 'Lavender',
    stops: [
      { color: '#C4B5FD', position: 0 },
      { color: '#818CF8', position: 50 },
      { color: '#6366F1', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
]

export const GRADIENT_PRESETS = GRADIENT_PRESET_BASE.map((presetItem) => ({
  ...presetItem,
  type: 'linear' as const,
}))

export const PATTERN_PRESETS: PatternPreset[] = [
  {
    label: 'Dots',
    type: 'dots',
    foreground: '#ffffff',
    background: '#000000',
    size: 16,
  },
  {
    label: 'Lines',
    type: 'lines',
    foreground: '#ffffff',
    background: '#000000',
    size: 16,
  },
  {
    label: 'Squares',
    type: 'squares',
    foreground: '#ffffff',
    background: '#000000',
    size: 16,
  },
  {
    label: 'Hexagons',
    type: 'hexagons',
    foreground: '#ffffff',
    background: '#000000',
    size: 16,
  },
  {
    label: 'Triangles',
    type: 'triangles',
    foreground: '#ffffff',
    background: '#000000',
    size: 16,
  },
  {
    label: 'Circles',
    type: 'circles',
    foreground: '#ffffff',
    background: '#000000',
    size: 16,
  },
]

export const CANVAS_FIXED_ASPECT_RATIO_CSS: Record<Exclude<AspectRatio, 'auto'>, string> = {
  '1:1': '1 / 1',
  '4:3': '4 / 3',
  '16:9': '16 / 9',
  '9:16': '9 / 16',
}

export const CANVAS_AUTO_FALLBACK_ASPECT_WIDTH = 16
export const CANVAS_AUTO_FALLBACK_ASPECT_HEIGHT = 9

export const CANVAS_OPTIONS: { label: string; value: AspectRatio }[] = [
  {
    label: 'Auto',
    value: 'auto',
  },
  {
    label: '1:1',
    value: '1:1',
  },
  {
    label: '4:3',
    value: '4:3',
  },
  {
    label: '16:9',
    value: '16:9',
  },
  {
    label: '9:16',
    value: '9:16',
  },
]
