import { create } from 'zustand'
import type { StoreApi } from 'zustand'
import { temporal } from 'zundo'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import {
  EDITOR_TEMPORAL_HANDLE_SET_DEBOUNCE_MS,
  EXPORT_RESOLUTION_MAX,
  EXPORT_RESOLUTION_MIN,
} from '@/constants'

import {
  AspectRatio,
  BackgroundConfig,
  CodeConfig,
  EditorMode,
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
  setMode: (mode: EditorMode) => void
  setImage: (image: ImageMeta) => void
  setPendingImage: (image: ImageMeta) => void
  confirmPendingImage: () => void
  clearPendingImage: () => void
  setBackground: (background: Partial<BackgroundConfig>) => void
  setPadding: (value: number) => void
  setBorderRadius: (value: number) => void
  setScale: (value: number) => void
  setOffset: (offsetX: number, offsetY: number) => void
  setShadow: (shadow: Partial<ShadowConfig>) => void
  setAspectRatio: (value: AspectRatio) => void
  setExportFormat: (value: ExportFormat) => void
  setExportResolution: (value: number) => void
  setCode: (code: Partial<CodeConfig>) => void
  reset: () => void
}

interface EditorStoreModel extends EditorState, EditorActions {}

type EditorStoreSetState = StoreApi<EditorStoreModel>['setState']

interface EditorTemporalHandleSet {
  (
    pastState: Parameters<EditorStoreSetState>[0],
    replace: Parameters<EditorStoreSetState>[1],
    currentState: Partial<EditorStoreModel>,
    deltaState?: Partial<EditorStoreModel> | null
  ): void
}

const defaultCode: CodeConfig = {
  content: '',
  filename: '',
  language: 'typescript',
  theme: 'nightOwl',
  fontSize: 16,
  fontFamily: 'ui-monospace',
  showLineNumbers: true,
  windowStyle: 'macos',
}

const initialState: EditorState = {
  mode: 'image',
  image: null,
  pendingImage: null,
  background: defaultBackground,
  padding: 10,
  borderRadius: 12,
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  shadow: defaultShadow,
  aspectRatio: '16:9',
  exportFormat: 'png',
  exportResolution: 2,
  code: defaultCode,
}

export const useEditorStore = create<EditorState & EditorActions>()(
  devtools(
    temporal(
      immer((set) => ({
        ...initialState,

        setMode: (mode) =>
          set((state) => {
            state.mode = mode
          }),
        setImage: (image) =>
          set((state) => {
            state.image = image
          }),
        setPendingImage: (image) =>
          set((state) => {
            if (state.image === null) {
              state.image = image
            } else {
              state.pendingImage = image
            }
          }),
        confirmPendingImage: () =>
          set((state) => {
            if (state.pendingImage !== null) {
              state.image = state.pendingImage
              state.pendingImage = null
            }
          }),
        clearPendingImage: () =>
          set((state) => {
            state.pendingImage = null
          }),
        setBackground: (background) =>
          set((state) => {
            Object.assign(state.background, background)
          }),
        setPadding: (value) =>
          set((state) => {
            state.padding = value
          }),
        setBorderRadius: (value) =>
          set((state) => {
            state.borderRadius = value
          }),
        setScale: (value) =>
          set((state) => {
            state.scale = value
          }),
        setOffset: (offsetX, offsetY) =>
          set((state) => {
            state.offsetX = offsetX
            state.offsetY = offsetY
          }),
        setShadow: (shadow) =>
          set((state) => {
            Object.assign(state.shadow, shadow)
          }),
        setAspectRatio: (value) =>
          set((state) => {
            state.aspectRatio = value
          }),
        setExportFormat: (value) =>
          set((state) => {
            state.exportFormat = value
          }),
        setExportResolution: (value) =>
          set((state) => {
            const clamped = Math.min(
              EXPORT_RESOLUTION_MAX,
              Math.max(EXPORT_RESOLUTION_MIN, Math.round(Number(value)))
            )
            if (clamped === 1) {
              state.exportResolution = 1
            } else if (clamped === 2) {
              state.exportResolution = 2
            } else {
              state.exportResolution = 3
            }
          }),
        setCode: (code) =>
          set((state) => {
            Object.assign(state.code, code)
          }),
        reset: () => set(() => ({ ...initialState })),
      })),
      {
        partialize: (state: EditorState & EditorActions) => ({
          ...state,
          pendingImage: null,
        }),
        handleSet: (recordPastInHistory) => {
          const applyTemporalUndo: EditorTemporalHandleSet =
            recordPastInHistory as EditorTemporalHandleSet
          let timer: ReturnType<typeof setTimeout> | null = null
          return (pastState, replace, currentState, deltaState) => {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
              applyTemporalUndo(pastState, replace, currentState, deltaState)
              timer = null
            }, EDITOR_TEMPORAL_HANDLE_SET_DEBOUNCE_MS)
          }
        },
      }
    ),
    { store: 'editor-store' }
  )
)
