import type {
  AspectRatio,
  CanvasAspectRatioOption,
  MeshRadialLayerSpec,
  PatternPreset,
} from './store/types'

export const BACKGROUND_TYPE_GLYPH_VIEWBOX_PX = 24

export const COLOR_SWATCH_POPOVER_CONTENT_WIDTH_PX = 220

export const EXPORT_RESOLUTION_MIN = 1
export const EXPORT_RESOLUTION_MAX = 3

export const EDITOR_TEMPORAL_HANDLE_SET_DEBOUNCE_MS = 300

export const CANVAS_EXPORT_SURFACE_TEST_ID = 'canvas-export-surface'

export const DROPZONE_ICON_SIZE_PX = 54
export const DROPZONE_ICON_STROKE = 1.25

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
    label: 'Scarlet',
    stops: [
      { color: '#FF5757', position: 0 },
      { color: '#8C52FF', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Grape',
    stops: [
      { color: '#9747FF', position: 0 },
      { color: '#FF4FBB', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Blush',
    stops: [
      { color: '#FFAFCC', position: 0 },
      { color: '#C4B5FD', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Tropical',
    stops: [
      { color: '#4158D0', position: 0 },
      { color: '#C850C0', position: 46 },
      { color: '#FFCC70', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Chromatic',
    stops: [
      { color: '#0ED2F7', position: 0 },
      { color: '#B2FEFA', position: 50 },
      { color: '#FF6FD8', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Lagoon',
    stops: [
      { color: '#67E8F9', position: 0 },
      { color: '#A78BFA', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Mint',
    stops: [
      { color: '#A78BFA', position: 0 },
      { color: '#6EE7B7', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Silver',
    stops: [
      { color: '#D1D5DB', position: 0 },
      { color: '#F3F4F6', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Obsidian',
    stops: [
      { color: '#111827', position: 0 },
      { color: '#374151', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Ice',
    stops: [
      { color: '#BAE6FD', position: 0 },
      { color: '#E0F2FE', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Sky',
    stops: [
      { color: '#3B82F6', position: 0 },
      { color: '#93C5FD', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Indigo',
    stops: [
      { color: '#4F46E5', position: 0 },
      { color: '#818CF8', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Sunrise',
    stops: [
      { color: '#FDE68A', position: 0 },
      { color: '#FCA5A5', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Peach',
    stops: [
      { color: '#FDBA74', position: 0 },
      { color: '#FDE68A', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Tangerine',
    stops: [
      { color: '#FB923C', position: 0 },
      { color: '#EF4444', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Lime',
    stops: [
      { color: '#BEF264', position: 0 },
      { color: '#FDE047', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Emerald',
    stops: [
      { color: '#34D399', position: 0 },
      { color: '#A3E635', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Spring',
    stops: [
      { color: '#A3E635', position: 0 },
      { color: '#86EFAC', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Rose',
    stops: [
      { color: '#FBCFE8', position: 0 },
      { color: '#DDD6FE', position: 100 },
    ],
    angle: GRADIENT_ANGLES.LINEAR,
  },
  {
    label: 'Violet',
    stops: [
      { color: '#C4B5FD', position: 0 },
      { color: '#818CF8', position: 100 },
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
  '16:9': '16 / 9',
  '3:2': '3 / 2',
  '4:3': '4 / 3',
  '5:4': '5 / 4',
  '1:1': '1 / 1',
  '4:5': '4 / 5',
  '3:4': '3 / 4',
  '2:3': '2 / 3',
  '9:16': '9 / 16',
}

export const CANVAS_ASPECT_AUTO: CanvasAspectRatioOption = {
  label: 'Auto',
  value: 'auto',
}

export const CANVAS_ASPECT_PRESETS: CanvasAspectRatioOption[] = [
  { label: '16:9', value: '16:9' },
  { label: '3:2', value: '3:2' },
  { label: '4:3', value: '4:3' },
  { label: '5:4', value: '5:4' },
  { label: '1:1', value: '1:1' },
  { label: '4:5', value: '4:5' },
  { label: '3:4', value: '3:4' },
  { label: '2:3', value: '2:3' },
  { label: '9:16', value: '9:16' },
]

export const CANVAS_AUTO_FALLBACK_ASPECT_WIDTH = 16
export const CANVAS_AUTO_FALLBACK_ASPECT_HEIGHT = 9

export const ASPECT_RATIO_SWATCH_AUTO_PREVIEW_MAX_PERCENT = 52
export const ASPECT_RATIO_SWATCH_AUTO_PREVIEW_MAX_REM = 1.85

export const WINDOW_DEFAULT_WIDTH_PX = 1200
export const WINDOW_DEFAULT_HEIGHT_PX = 800
export const WINDOW_DRAG_REGION_HEIGHT_PX = 40
export const WINDOW_TRAFFIC_LIGHT_X_PX = 12
export const WINDOW_TRAFFIC_LIGHT_Y_PX = 14

export const ALLOWED_EXPORT_FORMATS = ['png', 'jpeg', 'webp'] as const

export const GRADIENT_PRESETS_COLLAPSED_COUNT = 4
export const GRADIENT_PRESETS_PEEK_COUNT = 2

export const CODE_THEMES = [
  // ── Dark ──────────────────────────────────────────────────────────────────
  { label: 'Night Owl', value: 'nightOwl', dark: true },
  { label: 'Atom One Dark', value: 'atomOneDark', dark: true },
  { label: 'Dracula', value: 'dracula', dark: true },
  { label: 'Nord', value: 'nord', dark: true },
  { label: 'VS Dark', value: 'vs2015', dark: true },
  { label: 'Monokai', value: 'monokai', dark: true },
  { label: 'Shades of Purple', value: 'shadesOfPurple', dark: true },
  { label: 'Tomorrow Night', value: 'tomorrowNight', dark: true },
  { label: 'Tomorrow Night Blue', value: 'tomorrowNightBlue', dark: true },
  { label: 'Hybrid', value: 'hybrid', dark: true },
  { label: 'Obsidian', value: 'obsidian', dark: true },
  { label: 'Solarized Dark', value: 'solarizedDark', dark: true },
  // ── Light ─────────────────────────────────────────────────────────────────
  { label: 'GitHub', value: 'github', dark: false },
  { label: 'GitHub Gist', value: 'githubGist', dark: false },
  { label: 'Atom One Light', value: 'atomOneLight', dark: false },
  { label: 'Solarized Light', value: 'solarizedLight', dark: false },
]

export const CODE_THEME_BG: Record<string, string> = {
  atomOneDark: '#282c34',
  dracula: '#282a36',
  nord: '#2E3440',
  nightOwl: '#011627',
  vs2015: '#1E1E1E',
  monokai: '#272822',
  shadesOfPurple: '#2d2b57',
  tomorrowNight: '#1d1f21',
  tomorrowNightBlue: '#002451',
  hybrid: '#1d1f21',
  obsidian: '#282b2e',
  solarizedDark: '#002b36',
  githubGist: '#ffffff',
  atomOneLight: '#fafafa',
  solarizedLight: '#fdf6e3',
  github: '#f8f8f8',
}

export const CODE_FONTS = [
  { label: 'System Mono', value: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace' },
  { label: 'Menlo', value: 'Menlo, Monaco, monospace' },
  { label: 'Monaco', value: 'Monaco, Menlo, monospace' },
  { label: 'SF Mono', value: '"SF Mono", ui-monospace, Menlo, monospace' },
  { label: 'Consolas', value: 'Consolas, "Courier New", monospace' },
  { label: 'Courier New', value: '"Courier New", Courier, monospace' },
  { label: 'Fira Code', value: '"Fira Code", "Fira Mono", monospace' },
  { label: 'JetBrains Mono', value: '"JetBrains Mono", monospace' },
  { label: 'Source Code Pro', value: '"Source Code Pro", monospace' },
  { label: 'IBM Plex Mono', value: '"IBM Plex Mono", monospace' },
  { label: 'Cascadia Code', value: '"Cascadia Code", monospace' },
  { label: 'Inconsolata', value: 'Inconsolata, monospace' },
]

export const CODE_WINDOW_STYLES = [
  { label: 'macOS', value: 'macos' },
  { label: 'Windows', value: 'windows' },
  { label: 'None', value: 'none' },
]

export const CODE_LANGUAGES = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'JSX', value: 'jsx' },
  { label: 'TSX', value: 'tsx' },
  { label: 'Python', value: 'python' },
  { label: 'Rust', value: 'rust' },
  { label: 'Go', value: 'go' },
  { label: 'Java', value: 'java' },
  { label: 'C', value: 'c' },
  { label: 'C++', value: 'cpp' },
  { label: 'C#', value: 'csharp' },
  { label: 'Swift', value: 'swift' },
  { label: 'Kotlin', value: 'kotlin' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'PHP', value: 'php' },
  { label: 'CSS', value: 'css' },
  { label: 'HTML', value: 'html' },
  { label: 'JSON', value: 'json' },
  { label: 'YAML', value: 'yaml' },
  { label: 'Bash', value: 'bash' },
  { label: 'SQL', value: 'sql' },
  { label: 'GraphQL', value: 'graphql' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'Plain Text', value: 'text' },
]

// react-syntax-highlighter renders line numbers at ~3.5em wide
export const CODE_LAYER_GUTTER_EM = 3.5
export const CODE_LAYER_V_PADDING_PX = 28
export const CODE_LAYER_H_PADDING_PX = 28
export const CODE_LAYER_LINE_HEIGHT = 1.75
