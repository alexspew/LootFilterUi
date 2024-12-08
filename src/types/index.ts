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

export interface RunePattern {
  prefix: string
  suffix: string
}

export interface ModConfig {
  runes: {
    highlightPattern: string
    highlightColorAlt: string
    patterns: {
      lowRunes: RunePattern
      midRunes: RunePattern
      highRunes: RunePattern
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
    highlightPattern: string
    uniqueCharms: {
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