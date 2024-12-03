export interface Rune {
  name: string
  level: number
  tier: 'low' | 'lowMid' | 'mid' | 'high'
}

export const RuneConstants = {
  tierLow: [
    { name: 'El', level: 11, tier: 'low' },
    { name: 'Eld', level: 11, tier: 'low' },
    { name: 'Tir', level: 13, tier: 'low' },
    { name: 'Nef', level: 13, tier: 'low' },
    { name: 'Eth', level: 15, tier: 'low' },
  ] as Rune[],
  
  tierLowMid: [
    { name: 'Ith', level: 15, tier: 'lowMid' },
    { name: 'Tal', level: 17, tier: 'lowMid' },
    { name: 'Ral', level: 19, tier: 'lowMid' },
    { name: 'Ort', level: 21, tier: 'lowMid' },
    { name: 'Thul', level: 23, tier: 'lowMid' },
  ] as Rune[],
  
  tierMid: [
    { name: 'Amn', level: 25, tier: 'mid' },
    { name: 'Sol', level: 27, tier: 'mid' },
    { name: 'Shael', level: 29, tier: 'mid' },
    { name: 'Dol', level: 31, tier: 'mid' },
    { name: 'Hel', level: 33, tier: 'mid' },
    { name: 'Io', level: 35, tier: 'mid' },
    { name: 'Lum', level: 37, tier: 'mid' },
    { name: 'Ko', level: 39, tier: 'mid' },
  ] as Rune[],
  
  tierHigh: [
    { name: 'Fal', level: 41, tier: 'high' },
    { name: 'Lem', level: 43, tier: 'high' },
    { name: 'Pul', level: 45, tier: 'high' },
    { name: 'Um', level: 47, tier: 'high' },
    { name: 'Mal', level: 49, tier: 'high' },
    { name: 'Ist', level: 51, tier: 'high' },
    { name: 'Gul', level: 53, tier: 'high' },
    { name: 'Vex', level: 55, tier: 'high' },
    { name: 'Ohm', level: 57, tier: 'high' },
    { name: 'Lo', level: 59, tier: 'high' },
    { name: 'Sur', level: 61, tier: 'high' },
    { name: 'Ber', level: 63, tier: 'high' },
    { name: 'Jah', level: 65, tier: 'high' },
    { name: 'Cham', level: 67, tier: 'high' },
    { name: 'Zod', level: 69, tier: 'high' },
  ] as Rune[],
} 