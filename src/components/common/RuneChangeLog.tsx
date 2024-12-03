import { useEffect, useState } from 'react'
import { getRuneChangeHistory } from '../../services/modConfig'
import type { RuneChange } from '../../types'

export default function RuneChangeLog() {
  const [changes, setChanges] = useState<RuneChange[]>([])

  useEffect(() => {
    // Update changes initially
    setChanges(getRuneChangeHistory())

    // Set up interval to check for new changes
    const interval = setInterval(() => {
      setChanges(getRuneChangeHistory())
    }, 1000) // Check every second

    return () => clearInterval(interval)
  }, [])

  if (changes.length === 0) {
    return null
  }

  return (
    <div className="mt-4 space-y-2 rounded-lg bg-gray-800 p-4">
      <h3 className="text-lg font-medium text-gray-100">Recent Rune Changes</h3>
      <div className="max-h-60 overflow-y-auto">
        <table className="table-auto w-full text-left">
          <tbody>
            {changes.map((change) => (
              <tr key={change.timestamp} className="border-t border-gray-700">
                <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">
                  {new Date(change.timestamp).toLocaleTimeString()}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">
                  {change.type}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">
                  {change.runeName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-300">
                  {typeof change.oldValue === 'boolean' 
                    ? `${change.oldValue} → ${change.newValue}`
                    : `"${change.oldValue}" → "${change.newValue}"`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 