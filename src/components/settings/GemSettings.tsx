import { Switch } from '@headlessui/react'
import { useFilterStore } from '../../store/config'
import ColorPicker from '../common/ColorPicker'

export default function GemSettings() {
  const { gems, setGemConfig } = useFilterStore()

  const handleToggle = (key: keyof typeof gems) => {
    if (typeof gems[key] === 'boolean') {
      setGemConfig({ [key]: !gems[key] })
    }
  }

  const handleColorChange = (type: keyof typeof gems.customColors, color: string) => {
    setGemConfig({
      customColors: {
        ...gems.customColors,
        [type]: color
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium leading-6 text-gray-100">Gem Display Settings</h3>
        
        {/* Toggles */}
        <div className="space-y-4">
          {[
            { key: 'showChipped', label: 'Show Chipped Gems' },
            { key: 'showFlawed', label: 'Show Flawed Gems' },
            { key: 'showNormal', label: 'Show Normal Gems' },
            { key: 'showFlawless', label: 'Show Flawless Gems' },
            { key: 'showPerfect', label: 'Show Perfect Gems' },
          ].map(({ key, label }) => (
            <Switch.Group key={key}>
              <div className="flex items-center justify-between">
                <Switch.Label className="mr-4 text-gray-200">{label}</Switch.Label>
                <Switch
                  checked={gems[key as keyof typeof gems] as boolean}
                  onChange={() => handleToggle(key as keyof typeof gems)}
                  className={`${
                    gems[key as keyof typeof gems] ? 'bg-indigo-600' : 'bg-gray-700'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
                >
                  <span
                    className={`${
                      gems[key as keyof typeof gems] ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </Switch.Group>
          ))}
        </div>

        {/* Color Pickers */}
        <div className="space-y-4 pt-4">
          <h4 className="text-md font-medium text-gray-200">Custom Colors</h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'amethyst', label: 'Amethyst' },
              { key: 'diamond', label: 'Diamond' },
              { key: 'emerald', label: 'Emerald' },
              { key: 'ruby', label: 'Ruby' },
              { key: 'sapphire', label: 'Sapphire' },
              { key: 'topaz', label: 'Topaz' },
              { key: 'skull', label: 'Skull' },
            ].map(({ key, label }) => (
              <ColorPicker
                key={key}
                label={label}
                color={gems.customColors[key as keyof typeof gems.customColors]}
                onChange={(color) => handleColorChange(key as keyof typeof gems.customColors, color)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 