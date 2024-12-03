import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ModPathState {
  modPath: string | null
  setModPath: (path: string) => void
  isPathSet: boolean
}

export const useModPathStore = create<ModPathState>()(
  persist(
    (set) => ({
      modPath: null,
      isPathSet: false,
      setModPath: (path) => set({ modPath: path, isPathSet: true }),
    }),
    {
      name: 'mod-path-storage',
    }
  )
) 