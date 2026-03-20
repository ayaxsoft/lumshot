import { ipcRenderer, contextBridge } from 'electron'
import type { ImageMeta } from '../src/store/types'

// Expose protected methods that allow the Renderer process to use
contextBridge.exposeInMainWorld('lumshotAPI', {
  openFile: (): Promise<ImageMeta | null> => ipcRenderer.invoke('open-file'),
})

export interface LumshotAPI {
  openFile: () => Promise<ImageMeta | null>
}

declare global {
  interface Window {
    lumshotAPI: LumshotAPI
  }
}
