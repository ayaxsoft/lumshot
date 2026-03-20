import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require('sharp')

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
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
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
  const mime = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`

  return {
    path: filePath,
    dataUrl: `data:${mime};base64,${base64}`,
    naturalWidth: width,
    naturalHeight: height,
  }
})

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
