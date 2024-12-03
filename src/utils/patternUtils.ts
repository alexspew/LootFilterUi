export interface PatternPreset {
  name: string
  pattern: string
  padding: number
  description: string
}

export const PATTERN_PRESETS: PatternPreset[] = [
  // Low Rune Patterns
  { name: 'None', pattern: '', padding: 0, description: 'No highlighting' },
  { name: 'Simple', pattern: '*', padding: 1, description: 'Single star' },
  { name: 'Dots', pattern: '...', padding: 1, description: 'Three dots' },
  // Mid Rune Patterns
  { name: 'Stars', pattern: '*****', padding: 3, description: 'Five stars' },
  { name: 'Arrows', pattern: '>>>>>', padding: 3, description: 'Five arrows' },
  { name: 'Diamonds', pattern: '♦♦♦', padding: 3, description: 'Three diamonds' },
  // High Rune Patterns
  { name: 'Double Stars', pattern: '**********', padding: 5, description: 'Ten stars' },
  { name: 'Triple Stars', pattern: '********** ********** **********', padding: 5, description: 'Three sets of stars' },
  { name: 'Fancy', pattern: '░▒▓█▓▒░', padding: 5, description: 'Gradient blocks' }
]

export const validatePattern = (pattern: string): boolean => {
  if (pattern.length > 30) {
    return false
  }

  // Check for invalid characters (only allow ASCII printable characters)
  if (!/^[\x20-\x7E]*$/.test(pattern)) {
    return false
  }

  return true
}

export const validatePadding = (padding: number): boolean => {
  return padding >= 0 && padding <= 10
}

export const getDefaultPattern = (tier: 'lowRunes' | 'midRunes' | 'highRunes'): PatternPreset => {
  switch (tier) {
    case 'lowRunes':
      return PATTERN_PRESETS[0]
    case 'midRunes':
      return PATTERN_PRESETS[3]
    case 'highRunes':
      return PATTERN_PRESETS[6]
    default:
      return PATTERN_PRESETS[0]
  }
}

export interface PatternExport {
  version: string
  patterns: {
    lowRunes: {
      pattern: string
      padding: number
      color: string
    }
    midRunes: {
      pattern: string
      padding: number
      color: string
    }
    highRunes: {
      pattern: string
      padding: number
      color: string
    }
  }
}

export const exportPatterns = (config: any): string => {
  const exportData: PatternExport = {
    version: '1.0.0',
    patterns: {
      lowRunes: {
        pattern: config.runes.patterns.lowRunes,
        padding: config.runes.padding.lowRunes,
        color: config.runes.customColors.lowRunes
      },
      midRunes: {
        pattern: config.runes.patterns.midRunes,
        padding: config.runes.padding.midRunes,
        color: config.runes.customColors.midRunes
      },
      highRunes: {
        pattern: config.runes.patterns.highRunes,
        padding: config.runes.padding.highRunes,
        color: config.runes.customColors.highRunes
      }
    }
  }

  return JSON.stringify(exportData, null, 2)
}

export const importPatterns = (jsonString: string): { isValid: boolean; data?: PatternExport; error?: string } => {
  try {
    const data = JSON.parse(jsonString)

    // Validate version
    if (!data.version || data.version !== '1.0.0') {
      return { isValid: false, error: 'Invalid or unsupported version' }
    }

    // Validate structure
    if (!data.patterns || !data.patterns.lowRunes || !data.patterns.midRunes || !data.patterns.highRunes) {
      return { isValid: false, error: 'Invalid pattern structure' }
    }

    // Validate each pattern
    const tiers = ['lowRunes', 'midRunes', 'highRunes'] as const
    for (const tier of tiers) {
      const pattern = data.patterns[tier]
      
      // Check required fields
      if (!pattern.pattern || typeof pattern.padding !== 'number' || !pattern.color) {
        return { isValid: false, error: `Invalid ${tier} pattern data` }
      }

      // Validate pattern
      const patternValidation = validatePattern(pattern.pattern)
      if (!patternValidation) {
        return { isValid: false, error: `Invalid ${tier} pattern` }
      }

      // Validate padding
      const paddingValidation = validatePadding(pattern.padding)
      if (!paddingValidation) {
        return { isValid: false, error: `Invalid ${tier} padding` }
      }

      // Validate color (basic hex validation)
      if (!/^#[0-9A-Fa-f]{6}$/.test(pattern.color)) {
        return { isValid: false, error: `Invalid ${tier} color format` }
      }
    }

    return { isValid: true, data }
  } catch (error) {
    return { isValid: false, error: 'Invalid JSON format' }
  }
} 