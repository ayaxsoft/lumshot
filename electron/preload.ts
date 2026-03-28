import { ipcRenderer, contextBridge } from 'electron'
import type { ExportPayload, ImageMeta } from '../src/store/types'

contextBridge.exposeInMainWorld('lumshotAPI', {
  openFile: (): Promise<ImageMeta | null> => ipcRenderer.invoke('open-file'),

  exportImage: (
    payload: ExportPayload
  ): Promise<{ success: boolean; filePath?: string; error?: string }> =>
    ipcRenderer.invoke('export-image', payload),

  openExportedFile: (filePath: string): Promise<void> =>
    ipcRenderer.invoke('open-exported-file', filePath),

  sendFeedback: (payload: {
    rating: number | null
    message: string
  }): Promise<{ success: boolean; error?: string }> => ipcRenderer.invoke('send-feedback', payload),
})

export interface LumshotAPI {
  openFile: () => Promise<ImageMeta | null>
  exportImage: (
    payload: ExportPayload
  ) => Promise<{ success: boolean; filePath?: string; error?: string }>
  openExportedFile: (filePath: string) => Promise<void>
  sendFeedback: (payload: {
    rating: number | null
    message: string
  }) => Promise<{ success: boolean; error?: string }>
}

declare global {
  interface Window {
    lumshotAPI: LumshotAPI
  }
}
