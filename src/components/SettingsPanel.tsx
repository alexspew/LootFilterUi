import React from 'react'
import RuneSettings from './settings/RuneSettings'
import GemSettings from './settings/GemSettings'
import CharmSettings from './settings/CharmSettings'
import ConfigActions from './common/ConfigActions'

export default function SettingsPanel() {
  const [tab, setTab] = React.useState(0)

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Settings</h2>
        <ConfigActions />
      </div>

      <div className="border-t border-gray-700 pt-6">
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              tab === 0 ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setTab(0)}
          >
            Runes
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              tab === 1 ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setTab(1)}
          >
            Gems
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              tab === 2 ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setTab(2)}
          >
            Charms
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          {tab === 0 && <RuneSettings />}
          {tab === 1 && <GemSettings />}
          {tab === 2 && <CharmSettings />}
        </div>
      </div>
    </div>
  )
} 