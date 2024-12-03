import { useFilterStore } from '../../store/config'
import { hexToD2RColor } from '../../utils/colorUtils'

const PREVIEW_RUNES = {
  lowRunes: 'Eth',
  midRunes: 'Lem',
  highRunes: 'Ber'
}

export const RunePatternPreview = () => {
  const store = useFilterStore()
  const { patterns, padding, shortNames } = store.runes
  const colors = store.RunesCustomColors

  const formatRuneName = (name: string, tier: 'lowRunes' | 'midRunes' | 'highRunes') => {
    const pattern = patterns[tier]
    const paddingSpaces = ' '.repeat(padding[tier] || 0)
    const displayName = shortNames[tier] ? name : `${name} Rune`

    let formattedName = displayName
    if (pattern) {
      formattedName = `${pattern}${paddingSpaces}${formattedName}${paddingSpaces}${pattern}`
    }

    return formattedName
  }

  return (
    <div className="border p-4 rounded bg-gray-800">
      <h3 className="text-lg font-semibold mb-4 text-gray-200">Preview</h3>
      <div className="font-mono bg-black/90 p-4 rounded space-y-4">
        <div className="space-y-2">
          <div className="text-xs text-gray-400">
            Color codes: <span className="text-emerald-400">Low: {hexToD2RColor(colors.lowRunes)}</span> | <span className="text-emerald-400">Mid: {hexToD2RColor(colors.midRunes)}</span> | <span className="text-emerald-400">High: {hexToD2RColor(colors.highRunes)}</span>
          </div>
          <div className="text-xs text-gray-400">
            Pattern lengths: <span className="text-emerald-400">Low: {patterns.lowRunes.length}</span> | <span className="text-emerald-400">Mid: {patterns.midRunes.length}</span> | <span className="text-emerald-400">High: {patterns.highRunes.length}</span>
          </div>
          <div className="text-xs text-gray-400">
            Padding spaces: <span className="text-emerald-400">Low: {padding.lowRunes}</span> | <span className="text-emerald-400">Mid: {padding.midRunes}</span> | <span className="text-emerald-400">High: {padding.highRunes}</span>
          </div>
        </div>

        <div className="space-y-2 border-t border-gray-700 pt-4">
          <div className="flex items-center gap-4">
            <span className="w-24 text-gray-400">Low Rune:</span>
            <span className="font-mono" style={{ color: colors.lowRunes }}>{formatRuneName(PREVIEW_RUNES.lowRunes, 'lowRunes')}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-gray-400">Mid Rune:</span>
            <span className="font-mono" style={{ color: colors.midRunes }}>{formatRuneName(PREVIEW_RUNES.midRunes, 'midRunes')}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-24 text-gray-400">High Rune:</span>
            <span className="font-mono" style={{ color: colors.highRunes }}>{formatRuneName(PREVIEW_RUNES.highRunes, 'highRunes')}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 