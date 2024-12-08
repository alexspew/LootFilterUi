export interface ColorMapping {
  hex: string
  d2r: string
  name: string
}

// Base color codes from mod.js
const BASE_COLORS = {
  white: '0',    // White/Default
  red: '1',      // Red
  green: '2',    // Green
  blue: '3',     // Blue
  gold: '4',     // Gold
  gray: '5',     // Gray
  black: '6',    // Black
  tan: '7',      // Tan
  orange: '8',   // Orange
  yellow: '9',   // Yellow
  darkGreen: ':', // Dark Green
  purple: ';',    // Purple
  brown: '/',     // Brown
  coral: '.'      // Coral
} as const

const COLOR_MAPPINGS: ColorMapping[] = [
  { hex: '#FFFFFF', d2r: 'ÿc0', name: 'White' },
  { hex: '#FF0000', d2r: 'ÿc1', name: 'Red' },
  { hex: '#32CD32', d2r: 'ÿc2', name: 'Green' },
  { hex: '#6495ED', d2r: 'ÿc3', name: 'Blue' },
  { hex: '#FFD700', d2r: 'ÿc4', name: 'Gold' },
  { hex: '#808080', d2r: 'ÿc5', name: 'Gray' },
  { hex: '#000000', d2r: 'ÿc6', name: 'Black' },
  { hex: '#D2B48C', d2r: 'ÿc7', name: 'Tan' },
  { hex: '#FFA500', d2r: 'ÿc8', name: 'Orange' },
  { hex: '#FFFF00', d2r: 'ÿc9', name: 'Yellow' },
  { hex: '#006400', d2r: 'ÿc:', name: 'Dark Green' },
  { hex: '#800080', d2r: 'ÿc;', name: 'Purple' },
  { hex: '#8B4513', d2r: 'ÿc/', name: 'Brown' },
  { hex: '#FF7F50', d2r: 'ÿc.', name: 'Coral' }
]

/**
 * Converts a hex color to RGB values
 * @param hex Hex color code (e.g. #FF0000)
 * @returns RGB values object
 */
export function hexToRgb(hex: string): { r: number, g: number, b: number } {
  // Normalize hex color (remove # and convert to uppercase)
  const normalizedHex = hex.replace('#', '').toUpperCase()
  const result = /^([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})$/i.exec(normalizedHex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}

/**
 * Converts RGB values to hex color
 * @param r Red value (0-255)
 * @param g Green value (0-255)
 * @param b Blue value (0-255)
 * @returns Hex color code (e.g. #FF0000)
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('').toUpperCase()
}

/**
 * Converts a hex color to D2R color code
 * @param hex Hex color code (e.g. #FF0000)
 * @returns D2R color code (e.g. 'ÿc1' for red)
 */
export const hexToD2RColor = (hex: string | undefined): string => {
  if (!hex) return 'ÿc0' // Default to white

  // Normalize hex color (remove # and convert to uppercase)
  const normalizedHex = hex.replace('#', '').toUpperCase()
  
  // Find exact match
  const exactMatch = COLOR_MAPPINGS.find(c => c.hex.replace('#', '').toUpperCase() === normalizedHex)
  if (exactMatch) return exactMatch.d2r

  // If no exact match, find closest color
  let closestColor = COLOR_MAPPINGS[0]
  let minDistance = Number.MAX_VALUE

  const { r: r1, g: g1, b: b1 } = hexToRgb(normalizedHex)

  COLOR_MAPPINGS.forEach(mapping => {
    const { r: r2, g: g2, b: b2 } = hexToRgb(mapping.hex)

    // Calculate color distance using simple RGB distance formula
    const distance = Math.sqrt(
      Math.pow(r2 - r1, 2) +
      Math.pow(g2 - g1, 2) +
      Math.pow(b2 - b1, 2)
    )

    if (distance < minDistance) {
      minDistance = distance
      closestColor = mapping
    }
  })

  return closestColor.d2r
}

/**
 * Get all available color mappings
 * @returns Array of color mappings with hex, D2R code, and name
 */
export const getAvailableColors = (): ColorMapping[] => {
  return COLOR_MAPPINGS
}

/**
 * Convert a color name to D2R color prefix
 * @param name Color name from BASE_COLORS
 * @returns D2R color prefix (e.g. 'ÿc1' for red)
 */
export function nameToD2RColor(name: keyof typeof BASE_COLORS): string {
  return `ÿc${BASE_COLORS[name]}`
}

/**
 * Converts a hex color to mod color prefix format (legacy format)
 * @param hex Hex color code (e.g. #FF0000)
 * @returns Mod color prefix (e.g. 'ÿc1' for red)
 * @deprecated Use hexToD2RColor instead
 */
export const hexToModPrefix = hexToD2RColor

/**
 * Converts a D2R color code to hex color
 * @param d2r D2R color code (e.g. 'ÿc1')
 * @returns Hex color code (e.g. '#FF0000')
 */
export const d2rToHexColor = (d2r: string | undefined): string => {
  if (!d2r) return '#FFFFFF' // Default to white
  
  // Extract the color code character
  const match = d2r.match(/ÿc([0-9a-fA-F;:\/\.])/)
  if (!match) return '#FFFFFF'
  
  // Find the matching color mapping
  const colorMapping = COLOR_MAPPINGS.find(c => c.d2r === `ÿc${match[1]}`)
  return colorMapping ? colorMapping.hex : '#FFFFFF'
}
 