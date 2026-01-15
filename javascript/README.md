# JavaScript Playground

A collection of proof-of-concept scripts exploring modern JavaScript features.

## Requirements

- Node.js v22+ (or another runtime with ES2024 support)

## Usage

Run all feature scripts:
```
npm start
```

Run a specific script:
```
npm run run <filename>
```

Example:
```
npm run run flat
npm run run groupby
```

## Adding New Features

Simply create a new `.js` file in the project root. It will automatically be discovered and executed when running `npm start`.

## Current Features

| File | Feature |
|------|---------|
| `flat.js` | `Array.prototype.flat()` - flattening nested arrays |
| `flatMap.js` | `Array.prototype.flatMap()` - map + flatten in one step |
| `groupby.js` | `Object.groupBy()` and `Map.groupBy()` (ES2024) |
| `reduceRight.js` | `Array.prototype.reduceRight()` - right-to-left reduction |

## Utilities

- `logger.js` - Helper functions for formatted console output
