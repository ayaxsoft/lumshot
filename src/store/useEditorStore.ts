import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {
  AspectRatio,
  BackgroundConfig,
  EditorState,
  ExportFormat,
  ImageMeta,
  ShadowConfig,
} from './types'

const defaultBackground: BackgroundConfig = {
  type: 'gradient',
  gradient: {
    type: 'linear',
    stops: [
      { color: '#8B5CF6', position: 0 },
      { color: '#EC4899', position: 100 },
    ],
    angle: 135,
  },
  solid: '#1a1a1a',
  pattern: {
    type: 'dots',
    foreground: '#ffffff',
    background: '#000000',
    size: 16,
  },
  imageDataUrl: null,
}

const defaultShadow: ShadowConfig = {
  enabled: true,
  blur: 30,
  offsetX: 0,
  offsetY: 10,
  color: '#000000',
  opacity: 40,
}

interface EditorActions {
  setImage: (image: ImageMeta) => void
  setBackground: (bg: Partial<BackgroundConfig>) => void
  setPadding: (v: number) => void
  setBorderRadius: (v: number) => void
  setScale: (v: number) => void
  setOffset: (x: number, y: number) => void
  setShadow: (shadow: Partial<ShadowConfig>) => void
  setAspectRatio: (v: AspectRatio) => void
  setExportFormat: (v: ExportFormat) => void
  setExportResolution: (v: 1 | 2 | 3) => void
  reset: () => void
}

const initialState: EditorState = {
  image: null,
  background: defaultBackground,
  padding: 10,
  borderRadius: 12,
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  shadow: defaultShadow,
  aspectRatio: 'auto',
  exportFormat: 'png',
  exportResolution: 2,
}

export const useEditorStore = create<EditorState & EditorActions>()(
  immer((set) => ({
    ...initialState,

    setImage: (image) =>
      set((state) => {
        state.image = image
      }),
    setBackground: (bg) =>
      set((state) => {
        Object.assign(state.background, bg)
      }),
    setPadding: (v) =>
      set((state) => {
        state.padding = v
      }),
    setBorderRadius: (v) =>
      set((state) => {
        state.borderRadius = v
      }),
    setScale: (v) =>
      set((state) => {
        state.scale = v
      }),
    setOffset: (x, y) =>
      set((state) => {
        state.offsetX = x
        state.offsetY = y
      }),
    setShadow: (shadow) =>
      set((state) => {
        Object.assign(state.shadow, shadow)
      }),
    setAspectRatio: (v) =>
      set((state) => {
        state.aspectRatio = v
      }),
    setExportFormat: (v) =>
      set((state) => {
        state.exportFormat = v
      }),
    setExportResolution: (v) =>
      set((state) => {
        state.exportResolution = v
      }),
    reset: () => set(() => ({ ...initialState })),
  }))
)
