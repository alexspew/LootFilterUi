import { hexToD2RColor } from '../utils/colorUtils'
import type { ModConfig, RuneChange, CharmChange } from '../types'

// Keep track of changes
const runeChanges: RuneChange[] = []
const charmChanges: CharmChange[] = []

interface ProfileConfig {
  ItemLevel: 'show' | 'hide'
  [key: string]: any
}

// Internal functions (used by other functions in this module)
/** @internal */
function trackRuneChanges(oldValue: string | null, newValue: string | null, key: string) {
  runeChanges.push({
    key,
    type: 'value',
    runeName: key,
    oldValue,
    newValue,
    timestamp: Date.now()
  })

  // Keep only last 100 changes
  if (runeChanges.length > 100) {
    runeChanges.splice(0, runeChanges.length - 100)
  }
}

/** @internal */
function trackCharmChanges(oldValue: string | boolean, newValue: string | boolean, charmType: string, type: string) {
  charmChanges.push({
    timestamp: Date.now(),
    type,
    charmType,
    oldValue,
    newValue
  })

  // Keep only last 100 changes
  if (charmChanges.length > 100) {
    charmChanges.splice(0, charmChanges.length - 100)
  }
}

/** @internal */
async function backupFile(path: string): Promise<string> {
  const content = await window.fileSystem.readFile(path)
  console.log(`Backed up file: ${path}`)
  return content
}

/** @internal */
async function restoreFromBackup(path: string, content: string): Promise<boolean> {
  try {
    await window.fileSystem.writeFile(path, content)
    return true
  } catch (error) {
    console.error(`Failed to restore backup: ${path}`, error)
    return false
  }
}

/** @internal */
async function saveDisplaySettings(config: ModConfig): Promise<void> {
  const profilePath = 'data/global/ui/layouts/_profilehd.json'
  const backup = await backupFile(profilePath)
  
  try {
    const profile = JSON.parse(backup) as ProfileConfig
    const oldValue = profile.ItemLevel
    profile.ItemLevel = config.display.itemLevel as 'show' | 'hide'
    
    if (oldValue !== profile.ItemLevel) {
      trackRuneChanges(oldValue, profile.ItemLevel, 'ItemLevel')
    }
    
    await window.fileSystem.writeFile(profilePath, JSON.stringify(profile, null, 2))
    console.log('Display settings saved')
  } catch (error) {
    await restoreFromBackup(profilePath, backup)
    throw error
  }
}

// Exported functions
export async function saveModConfig(config: ModConfig): Promise<void> {
  const configPath = 'config.json'
  const backup = await backupFile(configPath)
  
  try {
    const oldConfig = JSON.parse(backup) as ModConfig
    
    // Track rune changes
    Object.entries(config.RunesCustomColors).forEach(([key, value]) => {
      const oldValue = oldConfig.RunesCustomColors?.[key as keyof ModConfig['RunesCustomColors']]
      if (oldValue !== value) {
        trackRuneChanges(oldValue, value, key)
      }
    })
    
    // Track display changes
    if (config.display.itemLevel !== oldConfig.display?.itemLevel) {
      trackCharmChanges(
        oldConfig.display?.itemLevel || 'hide',
        config.display.itemLevel,
        'ItemLevel',
        'visibility'
      )
    }
    
    await window.fileSystem.writeFile(configPath, JSON.stringify(config, null, 2))
    await saveDisplaySettings(config)
  } catch (error) {
    await restoreFromBackup(configPath, backup)
    throw error
  }
}

export function getRuneChangeHistory(): RuneChange[] {
  return [...runeChanges].reverse()
}

export function getCharmChangeHistory(): CharmChange[] {
  return [...charmChanges].reverse()
}

export function applyGemFormatting(name: string, color: string, pattern: string): string {
  const formattedName = pattern ? pattern.replace('%NAME%', name) : name
  return `${hexToD2RColor(color)}${formattedName}`
}

export function applyCharmFormatting(name: string, color: string, pattern: string): string {
  const formattedName = pattern ? pattern.replace('%NAME%', `${name} Charm`) : `${name} Charm`
  return `${hexToD2RColor(color)}${formattedName}`
}