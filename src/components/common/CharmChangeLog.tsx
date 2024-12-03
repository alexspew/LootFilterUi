import { useEffect, useState } from 'react'
import { getCharmChangeHistory } from '../../services/modConfig'
import { CharmChange } from '../../types'

export default function CharmChangeLog() {
  const [changes, setChanges] = useState<CharmChange[]>([])

  useEffect(() => {
    const updateChanges = () => {
      setChanges(getCharmChangeHistory())
    }

    updateChanges()
    const interval = setInterval(updateChanges, 1000)
    return () => clearInterval(interval)
  }, [])

  if (changes.length === 0) return null

  return (
    <div className="rounded-lg bg-gray-800 p-4">
      <h3 className="mb-4 text-lg font-medium text-gray-100">Recent Charm Changes</h3>
      <div className="max-h-60 overflow-y-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Time</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Type</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Charm</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Change</th>
            </tr>
          </thead>
          <tbody>
            {changes.map((change, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">
                  {new Date(change.timestamp).toLocaleTimeString()}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">
                  {change.type}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-300">
                  {change.charmType}
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