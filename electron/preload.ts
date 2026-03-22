import { ipcRenderer, contextBridge } from 'electron'
import type { ExportPayload, ImageMeta } from '../src/store/types'

// Expose protected methods that allow the Renderer process to use
contextBridge.exposeInMainWorld('lumshotAPI', {
  openFile: (): Promise<ImageMeta | null> => ipcRenderer.invoke('open-file'),
  exportImage: (payload: ExportPayload): Promise<{ success: boolean; error?: string }> =>
    ipcRenderer.invoke('export-image', payload),
})

export interface LumshotAPI {
  openFile: () => Promise<ImageMeta | null>
  exportImage: (payload: ExportPayload) => Promise<{ success: boolean; error?: string }>
}

declare global {
  interface Window {
    lumshotAPI: LumshotAPI
  }
}
