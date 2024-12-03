import React, { useState } from 'react'
import { useFilterStore } from '../../store/config'

export const ModPathDialog: React.FC = () => {
  const { modPath, setModPath } = useFilterStore()
  const [error, setError] = useState<string | null>(null)

  const handleSelectDirectory = async () => {
    try {
      console.log('Opening directory selector...')
      const result = await window.fileSystem.selectDirectory()
      console.log('Directory selector result:', result)

      if (result) {
        console.log('Verifying directory:', result)
        const hasRequiredFiles = await verifyModDirectory(result)
        console.log('Directory verification result:', hasRequiredFiles)

        if (hasRequiredFiles) {
          setModPath(result)
          setError(null)
        } else {
          setError('Selected directory does not contain required mod files. Please select the correct directory.')
        }
      } else {
        console.log('No directory selected or dialog cancelled')
      }
    } catch (err) {
      console.error('Directory selection error:', err)
      setError(`Failed to select directory: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const verifyModDirectory = async (path: string): Promise<boolean> => {
    try {
      console.log('Reading directory contents:', path)
      const files = await window.fileSystem.readDir(path)
      console.log('Directory contents:', files)

      const requiredPaths = [
        'data/local/lng/strings/item-runes.json',
        'data/local/lng/strings/item-names.json',
        'data/global/ui/layouts/_profilehd.json'
      ]

      for (const reqPath of requiredPaths) {
        const fullPath = `${path}/${reqPath}`
        console.log('Checking file:', fullPath)
        const exists = await window.fileSystem.fileExists(fullPath)
        console.log('File exists:', exists)
        if (!exists) {
          console.log(`Missing required file: ${reqPath}`)
          return false
        }
      }

      return true
    } catch (err) {
      console.error('Error verifying directory:', err)
      return false
    }
  }

  if (modPath) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          Select Mod Directory
        </h2>
        <p className="text-gray-300 mb-6">
          Please select your Diablo II Resurrected mod directory. This should be the directory containing your mod files (usually ends with .mpq).
        </p>
        
        {modPath && (
          <div className="mb-4">
            <p className="text-sm text-gray-400">Current path:</p>
            <p className="text-gray-200 break-all">{modPath}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-900 bg-opacity-50 rounded text-red-200 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSelectDirectory}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Select Directory
          </button>
        </div>
      </div>
    </div>
  )
} 