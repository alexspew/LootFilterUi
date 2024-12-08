import { create } from 'zustand'
import type { ModConfig } from '../types'
import { hexToD2RColor, d2rToHexColor } from '../utils/colorUtils'

const LOCAL_CONFIG_PATH = 'local_config.json'
const ITEM_NAMES_PATH = 'data/local/lng/strings/item-names.json'

interface LocalConfig {
  modPath: string | null
}

interface ItemNameEntry {
  id: number
  Key: string
  enUS: string
  [key: string]: any
}

async function loadItemNames(modPath: string): Promise<ItemNameEntry[]> {
  try {
    const fullPath = `${modPath}/${ITEM_NAMES_PATH}`
    const exists = await window.fileSystem.fileExists(fullPath)
    if (!exists) {
      console.warn('item-names.json not found at:', fullPath)
      return []
    }
    const content = await window.fileSystem.readFile(fullPath)
    return JSON.parse(content)
  } catch (error) {
    console.error('Failed to load item-names.json:', error)
    return []
  }
}

async function updateCharmColors(modPath: string, currentConfig: ModConfig): Promise<Partial<ModConfig>> {
  const itemNames = await loadItemNames(modPath)
  if (!itemNames.length) {
    console.warn('No items loaded from item-names.json')
    return currentConfig
  }

  // Default colors
  const defaultUniqueColor = '#FFD700' // Gold
  const defaultModSpecificColor = '#808080' // Gray

  // Map of charm names to their config keys
  type CharmConfigKey = keyof ModConfig['charms']['uniqueCharms']['customColors']

  const charmMappings: Record<string, CharmConfigKey> = {
    'Annihilus': 'annihilus',
    'Hellfire Torch': 'torch',
    "Gheed's Fortune": 'gheeds',
    "Gula's Testament of Gluttony": 'gulaTestamentOfGluttony',
    "Luxuria's Testament of Lust": 'luxuriaTestamentOfLust',
    "Avaritia's Testament of Greed": 'avaritiaTestamentOfGreed',
    "Ira's Testament of Wrath": 'iraTestamentOfWrath',
    "Acedia's Testament of Sloth": 'acediaTestamentOfSloth',
    "Vanagloria's Testament of Vanity": 'vanagloriaTestamentOfVanity',
    "Superbia's Testament of Hubris": 'superbiaTestamentOfHubris',
    'Blank Talent': 'blankTalent',
    'Seven Deadly Sins': 'sevenDeadlySins',
    'Cola Cube': 'colaCube',
    'Healthy Breakfast': 'healthyBreakfast',
    'Unholy Commander': 'unholyCommander'
  } as const

  const newCustomColors = { ...currentConfig.charms.uniqueCharms.customColors }

  // Update colors based on item-names.json
  for (const [charmName, configKey] of Object.entries(charmMappings)) {
    const item = itemNames.find(entry => entry.enUS.includes(charmName))
    if (item) {
      // Check if the item name contains a color code
      const colorMatch = item.enUS.match(/ÿc([0-9a-fA-F;:\/\.])/)
      if (colorMatch) {
        // Convert D2R color code to hex for the UI
        const d2rColor = `ÿc${colorMatch[1]}`
        const hexColor = d2rToHexColor(d2rColor)
        newCustomColors[configKey] = hexColor
      } else {
        // Use default colors based on whether it's a mod-specific charm
        newCustomColors[configKey] = ['blankTalent', 'sevenDeadlySins', 'colaCube', 'healthyBreakfast', 'unholyCommander'].includes(configKey)
          ? defaultModSpecificColor
          : defaultUniqueColor
      }
    }
  }

  return {
    ...currentConfig,
    charms: {
      ...currentConfig.charms,
      uniqueCharms: {
        ...currentConfig.charms.uniqueCharms,
        customColors: newCustomColors
      }
    }
  }
}

async function loadLocalConfig(): Promise<LocalConfig> {
  try {
    const exists = await window.fileSystem.fileExists(LOCAL_CONFIG_PATH)
    if (!exists) {
      return { modPath: null }
    }
    const configStr = await window.fileSystem.readFile(LOCAL_CONFIG_PATH)
    return JSON.parse(configStr)
  } catch (error) {
    console.error('Failed to load local config:', error)
    return { modPath: null }
  }
}

async function saveLocalConfig(config: LocalConfig): Promise<void> {
  try {
    await window.fileSystem.writeFile(LOCAL_CONFIG_PATH, JSON.stringify(config, null, 2))
  } catch (error) {
    console.error('Failed to save local config:', error)
  }
}

export interface FilterStore extends ModConfig {
  modPath: string | null
  hasUnsavedChanges: boolean
  setModPath: (path: string | null) => void
  exportConfig: () => string
  importConfig: (configStr: string) => void
  resetConfig: () => void
  saveChanges: () => Promise<void>
  setRuneConfig: (config: Partial<ModConfig['runes']> | { RunesCustomColors: Partial<ModConfig['RunesCustomColors']> }) => void
  setGemConfig: (config: Partial<ModConfig['gems']>) => void
  setCharmConfig: (config: Partial<ModConfig['charms']>) => void
  setDisplayConfig: (config: Partial<ModConfig['display']>) => void
  setDebug: (config: Partial<ModConfig['debug']>) => void
}

interface CharmConfig {
  showSmall: boolean
  showLarge: boolean
  showGrand: boolean
  highlightUnique: boolean
  highlightPattern: string
  uniqueCharms: {
    showBlankTalent: boolean
    showSevenDeadlySins: boolean
    showAnnihilus: boolean
    showTorch: boolean
    showGheeds: boolean
    showColaCube: boolean
    showHealthyBreakfast: boolean
    showUnholyCommander: boolean
    showGulaTestamentOfGluttony: boolean
    showLuxuriaTestamentOfLust: boolean
    showAvaritiaTestamentOfGreed: boolean
    showIraTestamentOfWrath: boolean
    showAcediaTestamentOfSloth: boolean
    showVanagloriaTestamentOfVanity: boolean
    showSuperbiaTestamentOfHubris: boolean
    customColors: {
      blankTalent: string
      sevenDeadlySins: string
      annihilus: string
      torch: string
      gheeds: string
      colaCube: string
      healthyBreakfast: string
      unholyCommander: string
      gulaTestamentOfGluttony: string
      luxuriaTestamentOfLust: string
      avaritiaTestamentOfGreed: string
      iraTestamentOfWrath: string
      acediaTestamentOfSloth: string
      vanagloriaTestamentOfVanity: string
      superbiaTestamentOfHubris: string
    }
  }
  useSunderAltPattern: boolean
  customColors: {
    normal: string
    magic: string
    rare: string
    unique: string
    sunderMagic: string
    sunderPhysical: string
    sunderCold: string
    sunderLightning: string
    sunderFire: string
    sunderPoison: string
  }
}

const DEFAULT_CONFIG: ModConfig = {
  runes: {
    highlightPattern: '',
    highlightColorAlt: '',
    patterns: {
      lowRunes: '',
      midRunes: '',
      highRunes: ''
    },
    padding: {
      lowRunes: 0,
      midRunes: 0,
      highRunes: 0
    },
    shortNames: {
      lowRunes: false,
      midRunes: false,
      highRunes: false
    },
    customColors: {}
  },
  RunesCustomColors: {
    lowRunes: '#808080',
    midRunes: '#C0C0C0',
    highRunes: '#FFD700'
  },
  gems: {
    showChipped: true,
    showFlawed: true,
    showNormal: true,
    showFlawless: true,
    showPerfect: true,
    highlightPattern: '',
    customColors: {
      amethyst: '#9966CC',
      diamond: '#B9F2FF',
      emerald: '#50C878',
      ruby: '#E0115F',
      sapphire: '#0F52BA',
      topaz: '#FFC87C',
      skull: '#36454F'
    }
  },
  charms: {
    highlightPattern: '',
    uniqueCharms: {
      customColors: {
        blankTalent: '#808080',      // Gray (mod-specific)
        sevenDeadlySins: '#808080',  // Gray (mod-specific)
        annihilus: '#FFD700',        // Gold (standard unique)
        torch: '#FFD700',            // Gold (standard unique)
        gheeds: '#FFD700',           // Gold (standard unique)
        colaCube: '#808080',         // Gray (mod-specific)
        healthyBreakfast: '#808080', // Gray (mod-specific)
        unholyCommander: '#808080',  // Gray (mod-specific)
        // Testament charms use gold color
        gulaTestamentOfGluttony: '#FFD700',     // Gold (standard unique)
        luxuriaTestamentOfLust: '#FFD700',      // Gold (standard unique)
        avaritiaTestamentOfGreed: '#FFD700',    // Gold (standard unique)
        iraTestamentOfWrath: '#FFD700',         // Gold (standard unique)
        acediaTestamentOfSloth: '#FFD700',      // Gold (standard unique)
        vanagloriaTestamentOfVanity: '#FFD700', // Gold (standard unique)
        superbiaTestamentOfHubris: '#FFD700'    // Gold (standard unique)
      }
    },
    customColors: {
      normal: '#FFFFFF',
      magic: '#0000FF',
      rare: '#FFFF00',
      unique: '#FFA500',
      sunderMagic: '#8A2BE2',
      sunderPhysical: '#A0522D',
      sunderCold: '#00FFFF',
      sunderLightning: '#FFD700',
      sunderFire: '#FF4500',
      sunderPoison: '#00FF00'
    }
  },
  display: {
    itemLevel: 'show',
    itemQuality: 'show',
    bigTooltips: true,
    lightPillars: true,
    dropSounds: true
  },
  debug: {
    enableRuneDebugging: false,
    enableCharmDebugging: false
  }
}

export const useStore = create<FilterStore>((set, get) => ({
  ...DEFAULT_CONFIG,
  modPath: null,
  hasUnsavedChanges: false,
  
  init: async () => {
    const localConfig = await loadLocalConfig()
    set({ modPath: localConfig.modPath })
    
    if (localConfig.modPath) {
      // Update charm colors based on item-names.json
      const updatedConfig = await updateCharmColors(localConfig.modPath, get())
      set({ ...updatedConfig })
    }
  },

  setModPath: async (path: string | null) => {
    set({ modPath: path })
    await saveLocalConfig({ modPath: path })
    
    if (path) {
      // Update charm colors based on item-names.json
      const updatedConfig = await updateCharmColors(path, get())
      set({ ...updatedConfig, hasUnsavedChanges: true })
    }
  },

  exportConfig: () => {
    const { hasUnsavedChanges, modPath, exportConfig, importConfig, resetConfig, saveChanges, setRuneConfig, setGemConfig, setCharmConfig, setDisplayConfig, setDebug, setModPath, ...config } = get()
    return JSON.stringify(config, null, 2)
  },
  importConfig: (configStr) => {
    try {
      const config = JSON.parse(configStr)
      set({ ...DEFAULT_CONFIG, ...config, hasUnsavedChanges: true })
    } catch (e) {
      console.error('Failed to import config:', e)
    }
  },
  resetConfig: () => set({ ...DEFAULT_CONFIG, hasUnsavedChanges: true }),
  saveChanges: async () => {
    try {
      const state = get()
      if (!state.modPath) {
        throw new Error('Mod path not set')
      }

      // Save rune changes
      const runeFilePath = `${state.modPath}/data/local/lng/strings/item-runes.json`
      const runeFile = await window.fileSystem.readFile(runeFilePath)
      const runeData = JSON.parse(runeFile)

      // Update each rune's enUS value based on its tier
      runeData.forEach((rune: any) => {
        const key = rune.Key as string
        if (!key.match(/^r\d+$/)) return // Skip non-rune entries

        // Get rune number from key (e.g., "r01" -> 1)
        const runeNum = parseInt(key.substring(1))
        let tier: 'lowRunes' | 'midRunes' | 'highRunes'
        
        // Determine tier based on rune number
        if (runeNum <= 14 && runeNum !== 8) {
          tier = 'lowRunes' // El through Dol (excluding Ral)
        } else if ((runeNum >= 15 && runeNum <= 19) || runeNum === 8) {
          tier = 'midRunes' // Hel through Fal + Ral
        } else if (runeNum >= 20 && runeNum <= 25) {
          tier = 'midRunes' // Lem through Gul
        } else {
          tier = 'highRunes' // Vex through Zod
        }

        // Get pattern, padding and color for this tier
        const pattern = state.runes.patterns[tier]
        const colorCode = hexToD2RColor(state.RunesCustomColors[tier])
        const useShortName = state.runes.shortNames[tier]

        // Get rune name from the "L" version of the key
        const shortNameEntry = runeData.find((r: any) => r.Key === `${key}L`)
        const runeName = shortNameEntry?.enUS || ''

        // Format the rune name
        const displayName = useShortName ? runeName : `${runeName} Rune`
        const prefix = pattern?.prefix || ''
        const suffix = pattern?.suffix || ''
        rune.enUS = `${prefix}${colorCode}${displayName}${suffix}`
      })

      // Save with proper formatting
      await window.fileSystem.writeFile(runeFilePath, JSON.stringify(runeData, null, 2))

      // Save charm changes
      const charmFilePath = `${state.modPath}/data/local/lng/strings/item-names.json`
      const charmFile = await window.fileSystem.readFile(charmFilePath)
      const charmData = JSON.parse(charmFile)

      // Update charm display settings
      charmData.forEach((charm: any) => {
        const key = charm.Key as string
        const name = charm.enUS as string
        if (!key || !name) return

        // Handle unique charms - exact name matches
        if (state.charms.uniqueCharms) {
          const uniqueConfig = state.charms.uniqueCharms
          const uniqueMatches: Record<string, { show: boolean, color: string }> = {
            'Annihilus': { show: uniqueConfig.showAnnihilus, color: uniqueConfig.customColors.annihilus },
            'Hellfire Torch': { show: uniqueConfig.showTorch, color: uniqueConfig.customColors.torch },
            'Gheed\'s Fortune': { show: uniqueConfig.showGheeds, color: uniqueConfig.customColors.gheeds },
            'Blank Talent': { show: uniqueConfig.showBlankTalent, color: uniqueConfig.customColors.blankTalent },
            'Seven Deadly Sins': { show: uniqueConfig.showSevenDeadlySins, color: uniqueConfig.customColors.sevenDeadlySins },
            'Cola Cube': { show: uniqueConfig.showColaCube, color: uniqueConfig.customColors.colaCube },
            'Healthy Breakfast': { show: uniqueConfig.showHealthyBreakfast, color: uniqueConfig.customColors.healthyBreakfast },
            'Unholy Commander': { show: uniqueConfig.showUnholyCommander, color: uniqueConfig.customColors.unholyCommander },
            'Gula\'s Testament of Gluttony': { show: uniqueConfig.showGulaTestamentOfGluttony, color: uniqueConfig.customColors.gulaTestamentOfGluttony },
            'Luxuria\'s Testament of Lust': { show: uniqueConfig.showLuxuriaTestamentOfLust, color: uniqueConfig.customColors.luxuriaTestamentOfLust },
            'Avaritia\'s Testament of Greed': { show: uniqueConfig.showAvaritiaTestamentOfGreed, color: uniqueConfig.customColors.avaritiaTestamentOfGreed },
            'Ira\'s Testament of Wrath': { show: uniqueConfig.showIraTestamentOfWrath, color: uniqueConfig.customColors.iraTestamentOfWrath },
            'Acedia\'s Testament of Sloth': { show: uniqueConfig.showAcediaTestamentOfSloth, color: uniqueConfig.customColors.acediaTestamentOfSloth },
            'Vanagloria\'s Testament of Vanity': { show: uniqueConfig.showVanagloriaTestamentOfVanity, color: uniqueConfig.customColors.vanagloriaTestamentOfVanity },
            'Superbia\'s Testament of Hubris': { show: uniqueConfig.showSuperbiaTestamentOfHubris, color: uniqueConfig.customColors.superbiaTestamentOfHubris }
          }

          // Remove any existing color codes before matching
          const cleanName = name.replace(/ÿc[0-9a-fA-F;:\/\.]/g, '')
          const config = uniqueMatches[cleanName]
          if (config && config.show) {
            let formattedName = cleanName
            
            if (state.charms.highlightPattern) {
              formattedName = `${state.charms.highlightPattern}${formattedName}${state.charms.highlightPattern}`
            }
            
            // Only apply color if a custom color is set
            if (config.color) {
              // If it's already a D2R color code, use it directly
              const colorCode = config.color.startsWith('ÿc') ? config.color : hexToD2RColor(config.color)
              charm.enUS = `${colorCode}${formattedName}`
            } else {
              // Keep original name with its color codes
              charm.enUS = name
            }
            return // Skip regular charm processing
          }
        }

        // Handle regular charms - exact key matches
        const charmTypes: Record<string, boolean> = {
          'cm1s': state.charms.showSmall,  // Small Charm
          'cm2s': state.charms.showLarge,  // Large Charm
          'cm3s': state.charms.showGrand   // Grand Charm
        }

        const show = charmTypes[key]
        if (show) {
          // Remove any existing color codes
          const cleanName = name.replace(/ÿ[a-zA-Z0-9]/, '')
          let formattedName = cleanName
          
          if (state.charms.highlightPattern) {
            formattedName = `${state.charms.highlightPattern}${formattedName}${state.charms.highlightPattern}`
          }

          // Apply charm color based on type
          const colorCode = hexToD2RColor(state.charms.customColors.normal)
          formattedName = `${colorCode}${formattedName}`

          charm.enUS = formattedName
        }
      })

      // Save with proper formatting
      await window.fileSystem.writeFile(charmFilePath, JSON.stringify(charmData, null, 2))

      set({ hasUnsavedChanges: false })
      console.log('Changes saved successfully')
    } catch (error) {
      console.error('Failed to save changes:', error)
      throw error
    }
  },
  setRuneConfig: (config) =>
    set((state) => {
      // If RunesCustomColors is being updated, update it at the root level
      if ('RunesCustomColors' in config) {
        return {
          ...state,
          RunesCustomColors: { ...state.RunesCustomColors, ...config.RunesCustomColors },
          hasUnsavedChanges: true
        }
      }
      // Otherwise, update runes config as before
      return {
        ...state,
        runes: { ...state.runes, ...config },
        hasUnsavedChanges: true
      }
    }),
  setGemConfig: (config) =>
    set((state) => ({
      ...state,
      gems: { ...state.gems, ...config },
      hasUnsavedChanges: true
    })),
  setCharmConfig: async (charmConfig) => {
    const newConfig = { ...get().charms, ...charmConfig }
    set({ 
      charms: newConfig,
      hasUnsavedChanges: true
    })
  },
  setDisplayConfig: (config) =>
    set((state) => ({
      ...state,
      display: { ...state.display, ...config },
      hasUnsavedChanges: true
    })),
  setDebug: (config) =>
    set((state) => ({
      ...state,
      debug: { ...state.debug, ...config },
      hasUnsavedChanges: true
    }))
}))

// Alias for backward compatibility
export const useFilterStore = useStore 