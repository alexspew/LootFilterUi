import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'
import fs from 'fs/promises'

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // In development, load from dev server
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
  } else {
    // In production, load from dist folder
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// File system handlers
ipcMain.handle('file:read', async (_, filePath: string) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return content
  } catch (error) {
    console.error('Error reading file:', error)
    throw error
  }
})

ipcMain.handle('file:write', async (_, filePath: string, data: string) => {
  try {
    await fs.writeFile(filePath, data, 'utf-8')
  } catch (error) {
    console.error('Error writing file:', error)
    throw error
  }
})

ipcMain.handle('dir:read', async (_, dirPath: string) => {
  try {
    const files = await fs.readdir(dirPath)
    return files
  } catch (error) {
    console.error('Error reading directory:', error)
    throw error
  }
})

ipcMain.handle('file:exists', async (_, filePath: string) => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
})

// App handlers
ipcMain.handle('app:forceQuit', () => {
  app.quit()
})

// Validate if the selected directory is a valid ReMoDDeD.mpq folder
async function isValidRemoddedFolder(dirPath: string): Promise<boolean> {
  try {
    // Check if the folder name is correct
    if (path.basename(dirPath) !== 'ReMoDDeD.mpq') {
      return false
    }

    // Check if data directory exists
    const dataPath = path.join(dirPath, 'data')
    try {
      const stats = await fs.stat(dataPath)
      return stats.isDirectory()
    } catch {
      return false
    }
  } catch {
    return false
  }
}

// Handle directory selection
ipcMain.handle('dialog:selectDirectory', async () => {
  if (!mainWindow) {
    throw new Error('Main window not initialized')
  }

  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: 'Select ReMoDDeD.mpq Directory',
    buttonLabel: 'Select Directory',
    message: 'Please select the ReMoDDeD.mpq directory'
  })

  if (result.canceled || !result.filePaths[0]) {
    return null
  }

  const selectedPath = result.filePaths[0]
  const isValid = await isValidRemoddedFolder(selectedPath)

  if (!isValid) {
    await dialog.showMessageBox(mainWindow, {
      type: 'error',
      title: 'Invalid Directory',
      message: 'The selected directory is not a valid ReMoDDeD.mpq folder.\nPlease select a folder named "ReMoDDeD.mpq" that contains a "data" subdirectory.'
    })
    return null
  }

  return selectedPath
}) 