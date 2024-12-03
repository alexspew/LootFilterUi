import { useEffect } from 'react'
import { useFilterStore } from '../store/config'

/**
 * Hook to handle config synchronization and unsaved changes
 */
export function useConfigSync() {
  const { hasUnsavedChanges, saveChanges } = useFilterStore()

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  useEffect(() => {
    if (hasUnsavedChanges) {
      saveChanges().catch(console.error)
    }
  }, [hasUnsavedChanges, saveChanges])
} 