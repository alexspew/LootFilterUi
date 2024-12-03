import { useFilterStore } from '../../store/config'

export default function CharmSettings() {
  const config = useFilterStore()

  const handleToggle = (key: keyof typeof config.charms) => {
    if (typeof config.charms[key] === 'boolean') {
      config.setCharmConfig({
        [key]: !config.charms[key]
      })
    }
  }

  const handleUniqueCharmToggle = (key: keyof typeof config.charms.uniqueCharms) => {
    if (typeof config.charms.uniqueCharms[key] === 'boolean') {
      config.setCharmConfig({
        uniqueCharms: {
          ...config.charms.uniqueCharms,
          [key]: !config.charms.uniqueCharms[key]
        }
      })
    }
  }

  const handleColorChange = (key: keyof typeof config.charms.customColors, value: string) => {
    config.setCharmConfig({
      customColors: {
        ...config.charms.customColors,
        [key]: value
      }
    })
  }

  const handleUniqueColorChange = (key: keyof typeof config.charms.uniqueCharms.customColors, value: string) => {
    config.setCharmConfig({
      uniqueCharms: {
        ...config.charms.uniqueCharms,
        customColors: {
          ...config.charms.uniqueCharms.customColors,
          [key]: value
        }
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Basic Charm Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-100">Basic Settings</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Show Small Charms</label>
            <button
              type="button"
              onClick={() => handleToggle('showSmall')}
              className={`${
                config.charms.showSmall ? 'bg-indigo-600' : 'bg-gray-700'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            >
              <span
                className={`${
                  config.charms.showSmall ? 'translate-x-5' : 'translate-x-0'
                } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Show Large Charms</label>
            <button
              type="button"
              onClick={() => handleToggle('showLarge')}
              className={`${
                config.charms.showLarge ? 'bg-indigo-600' : 'bg-gray-700'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            >
              <span
                className={`${
                  config.charms.showLarge ? 'translate-x-5' : 'translate-x-0'
                } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Show Grand Charms</label>
            <button
              type="button"
              onClick={() => handleToggle('showGrand')}
              className={`${
                config.charms.showGrand ? 'bg-indigo-600' : 'bg-gray-700'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            >
              <span
                className={`${
                  config.charms.showGrand ? 'translate-x-5' : 'translate-x-0'
                } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Unique Charm Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-100">Unique Charms</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Show Annihilus</label>
            <button
              type="button"
              onClick={() => handleUniqueCharmToggle('showAnnihilus')}
              className={`${
                config.charms.uniqueCharms.showAnnihilus ? 'bg-indigo-600' : 'bg-gray-700'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            >
              <span
                className={`${
                  config.charms.uniqueCharms.showAnnihilus ? 'translate-x-5' : 'translate-x-0'
                } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Show Hellfire Torch</label>
            <button
              type="button"
              onClick={() => handleUniqueCharmToggle('showTorch')}
              className={`${
                config.charms.uniqueCharms.showTorch ? 'bg-indigo-600' : 'bg-gray-700'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            >
              <span
                className={`${
                  config.charms.uniqueCharms.showTorch ? 'translate-x-5' : 'translate-x-0'
                } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Show Gheed's Fortune</label>
            <button
              type="button"
              onClick={() => handleUniqueCharmToggle('showGheeds')}
              className={`${
                config.charms.uniqueCharms.showGheeds ? 'bg-indigo-600' : 'bg-gray-700'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
            >
              <span
                className={`${
                  config.charms.uniqueCharms.showGheeds ? 'translate-x-5' : 'translate-x-0'
                } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Color Settings */}
      <div>
        <h3 className="text-lg font-medium text-gray-100">Color Settings</h3>
        <div className="mt-4 space-y-4">
          {Object.entries(config.charms.customColors).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">{key}</label>
              <input
                type="color"
                value={value}
                onChange={(e) => handleColorChange(key as keyof typeof config.charms.customColors, e.target.value)}
                className="h-8 w-14 rounded border border-gray-600 bg-gray-700 p-1"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Unique Charm Colors */}
      <div>
        <h3 className="text-lg font-medium text-gray-100">Unique Charm Colors</h3>
        <div className="mt-4 space-y-4">
          {Object.entries(config.charms.uniqueCharms.customColors).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">{key}</label>
              <input
                type="color"
                value={value}
                onChange={(e) => handleUniqueColorChange(key as keyof typeof config.charms.uniqueCharms.customColors, e.target.value)}
                className="h-8 w-14 rounded border border-gray-600 bg-gray-700 p-1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 