import SettingsPanel from './components/SettingsPanel'
import { ModPathDialog } from './components/common/ModPathDialog'
import { useModPathStore } from './store/modPath'
import { useEffect } from 'react'
import { useStore } from './store/config'

export default function App() {
  const { isPathSet } = useModPathStore()
  const init = useStore(state => state.init)

  useEffect(() => {
    init()
  }, [init])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <ModPathDialog />
      {isPathSet && <SettingsPanel />}
    </div>
  )
} 