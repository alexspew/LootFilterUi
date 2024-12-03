const { contextBridge, ipcRenderer } = require('electron')

export {} // Make this file a module

interface FileSystemAPI {
  readFile: (path: string) => Promise<string>
  writeFile: (path: string, data: string) => Promise<void>
  readDir: (path: string) => Promise<string[]>
}

interface AppAPI {
  forceQuit: () => Promise<void>
  onClosing: (callback: () => void) => void
}

declare global {
  interface Window {
    fileSystem: FileSystemAPI
    app: AppAPI
  }
}

// Expose file system operations to the renderer process
contextBridge.exposeInMainWorld('fileSystem', {
  readFile: async (path: string) => {
    try {
      return await ipcRenderer.invoke('readFile', path)
    } catch (error) {
      console.error(`Failed to read file: ${path}`, error)
      throw error
    }
  },
  writeFile: async (path: string, data: string) => {
    try {
      return await ipcRenderer.invoke('writeFile', path, data)
    } catch (error) {
      console.error(`Failed to write file: ${path}`, error)
      throw error
    }
  },
  readDir: async (path: string) => {
    try {
      return await ipcRenderer.invoke('readDir', path)
    } catch (error) {
      console.error(`Failed to read directory: ${path}`, error)
      throw error
    }
  }
})

// Expose app lifecycle functions
contextBridge.exposeInMainWorld('app', {
  forceQuit: () => ipcRenderer.invoke('force-quit'),
  onClosing: (callback: () => void) => {
    ipcRenderer.on('app-closing', callback)
  }
}) 