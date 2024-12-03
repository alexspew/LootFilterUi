import SettingsPanel from './components/SettingsPanel'
import { ModPathDialog } from './components/common/ModPathDialog'
import { useModPathStore } from './store/modPath'

export default function App() {
  const { isPathSet } = useModPathStore()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <ModPathDialog />
      {isPathSet && <SettingsPanel />}
    </div>
  )
} 