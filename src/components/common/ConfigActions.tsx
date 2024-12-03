import { useState } from 'react'
import { useFilterStore } from '../../store/config'
import RuneChangeLog from './RuneChangeLog'
import CharmChangeLog from './CharmChangeLog'
import { DebugSettings } from '../settings/DebugSettings'

export default function ConfigActions() {
  const { exportConfig, importConfig, resetConfig, saveChanges, hasUnsavedChanges, debug } = useFilterStore()
  const [showImport, setShowImport] = useState(false)
  const [importText, setImportText] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const handleExport = () => {
    const config = exportConfig()
    const blob = new Blob([config], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'filter-config.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    try {
      importConfig(importText)
      setShowImport(false)
      setImportText('')
    } catch (e) {
      console.error('Failed to import config:', e)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)
    try {
      await saveChanges()
    } catch (e) {
      console.error('Failed to save changes:', e)
      setSaveError(e instanceof Error ? e.message : 'Failed to save changes')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-100">Configuration</h3>
          <div className="flex items-center space-x-4">
            {hasUnsavedChanges && (
              <span className="text-sm text-yellow-400">You have unsaved changes</span>
            )}
            {saveError && (
              <span className="text-sm text-red-400">{saveError}</span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isSaving}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              hasUnsavedChanges
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button
            onClick={handleExport}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Export Settings
          </button>
          
          <button
            onClick={() => setShowImport(true)}
            className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Import Settings
          </button>
          
          <button
            onClick={resetConfig}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Reset to Default
          </button>
        </div>

        {showImport && (
          <div className="mt-4 space-y-4">
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full rounded-md border-gray-600 bg-gray-700 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={10}
              placeholder="Paste configuration JSON here..."
            />
            <div className="flex space-x-4">
              <button
                onClick={handleImport}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Apply Settings
              </button>
              <button
                onClick={() => {
                  setShowImport(false)
                  setImportText('')
                }}
                className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="rounded-lg bg-gray-800 p-4">
        <DebugSettings />
      </div>
      {debug?.enableRuneDebugging && <RuneChangeLog />}
      {debug?.enableCharmDebugging && <CharmChangeLog />}
    </div>
  )
} 