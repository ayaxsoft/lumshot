## General Rules

- MUST: Use TypeScript interfaces over types.
- MUST: Keep all types in the global scope.
- MUST: Use arrow functions over function declarations
- MUST: Never comment unless absolutely necessary.
  - If the code is a hack (like a setTimeout or potentially confusing code), it must be prefixed with // HACK: reason for hack
- MUST: Use kebab-case for files
- MUST: Use descriptive names for variables (avoid shorthands, or 1-2 character names).
  - Example: for .map(), you can use `index` instead of `x`
- MUST: Frequently re-evaluate and refactor variable names to be more accurate and descriptive.
- MUST: Do not type cast ("as") unless absolutely necessary
- MUST: Remove unused code and don't repeat yourself.
- MUST: Always search the codebase, think of many solutions, then implement the most _elegant_ solution.
- MUST: Put all magic numbers in `constants.ts` using `SCREAMING_SNAKE_CASE` with unit suffixes (`_MS`, `_PX`).
- MUST: Put small, focused utility functions in `utils/` with one utility per file.
- MUST: Use Boolean over !!.

## Electron — Performance (before release)

- MUST: Avoid carelessly importing modules; tree-shake and lazy-load where it helps startup and memory.
- MUST: Avoid loading and running code before it is needed (defer non-critical work).
- MUST: Keep the main process non-blocking (async I/O, avoid heavy synchronous work on the event loop).
- MUST: Keep the renderer non-blocking (split work, avoid long synchronous tasks that block painting and input).
- MUST: Avoid unnecessary polyfills; target supported Chromium and ship only what you need.
- MUST: Avoid unnecessary or blocking network requests at startup; batch and defer when possible.
- MUST: Bundle application code (e.g. Vite/webpack) instead of shipping many loose files when practical.
- MUST: Call `Menu.setApplicationMenu(null)` when the default application menu is not required.

## Electron — Security (before release)

- MUST: Load only secure content (HTTPS or trusted origins as appropriate).
- MUST: Do not enable Node.js integration for remote or untrusted content.
- MUST: Enable `contextIsolation` in all `BrowserWindow` / renderer configurations.
- MUST: Enable process sandboxing where supported and compatible with the app.
- MUST: Use `ses.setPermissionRequestHandler()` on every session that loads remote content.
- MUST: Do not disable `webSecurity`.
- MUST: Define a Content-Security-Policy with restrictive rules (e.g. `script-src 'self'`; tighten further as the app allows).
- MUST: Do not enable `allowRunningInsecureContent`.
- MUST: Do not enable experimental Chromium features unless there is a documented, reviewed need.
- MUST: Do not use `enableBlinkFeatures`.
- MUST: If using `<webview>`, do not use `allowpopups`; verify all options and parameters.
- MUST: Disable or limit navigation (e.g. `will-navigate`, `setWindowOpenHandler`) to expected URLs.
- MUST: Disable or limit creation of new windows to what the product explicitly needs.
- MUST: Do not call `shell.openExternal` with untrusted or user-controlled URLs without validation and allowlisting where appropriate.
- MUST: Use a current, supported Electron version and plan upgrades.
- MUST: Validate the sender of every IPC message (`event.sender`, frame, channel allowlist).
- MUST: Prefer custom protocols over `file://` for loading app resources when it improves security and clarity.
- MUST: Review Electron fuses (`electron-fuses`) and enable restrictive defaults where compatible.
- MUST: Do not expose Electron APIs or privileged preload surface to untrusted web content.

## Testing

Run checks always before committing with:

```bash
npm run test
npm run lint
npm run typecheck
npm run format
```
