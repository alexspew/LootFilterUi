import { create } from 'zustand'
import type { ModConfig } from '../types'
import { hexToD2RColor } from '../utils/colorUtils'

declare global {
  interface Window {
    fileSystem: {
      writeFile: (path: string, data: string) => Promise<void>
      readFile: (path: string) => Promise<string>
    }
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

const DEFAULT_CONFIG: ModConfig = {
  runes: {
    showLowRunes: true,
    showMidRunes: true,
    showHighRunes: true,
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
    showSmall: true,
    showLarge: true,
    showGrand: true,
    highlightUnique: true,
    highlightPattern: '',
    uniqueCharms: {
      showBlankTalent: true,
      showSevenDeadlySins: true,
      showAnnihilus: true,
      showTorch: true,
      showGheeds: true,
      customColors: {
        blankTalent: '#4B0082',
        sevenDeadlySins: '#800000',
        annihilus: '#FFD700',
        torch: '#FF4500',
        gheeds: '#9370DB'
      }
    },
    useSunderAltPattern: true,
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
    enableCharmDebugging: true
  }
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  ...DEFAULT_CONFIG,
  modPath: null,
  hasUnsavedChanges: false,
  setModPath: (path) => set({ modPath: path }),
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
        const pattern = state.runes.patterns[tier] || ''
        const padding = ' '.repeat(state.runes.padding[tier] || 0)
        const colorCode = hexToD2RColor(state.RunesCustomColors[tier])
        const useShortName = state.runes.shortNames[tier]

        // Get rune name from the "L" version of the key
        const shortNameEntry = runeData.find((r: any) => r.Key === `${key}L`)
        const runeName = shortNameEntry?.enUS || ''

        // Format the rune name
        const displayName = useShortName ? runeName : `${runeName} Rune`

        // Build the final string
        let formattedName = displayName
        if (pattern) {
          formattedName = `${pattern}${padding}${formattedName}${padding}${pattern}`
        }

        // Add color code without reset code
        rune.enUS = `${colorCode}${formattedName}`
      })

      await window.fileSystem.writeFile(runeFilePath, JSON.stringify(runeData, null, 2))

      // Save other changes as needed...

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
  setCharmConfig: (config) =>
    set((state) => ({
      ...state,
      charms: {
        ...state.charms,
        ...config,
        uniqueCharms: {
          ...state.charms.uniqueCharms,
          customColors: {
            ...(state.charms.uniqueCharms?.customColors || {}),
            ...config.uniqueCharms?.customColors
          }
        }
      },
      hasUnsavedChanges: true
    })),
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