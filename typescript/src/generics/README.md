Generics POC

This folder contains a small proof of concept demonstrating TypeScript generics in practical helpers and a tiny in-memory repository.

Files
- `index.ts`: Generic helpers (`identity`, `wrapInArray`, `merge`, `getProp`, `mapValues`), a `Result<T, E>` type with helpers, and a `Repository<T extends { id: string }>`.
- `generics.test.ts`: Jest tests showing how to use and validate the generics.

How to run tests
- Run only the generics tests (recommended):

  `npx jest src/generics/generics.test.ts`

  This avoids running unrelated tests that may require a running server.

- Or run the entire suite (if desired and your environment supports it):

  `npx jest`

Notes
- The project is already configured with `ts-jest` and `jest.config.js` at the project root.
- If you prefer using an npm script, you can set `"test": "jest"` in `package.json` and run `npm test`. This is optional—`npx jest` works as-is.

