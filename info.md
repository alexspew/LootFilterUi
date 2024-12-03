# LootFilter UI Documentation

## Overview

LootFilter UI is a modern interface for customizing Diablo II: Resurrected loot filters. It provides an intuitive way to customize item colors, patterns, and display settings.

## Features

### Rune Customization
- Custom colors for low, mid, and high runes
- Pattern customization with padding
- Short/long name toggle
- Live preview of changes
- Color code display

### Color System
- Hex color picker with preview
- Automatic conversion to D2R color codes
- Proper color handling without reset codes
- RGB color manipulation

### File Management
- Automatic backup system
- Safe file writing with error recovery
- Change tracking for debugging
- Configuration import/export

## Color Codes

D2R uses special color codes for items. The format is `ÿc` followed by a code:

```
ÿc0 - White (default/reset)
ÿc1 - Red
ÿc2 - Green (Set items)
ÿc3 - Blue (Magic items)
ÿc4 - Gold (Unique items)
ÿc5 - Gray
ÿc6 - Black
ÿc7 - Tan
ÿc8 - Orange
ÿc9 - Yellow (Rare items)
ÿc: - Dark Green
ÿc; - Purple
ÿc/ - Brown
ÿc. - Coral
```

## File Structure

Important files that are modified:

```
mods/ReMoDDeD/ReMoDDeD.mpq/
├── data/
│   ├── local/lng/strings/
│   │   └── item-runes.json    # Rune display settings
│   └── global/ui/layouts/
│       └── _profilehd.json    # Display settings
```

## Development Environment

This project uses:
- React with TypeScript
- Electron for desktop integration
- Zustand for state management
- TailwindCSS for styling

Development commands:
```powershell
# Start development server
npm run dev

# Build project
npm run build

# Type checking
npm run typecheck
```

## Type Safety

The project uses TypeScript with strict type checking:
- Proper interfaces for all configurations
- Type-safe color code handling
- File system operation types
- Electron API type definitions

## Error Handling

The application includes:
- Automatic file backups
- Safe file writing
- Error recovery
- Change tracking
- Detailed error logging

## Best Practices

When making changes:
1. Always use the UI to modify files
2. Keep backups of your configurations
3. Don't manually edit game files
4. Use the preview feature to verify changes
5. Save changes frequently