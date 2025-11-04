GroupBy POC (ES2024)

Simple proof-of-concept for `Object.groupBy()` and `Map.groupBy()` in JavaScript.

Requirements
- Node.js v22+ (or another runtime with ES2024 support)

Run
- `node groupby.mjs`

What it shows
- Grouping an array of objects by a string key using `Object.groupBy` (returns a plain object).
- The same grouping using `Map.groupBy` (returns a `Map`).
- Difference in key types: booleans become string keys in `Object.groupBy`, but remain booleans in `Map.groupBy`.
- Non-string keys (like objects) are only preserved by `Map.groupBy`. With `Object.groupBy`, object keys coerce to strings like `"[object Object]"`.
- Converting between `Map` and object, noting potential information loss when stringifying non-string keys.

