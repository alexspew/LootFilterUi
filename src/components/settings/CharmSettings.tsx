import { useFilterStore } from '../../store/config'

export default function CharmSettings() {
  const config = useFilterStore()

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
      {/* Unique Charm Colors */}
      <div>
        <h3 className="text-lg font-medium text-gray-100">Unique Charm Colors</h3>
        <div className="mt-4 space-y-4">
          {/* Standard Unique Charms */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Annihilus</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.annihilus}
              onChange={(e) => handleUniqueColorChange('annihilus', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Hellfire Torch</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.torch}
              onChange={(e) => handleUniqueColorChange('torch', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Gheed's Fortune</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.gheeds}
              onChange={(e) => handleUniqueColorChange('gheeds', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          {/* Mod-specific Charms */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Blank Talent</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.blankTalent}
              onChange={(e) => handleUniqueColorChange('blankTalent', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Seven Deadly Sins</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.sevenDeadlySins}
              onChange={(e) => handleUniqueColorChange('sevenDeadlySins', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Cola Cube</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.colaCube}
              onChange={(e) => handleUniqueColorChange('colaCube', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Healthy Breakfast</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.healthyBreakfast}
              onChange={(e) => handleUniqueColorChange('healthyBreakfast', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Unholy Commander</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.unholyCommander}
              onChange={(e) => handleUniqueColorChange('unholyCommander', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          {/* Testament Charms */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Gula's Testament of Gluttony</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.gulaTestamentOfGluttony}
              onChange={(e) => handleUniqueColorChange('gulaTestamentOfGluttony', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Luxuria's Testament of Lust</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.luxuriaTestamentOfLust}
              onChange={(e) => handleUniqueColorChange('luxuriaTestamentOfLust', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Avaritia's Testament of Greed</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.avaritiaTestamentOfGreed}
              onChange={(e) => handleUniqueColorChange('avaritiaTestamentOfGreed', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Ira's Testament of Wrath</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.iraTestamentOfWrath}
              onChange={(e) => handleUniqueColorChange('iraTestamentOfWrath', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Acedia's Testament of Sloth</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.acediaTestamentOfSloth}
              onChange={(e) => handleUniqueColorChange('acediaTestamentOfSloth', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Vanagloria's Testament of Vanity</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.vanagloriaTestamentOfVanity}
              onChange={(e) => handleUniqueColorChange('vanagloriaTestamentOfVanity', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Superbia's Testament of Hubris</label>
            <input
              type="color"
              value={config.charms.uniqueCharms.customColors.superbiaTestamentOfHubris}
              onChange={(e) => handleUniqueColorChange('superbiaTestamentOfHubris', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Regular Charm Colors */}
      <div>
        <h3 className="text-lg font-medium text-gray-100">Regular Charm Colors</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Normal</label>
            <input
              type="color"
              value={config.charms.customColors.normal}
              onChange={(e) => handleColorChange('normal', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Magic</label>
            <input
              type="color"
              value={config.charms.customColors.magic}
              onChange={(e) => handleColorChange('magic', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Rare</label>
            <input
              type="color"
              value={config.charms.customColors.rare}
              onChange={(e) => handleColorChange('rare', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Unique</label>
            <input
              type="color"
              value={config.charms.customColors.unique}
              onChange={(e) => handleColorChange('unique', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          {/* Sunder Charm Colors */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Sunder Magic</label>
            <input
              type="color"
              value={config.charms.customColors.sunderMagic}
              onChange={(e) => handleColorChange('sunderMagic', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Sunder Physical</label>
            <input
              type="color"
              value={config.charms.customColors.sunderPhysical}
              onChange={(e) => handleColorChange('sunderPhysical', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Sunder Cold</label>
            <input
              type="color"
              value={config.charms.customColors.sunderCold}
              onChange={(e) => handleColorChange('sunderCold', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Sunder Lightning</label>
            <input
              type="color"
              value={config.charms.customColors.sunderLightning}
              onChange={(e) => handleColorChange('sunderLightning', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Sunder Fire</label>
            <input
              type="color"
              value={config.charms.customColors.sunderFire}
              onChange={(e) => handleColorChange('sunderFire', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Sunder Poison</label>
            <input
              type="color"
              value={config.charms.customColors.sunderPoison}
              onChange={(e) => handleColorChange('sunderPoison', e.target.value)}
              className="h-8 w-14 rounded border-gray-700 bg-gray-800"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 