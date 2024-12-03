import React from 'react'
import { HexColorPicker } from 'react-colorful'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label: string
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const popover = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popover.current && !popover.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          className="h-10 w-full rounded-md border border-gray-600 bg-gray-700 p-1 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className="h-full w-full rounded"
            style={{ backgroundColor: color }}
          />
        </button>
        {isOpen && (
          <div
            ref={popover}
            className="absolute left-0 top-full z-10 mt-2 rounded-lg bg-gray-800 p-3 shadow-xl"
          >
            <HexColorPicker
              color={color}
              onChange={onChange}
            />
            <div className="mt-2 flex items-center justify-between">
              <input
                type="text"
                className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm text-gray-200"
                value={color}
                onChange={(e) => onChange(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ColorPicker 