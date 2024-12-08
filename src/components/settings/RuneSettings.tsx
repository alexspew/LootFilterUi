import { useFilterStore } from '../../store/config'
import { RunePattern } from '../../types'

const RUNE_PREVIEWS = {
  lowRunes: ['El', 'Eld', 'Tir', 'Nef', 'Eth', 'Ith', 'Tal', 'Ral', 'Ort', 'Thul'],
  midRunes: ['Amn', 'Sol', 'Shael', 'Dol', 'Hel', 'Io', 'Lum', 'Ko', 'Fal', 'Lem'],
  highRunes: ['Pul', 'Um', 'Mal', 'Ist', 'Gul', 'Vex', 'Ohm', 'Lo', 'Sur', 'Ber', 'Jah', 'Cham', 'Zod']
}

export default function RuneSettings() {
  const config = useFilterStore()

  const handleColorChange = (key: keyof typeof config.RunesCustomColors, value: string) => {
    config.setRuneConfig({
      RunesCustomColors: {
        ...config.RunesCustomColors,
        [key]: value
      }
    })
  }

  const handleShortNameToggle = (key: keyof typeof config.runes.shortNames) => {
    config.setRuneConfig({
      shortNames: {
        ...config.runes.shortNames,
        [key]: !config.runes.shortNames[key]
      }
    })
  }

  const handlePatternChange = (type: keyof typeof config.runes.patterns, part: keyof RunePattern, value: string) => {
    const currentPattern = config.runes.patterns[type] || { prefix: '', suffix: '' }
    config.setRuneConfig({
      patterns: {
        ...config.runes.patterns,
        [type]: {
          ...currentPattern,
          [part]: value
        }
      }
    })
  }

  const getRunePreview = (type: keyof typeof config.runes.patterns) => {
    const color = config.RunesCustomColors[type]
    const useShortName = config.runes.shortNames[type]
    const pattern = config.runes.patterns[type] || { prefix: '', suffix: '' }

    return RUNE_PREVIEWS[type].map(rune => {
      const displayName = useShortName ? rune : `${rune} Rune`
      const highlightedName = `${pattern.prefix}${displayName}${pattern.suffix}`
      
      return (
        <span key={rune} style={{ color }} className="mr-2 font-mono whitespace-pre">
          {highlightedName}
        </span>
      )
    })
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Highlight Pattern */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-medium text-gray-100 mb-4">Highlight Pattern</h3>
            <div className="space-y-6">
              {['lowRunes', 'midRunes', 'highRunes'].map((type) => (
                <div key={type} className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300">
                    {type === 'lowRunes' ? 'Low Runes' : type === 'midRunes' ? 'Mid Runes' : 'High Runes'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Before</label>
                      <input
                        type="text"
                        value={config.runes.patterns[type as keyof typeof config.runes.patterns]?.prefix || ''}
                        onChange={(e) => handlePatternChange(type as keyof typeof config.runes.patterns, 'prefix', e.target.value)}
                        placeholder="e.g. ** "
                        className="w-full px-3 py-1.5 bg-gray-900 text-white rounded border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">After</label>
                      <input
                        type="text"
                        value={config.runes.patterns[type as keyof typeof config.runes.patterns]?.suffix || ''}
                        onChange={(e) => handlePatternChange(type as keyof typeof config.runes.patterns, 'suffix', e.target.value)}
                        placeholder="e.g. **"
                        className="w-full px-3 py-1.5 bg-gray-900 text-white rounded border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-sm text-gray-400">Add text/spaces before and after rune names (spaces add padding)</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Rune Colors */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-medium text-gray-100 mb-4">Rune Colors</h3>
            <div className="space-y-4">
              {['lowRunes', 'midRunes', 'highRunes'].map((type) => (
                <div key={type} className="flex items-center">
                  <label className="flex-grow text-sm font-medium text-gray-300">
                    {type === 'lowRunes' ? 'Low Runes' : type === 'midRunes' ? 'Mid Runes' : 'High Runes'}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.RunesCustomColors[type as keyof typeof config.RunesCustomColors]}
                      onChange={(e) => handleColorChange(type as keyof typeof config.RunesCustomColors, e.target.value)}
                      className="h-8 w-14 rounded border-gray-700 bg-gray-900"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Short Names */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-medium text-gray-100 mb-4">Short Names</h3>
            <div className="space-y-4">
              {['lowRunes', 'midRunes', 'highRunes'].map((type) => (
                <div key={type} className="flex items-center">
                  <label className="flex-grow text-sm font-medium text-gray-300">
                    {type === 'lowRunes' ? 'Low Runes' : type === 'midRunes' ? 'Mid Runes' : 'High Runes'}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleShortNameToggle(type as keyof typeof config.runes.shortNames)}
                    className={`${
                      config.runes.shortNames[type as keyof typeof config.runes.shortNames] ? 'bg-indigo-600' : 'bg-gray-700'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span
                      className={`${
                        config.runes.shortNames[type as keyof typeof config.runes.shortNames] ? 'translate-x-5' : 'translate-x-0'
                      } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview at the bottom */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-medium text-gray-100 mb-4">Live Preview</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Low Runes</h4>
            <div className="flex flex-wrap gap-2 bg-gray-900 p-3 rounded">{getRunePreview('lowRunes')}</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">Mid Runes</h4>
            <div className="flex flex-wrap gap-2 bg-gray-900 p-3 rounded">{getRunePreview('midRunes')}</div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-2">High Runes</h4>
            <div className="flex flex-wrap gap-2 bg-gray-900 p-3 rounded">{getRunePreview('highRunes')}</div>
          </div>
        </div>
      </div>
    </div>
  )
} 