# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Lumshot is a desktop app (Electron + React + TypeScript + Vite) for beautifying screenshots — custom backgrounds, effects, code snippet rendering, and multi-format export.

## Commands

```bash
npm run dev          # Start dev server with HMR
npm run build        # Typecheck → Vite build → Electron build
npm run test         # Vitest unit tests
npm run test:ui      # Vitest interactive UI
npm run lint         # ESLint
npm run typecheck    # TypeScript strict check
npm run format       # Prettier (write)
npm run format:check # Prettier (check only)
```

**Before every commit:**

```bash
npm run test && npm run lint && npm run typecheck && npm run format
```

## Architecture

### Process Model

- **`electron/main.ts`** — Main process: IPC handlers, window setup, Sharp-based image export, Resend feedback API
- **`electron/preload.ts`** — Context bridge: exposes `openFile`, `exportImage`, `openExportedFile`, `sendFeedback` to renderer
- **`src/`** — Renderer process (React app)

### State

`src/store/useEditorStore.ts` — Single Zustand store with Immer (immutable updates) and Zundo (undo/redo with debounce). All types live in `src/store/types.ts`.

### Component Hierarchy

```
App
├── Toolbar (undo/redo, feedback)
├── Sidebar
│   ├── Image Panel
│   ├── Background Panel (gradient, solid, pattern, mesh, image)
│   ├── Code Panel (syntax highlighting, themes)
│   └── Export Panel (format, resolution)
└── Canvas Preview
    ├── Background Layer
    ├── Image Layer
    ├── Code Layer
    └── Canvas Frame
```

Canvas layers are in `src/components/canvas/`, panels in `src/components/panels/`, shared primitives in `src/components/ui/`.

### Utilities

`src/utils/` — One utility per file (kebab-case). Includes CSS builders (`build-*.ts`), aspect ratio resolvers (`resolve-*.ts`), and config comparators (`*-config-equals.ts`).

`src/constants.ts` — All magic numbers in `SCREAMING_SNAKE_CASE` with unit suffixes (`_MS`, `_PX`).

## Coding Rules (from AGENTS.md)

- Use TypeScript **interfaces** over types
- All types in **global scope** (`src/store/types.ts`)
- **Arrow functions** only
- **No comments** unless absolutely necessary; use `// HACK: reason` for hacks
- **kebab-case** filenames
- Descriptive variable names — no abbreviations, no 1–2 char names
- Avoid `as` type casting unless necessary
- No unused code; no duplication
- Magic numbers → `constants.ts`
- Small utilities → `utils/` (one per file)
- Use `Boolean()` over `!!`

### Electron Performance

- Tree-shake and lazy-load modules; defer non-critical work
- Keep main process non-blocking (async I/O)
- Keep renderer non-blocking (avoid long synchronous tasks)

### Electron Security

- `contextIsolation: true`, `nodeIntegration: false`
- Validate IPC message senders (`event.sender`, frame, channel allowlist)
- No `shell.openExternal` with untrusted URLs
- CSP with restrictive rules (`script-src 'self'`)

## Release

Uses Changesets for semantic versioning. Tags `v*` trigger the multi-platform build pipeline (macOS, Windows, Linux via electron-builder).

```bash
npm run changeset          # Add changeset
npm run changeset:version  # Bump versions
npm run changeset:publish  # Publish
```

Path alias: `@/*` → `src/*`
