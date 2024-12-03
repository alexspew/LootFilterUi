export interface RuneChange {
  key: string
  type: string
  runeName: string
  oldValue: string | boolean | null
  newValue: string | boolean | null
  timestamp: number
}

export interface CharmChange {
  timestamp: number
  type: string
  charmType: string
  oldValue: string | boolean
  newValue: string | boolean
}

export interface RuneValidation {
  isValid: boolean
  error?: string
}

export interface ModConfig {
  runes: {
    showLowRunes: boolean
    showMidRunes: boolean
    showHighRunes: boolean
    highlightPattern: string
    highlightColorAlt: string
    patterns: {
      lowRunes: string
      midRunes: string
      highRunes: string
    }
    padding: {
      lowRunes: number
      midRunes: number
      highRunes: number
    }
    shortNames: {
      lowRunes: boolean
      midRunes: boolean
      highRunes: boolean
    }
    customColors: Record<string, string>
  }
  RunesCustomColors: {
    lowRunes: string
    midRunes: string
    highRunes: string
  }
  gems: {
    showChipped: boolean
    showFlawed: boolean
    showNormal: boolean
    showFlawless: boolean
    showPerfect: boolean
    highlightPattern: string
    customColors: {
      amethyst: string
      diamond: string
      emerald: string
      ruby: string
      sapphire: string
      topaz: string
      skull: string
    }
  }
  charms: {
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
      customColors: {
        blankTalent: string
        sevenDeadlySins: string
        annihilus: string
        torch: string
        gheeds: string
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
  display: {
    itemLevel: string
    itemQuality: string
    bigTooltips: boolean
    lightPillars: boolean
    dropSounds: boolean
  }
  debug: {
    enableRuneDebugging: boolean
    enableCharmDebugging: boolean
  }
} 