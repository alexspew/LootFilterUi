declare interface Window {
  fileSystem: {
    readFile: (path: string) => Promise<string>
    writeFile: (path: string, data: string) => Promise<void>
    readDir: (path: string) => Promise<string[]>
    selectDirectory: () => Promise<string | null>
    fileExists: (path: string) => Promise<boolean>
  }
} 