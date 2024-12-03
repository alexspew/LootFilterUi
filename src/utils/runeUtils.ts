import { ModConfig } from '../types'
import { RuneConstants } from '../constants/runeConstants'
import { hexToD2RColor } from './colorUtils'

export const getRuneTier = (runeName: string): 'lowRunes' | 'midRunes' | 'highRunes' => {
  const rune = RuneConstants.tierLow.find(r => r.name === runeName) ||
               RuneConstants.tierLowMid.find(r => r.name === runeName) ||
               RuneConstants.tierMid.find(r => r.name === runeName) ||
               RuneConstants.tierHigh.find(r => r.name === runeName)

  if (!rune) return 'lowRunes'

  if (RuneConstants.tierHigh.some(r => r.name === runeName)) {
    return 'highRunes'
  } else if (RuneConstants.tierMid.some(r => r.name === runeName) || 
             RuneConstants.tierLowMid.some(r => r.name === runeName)) {
    return 'midRunes'
  } else {
    return 'lowRunes'
  }
}

export const formatRuneName = (runeName: string, config: ModConfig): string => {
  const tier = getRuneTier(runeName)
  const { patterns, padding, customColors } = config.runes
  
  const pattern = patterns[tier]
  const paddingSpaces = ' '.repeat(padding[tier])
  const colorCode = hexToD2RColor(customColors[tier])

  if (!pattern) {
    return `${colorCode}${runeName} Rune`
  }

  return `${colorCode}${pattern}${paddingSpaces}${runeName} Rune${paddingSpaces}${pattern}`
}

export const shouldShowRune = (runeName: string, config: ModConfig): boolean => {
  const tier = getRuneTier(runeName)
  
  switch (tier) {
    case 'lowRunes':
      return config.runes.showLowRunes
    case 'midRunes':
      return config.runes.showMidRunes
    case 'highRunes':
      return config.runes.showHighRunes
    default:
      return true
  }
} 