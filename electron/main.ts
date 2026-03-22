import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import type { ExportPayload } from '../src/store/types'
import {
  ALLOWED_EXPORT_FORMATS,
  WINDOW_DEFAULT_WIDTH_PX,
  WINDOW_DEFAULT_HEIGHT_PX,
  WINDOW_TRAFFIC_LIGHT_X_PX,
  WINDOW_TRAFFIC_LIGHT_Y_PX,
} from '../src/constants'

const require = createRequire(import.meta.url)
const sharp = require('sharp')

const MIME_BY_EXTENSION: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

let win: BrowserWindow | null

const createWindow = () => {
  win = new BrowserWindow({
    title: 'Lumshot',
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: WINDOW_DEFAULT_WIDTH_PX,
    height: WINDOW_DEFAULT_HEIGHT_PX,
    show: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: WINDOW_TRAFFIC_LIGHT_X_PX, y: WINDOW_TRAFFIC_LIGHT_Y_PX },
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  win.once('ready-to-show', () => {
    win?.show()
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // Open DevTools
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }
}

// IPC Handlers
ipcMain.handle('open-file', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'] }],
  })

  if (canceled || filePaths.length === 0) {
    return null
  }

  const [filePath] = filePaths
  const buffer = await fs.readFile(filePath)
  const { width, height } = await sharp(buffer).metadata()
  const base64 = buffer.toString('base64')
  const ext = path.extname(filePath).slice(1).toLowerCase()
  const mime = MIME_BY_EXTENSION[ext] ?? 'application/octet-stream'

  return {
    path: filePath,
    dataUrl: `data:${mime};base64,${base64}`,
    naturalWidth: width,
    naturalHeight: height,
  }
})

ipcMain.handle(
  'export-image',
  async (_event, payload: ExportPayload) => {
    const { dataUrl, format, resolution } = payload

    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: `lumshot-export-${resolution}x.${format}`,
      filters: [{ name: 'Image', extensions: [format] }],
    })

    if (canceled || filePath === undefined || filePath === '') {
      return { success: false }
    }

    if (!ALLOWED_EXPORT_FORMATS.includes(format as (typeof ALLOWED_EXPORT_FORMATS)[number])) {
      return { success: false, error: 'Invalid export format.' }
    }

    try {
      const commaIndex = dataUrl.indexOf(',')
      if (commaIndex < 0) {
        throw new Error('Invalid data URL.')
      }
      const inputBuffer = Buffer.from(dataUrl.slice(commaIndex + 1), 'base64')

      if (format === 'png') {
        await fs.writeFile(filePath, inputBuffer)
      } else {
        await sharp(inputBuffer).toFormat(format).toFile(filePath)
      }

      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      return { success: false, error: message }
    }
  }
)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
