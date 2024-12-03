import React from 'react'
import { Switch } from '@headlessui/react'
import { useFilterStore } from '../../store/config'

export const DebugSettings: React.FC = () => {
  const config = useFilterStore(state => state)

  const handleRuneDebugChange = (checked: boolean) => {
    config.setDebug({
      ...config.debug,
      enableRuneDebugging: checked
    })
  }

  const handleCharmDebugChange = (checked: boolean) => {
    config.setDebug({
      ...config.debug,
      enableCharmDebugging: checked
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-100">Debug Settings</h3>
      <div className="space-y-2">
        <Switch.Group>
          <div className="flex items-center justify-between">
            <Switch.Label className="text-sm text-gray-300">
              Enable Rune Debugging
            </Switch.Label>
            <Switch
              checked={config.debug?.enableRuneDebugging ?? false}
              onChange={handleRuneDebugChange}
              className={`${
                config.debug?.enableRuneDebugging ? 'bg-indigo-600' : 'bg-gray-600'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config.debug?.enableRuneDebugging ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>

        <Switch.Group>
          <div className="flex items-center justify-between">
            <Switch.Label className="text-sm text-gray-300">
              Enable Charm Debugging
            </Switch.Label>
            <Switch
              checked={config.debug?.enableCharmDebugging ?? true}
              onChange={handleCharmDebugChange}
              className={`${
                config.debug?.enableCharmDebugging ? 'bg-indigo-600' : 'bg-gray-600'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  config.debug?.enableCharmDebugging ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </Switch.Group>
      </div>
    </div>
  )
} 