import type { FileSystem, App } from '../preload'

declare global {
  interface Window {
    fileSystem: FileSystem
    app: App
  }
} 