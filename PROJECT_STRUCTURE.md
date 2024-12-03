# LootFilter UI Project Structure

## Directory Structure

```
LootFilter-ui/
├── src/
│   ├── components/           # React components
│   │   ├── common/          # Shared components
│   │   │   ├── ConfigActions.tsx    # Configuration actions (save, import, export)
│   │   │   ├── ModPathDialog.tsx    # Mod directory selection and validation
│   │   │   ├── ColorPicker.tsx      # Color picker with hex input
│   │   │   ├── RuneChangeLog.tsx    # Debug log for rune changes
│   │   │   └── CharmChangeLog.tsx   # Debug log for charm changes
│   │   │
│   │   └── settings/        # Settings components
│   │       ├── CharmSettings.tsx     # Charm configuration
│   │       ├── GemSettings.tsx       # Gem configuration
│   │       ├── RuneSettings.tsx      # Rune configuration
│   │       ├── RunePatternPreview.tsx # Live preview for rune formatting
│   │       └── DebugSettings.tsx     # Debug mode settings
│   │
│   ├── store/               # State management
│   │   └── config.ts        # Configuration store using Zustand
│   │
│   ├── services/            # Business logic and API calls
│   │   └── modConfig.ts     # Mod configuration service
│   │
│   ├── utils/               # Utility functions
│   │   └── colorUtils.ts    # D2R color utilities and conversions
│   │
│   ├── types/               # TypeScript type definitions
│   │   ├── index.ts         # Main type definitions
│   │   ├── electron.d.ts    # Electron API types
│   │   ├── global.d.ts      # Global type augmentations
│   │   └── fileSystem.d.ts  # File system API types
│   │
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
│
├── todo.md                  # Project todo list
└── info.md                 # Project documentation
```

## Key Components

- **ConfigActions**: Main configuration panel with save, import, export functionality
- **ModPathDialog**: Handles mod directory selection and validation
- **ColorPicker**: Reusable color picker with hex input and preview
- **RuneSettings**: Configuration for rune patterns, padding, and colors
- **RunePatternPreview**: Live preview of rune formatting with color codes
- **CharmSettings**: Configuration for charm colors and visibility
- **GemSettings**: Configuration for gem colors and visibility
- **DebugSettings**: Toggle debug modes for development

## State Management

- Uses Zustand for state management
- Main store in `config.ts` handles all filter settings
- Proper type safety with TypeScript interfaces
- Handles both UI state and file system operations

## Services

- `modConfig.ts`: Handles reading/writing mod configuration files
- Includes change tracking for runes and display settings
- Handles file backups and error recovery

## Utilities

- `colorUtils.ts`: Unified color utilities for D2R
  - Hex to D2R color code conversion
  - RGB color manipulation
  - Color validation and formatting
  - No color reset codes in preview

## Type System

- Strong TypeScript typing for all components
- Proper interfaces for configuration objects
- Type safety for color codes and patterns
- Electron API type definitions

## Debug Features

- Rune change tracking
- Display settings tracking
- Backup and restore functionality
- Error handling with detailed logs