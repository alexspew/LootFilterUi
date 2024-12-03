import { contextBridge, ipcRenderer } from 'electron'

// Define the interfaces
interface FileSystem {
  readFile: (path: string) => Promise<string>
  writeFile: (path: string, data: string) => Promise<void>
  readDir: (path: string) => Promise<string[]>
  selectDirectory: () => Promise<string | null>
  fileExists: (path: string) => Promise<boolean>
}

interface App {
  forceQuit: () => Promise<void>
  onClosing: (callback: () => void) => void
}

// Expose file system operations to the renderer process
const fileSystem: FileSystem = {
  readFile: (path: string) => ipcRenderer.invoke('file:read', path),
  writeFile: (path: string, data: string) => ipcRenderer.invoke('file:write', path, data),
  readDir: (path: string) => ipcRenderer.invoke('dir:read', path),
  selectDirectory: () => ipcRenderer.invoke('dialog:selectDirectory'),
  fileExists: (path: string) => ipcRenderer.invoke('file:exists', path)
}

// Expose app operations to the renderer process
const app: App = {
  forceQuit: () => ipcRenderer.invoke('app:forceQuit'),
  onClosing: (callback: () => void) => {
    ipcRenderer.on('app:closing', callback)
  }
}

// Expose interfaces to window
contextBridge.exposeInMainWorld('fileSystem', fileSystem)
contextBridge.exposeInMainWorld('app', app)
contextBridge.exposeInMainWorld('electronAPI', {
  selectDirectory: () => ipcRenderer.invoke('dialog:selectDirectory')
})

// Export types
export type { FileSystem, App } 