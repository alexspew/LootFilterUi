import { useFilterStore } from '../../store/config'
import ColorPicker from '../common/ColorPicker'
import { RunePatternPreview } from './RunePatternPreview'
import type { ModConfig } from '../../types'

type RuneTier = 'lowRunes' | 'midRunes' | 'highRunes'
//type RuneConfigKey = keyof ModConfig['runes']['patterns'] | keyof ModConfig['runes']['padding'] | keyof ModConfig['runes']['shortNames']

const RuneSettings = () => {
  const store = useFilterStore()
  const { patterns, padding, shortNames } = store.runes
  const colors = store.RunesCustomColors

  const updateRuneConfig = (tier: RuneTier, field: 'patterns' | 'padding' | 'shortNames', value: string | number | boolean) => {
    store.setRuneConfig({
      [field]: {
        ...store.runes[field],
        [tier]: value
      }
    })
  }

  const updateRuneColor = (tier: keyof ModConfig['RunesCustomColors'], color: string) => {
    store.setRuneConfig({
      RunesCustomColors: {
        ...store.RunesCustomColors,
        [tier]: color
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Low Runes Section */}
        <div className="border p-4 rounded bg-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Low Runes (El - Dol)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Pattern:</label>
              <input
                type="text"
                value={patterns.lowRunes}
                onChange={(e) => updateRuneConfig('lowRunes', 'patterns', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200"
                placeholder="e.g. *"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Padding:</label>
              <input
                type="number"
                value={padding.lowRunes}
                onChange={(e) => updateRuneConfig('lowRunes', 'padding', parseInt(e.target.value) || 0)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200"
                min="0"
              />
            </div>
            <div>
              <label className="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={shortNames.lowRunes}
                  onChange={(e) => updateRuneConfig('lowRunes', 'shortNames', e.target.checked)}
                  className="form-checkbox rounded bg-gray-700 border-gray-600"
                />
                <span>Short Names</span>
              </label>
            </div>
            <div>
              <ColorPicker
                color={colors.lowRunes}
                onChange={(color) => updateRuneColor('lowRunes', color)}
                label="Color"
              />
            </div>
          </div>
        </div>

        {/* Mid Runes Section */}
        <div className="border p-4 rounded bg-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Mid Runes (Ral, Hel - Gul)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Pattern:</label>
              <input
                type="text"
                value={patterns.midRunes}
                onChange={(e) => updateRuneConfig('midRunes', 'patterns', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200"
                placeholder="e.g. **"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Padding:</label>
              <input
                type="number"
                value={padding.midRunes}
                onChange={(e) => updateRuneConfig('midRunes', 'padding', parseInt(e.target.value) || 0)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200"
                min="0"
              />
            </div>
            <div>
              <label className="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={shortNames.midRunes}
                  onChange={(e) => updateRuneConfig('midRunes', 'shortNames', e.target.checked)}
                  className="form-checkbox rounded bg-gray-700 border-gray-600"
                />
                <span>Short Names</span>
              </label>
            </div>
            <div>
              <ColorPicker
                color={colors.midRunes}
                onChange={(color) => updateRuneColor('midRunes', color)}
                label="Color"
              />
            </div>
          </div>
        </div>

        {/* High Runes Section */}
        <div className="border p-4 rounded bg-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">High Runes (Vex - Zod)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Pattern:</label>
              <input
                type="text"
                value={patterns.highRunes}
                onChange={(e) => updateRuneConfig('highRunes', 'patterns', e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200"
                placeholder="e.g. ***"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Padding:</label>
              <input
                type="number"
                value={padding.highRunes}
                onChange={(e) => updateRuneConfig('highRunes', 'padding', parseInt(e.target.value) || 0)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-200"
                min="0"
              />
            </div>
            <div>
              <label className="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  checked={shortNames.highRunes}
                  onChange={(e) => updateRuneConfig('highRunes', 'shortNames', e.target.checked)}
                  className="form-checkbox rounded bg-gray-700 border-gray-600"
                />
                <span>Short Names</span>
              </label>
            </div>
            <div>
              <ColorPicker
                color={colors.highRunes}
                onChange={(color) => updateRuneColor('highRunes', color)}
                label="Color"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <RunePatternPreview />
    </div>
  )
}

export default RuneSettings 