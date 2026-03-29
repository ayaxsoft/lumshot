import {
  IconBorderCornerRounded,
  IconBoxPadding,
  IconLetterCase,
  IconResize,
} from '@tabler/icons-react'
import { useId } from 'react'
import { CODE_FONTS, CODE_LANGUAGES, CODE_THEMES, CODE_WINDOW_STYLES } from '@/constants'
import { useEditorStore } from '@/store/useEditorStore'
import type { CodeTheme, WindowStyle } from '@/store/types'
import { Slider } from '../ui/slider'
import { ShadowControls } from '../ui/shadow-controls'
import { Switch } from '../ui/switch'

const selectClass =
  'w-full rounded-lg bg-white/5 px-3 py-2 text-sm text-white/80 outline-none focus-visible:ring-1 focus-visible:ring-white/20 cursor-pointer appearance-none'

export const CodePanel = () => {
  const code = useEditorStore((state) => state.code)
  const setCode = useEditorStore((state) => state.setCode)
  const padding = useEditorStore((state) => state.padding)
  const setPadding = useEditorStore((state) => state.setPadding)
  const borderRadius = useEditorStore((state) => state.borderRadius)
  const setBorderRadius = useEditorStore((state) => state.setBorderRadius)
  const scale = useEditorStore((state) => state.scale)
  const setScale = useEditorStore((state) => state.setScale)
  const shadow = useEditorStore((state) => state.shadow)
  const setShadow = useEditorStore((state) => state.setShadow)

  const filenameId = useId()
  const languageId = useId()
  const themeId = useId()
  const fontId = useId()
  const windowStyleLabelId = useId()
  const lineNumbersId = useId()

  return (
    <div data-testid="code-panel" className="flex flex-col gap-3">
      {/* Filename */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={filenameId} className="text-xs text-white/40 uppercase tracking-wide">
          Filename
        </label>
        <input
          id={filenameId}
          type="text"
          value={code.filename}
          onChange={(e) => setCode({ filename: e.target.value })}
          placeholder="Counter.tsx…"
          className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm text-white/80 placeholder-white/20 outline-none focus-visible:ring-1 focus-visible:ring-white/20"
        />
      </div>

      {/* Language */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={languageId} className="text-xs text-white/40 uppercase tracking-wide">
          Language
        </label>
        <select
          id={languageId}
          value={code.language}
          onChange={(e) => setCode({ language: e.target.value })}
          className={selectClass}
        >
          {CODE_LANGUAGES.map((l) => (
            <option key={l.value} value={l.value} className="bg-neutral-900">
              {l.label}
            </option>
          ))}
        </select>
      </div>

      {/* Theme */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={themeId} className="text-xs text-white/40 uppercase tracking-wide">
          Theme
        </label>
        <select
          id={themeId}
          value={code.theme}
          onChange={(e) => setCode({ theme: e.target.value as CodeTheme })}
          className={selectClass}
        >
          <optgroup label="Dark" className="bg-neutral-900">
            {CODE_THEMES.filter((t) => t.dark).map((t) => (
              <option key={t.value} value={t.value} className="bg-neutral-900">
                {t.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Light" className="bg-neutral-900">
            {CODE_THEMES.filter((t) => !t.dark).map((t) => (
              <option key={t.value} value={t.value} className="bg-neutral-900">
                {t.label}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Window style */}
      <div className="flex flex-col gap-1.5">
        <p id={windowStyleLabelId} className="text-xs text-white/40 uppercase tracking-wide">
          Window
        </p>
        <div
          role="radiogroup"
          aria-labelledby={windowStyleLabelId}
          className="grid grid-cols-3 gap-1.5"
        >
          {CODE_WINDOW_STYLES.map((style) => (
            <button
              key={style.value}
              type="button"
              role="radio"
              aria-checked={code.windowStyle === style.value}
              onClick={() => setCode({ windowStyle: style.value as WindowStyle })}
              className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/55 ${
                code.windowStyle === style.value
                  ? 'bg-white/15 text-white'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              {style.value === 'macos' && (
                <span className="flex items-center gap-1 mb-0.5" aria-hidden>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </span>
              )}
              {style.value === 'windows' && (
                <span className="text-[9px] text-white/35 tracking-tighter mb-0.5" aria-hidden>
                  ─ □ ✕
                </span>
              )}
              {style.value === 'none' && (
                <span className="text-[11px] text-white/20 mb-0.5" aria-hidden>
                  —
                </span>
              )}
              <span>{style.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor={fontId} className="text-xs text-white/40 uppercase tracking-wide">
          Font
        </label>
        <select
          id={fontId}
          value={code.fontFamily}
          onChange={(e) => setCode({ fontFamily: e.target.value })}
          className={selectClass}
        >
          {CODE_FONTS.map((f) => (
            <option key={f.value} value={f.value} className="bg-neutral-900">
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Font size */}
      <Slider
        icon={<IconLetterCase stroke={1.5} />}
        label="Font Size"
        value={code.fontSize}
        onChange={(v) => setCode({ fontSize: v })}
        min={10}
        max={24}
        step={1}
        formatValue={(v) => `${v}px`}
      />

      {/* Line numbers */}
      <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
        <label htmlFor={lineNumbersId} className="text-sm text-white/60 cursor-pointer">
          Line Numbers
        </label>
        <Switch
          id={lineNumbersId}
          checked={code.showLineNumbers}
          onCheckedChange={(checked) => setCode({ showLineNumbers: checked })}
        />
      </div>

      <div className="h-px bg-white/5 my-1" />

      {/* Frame controls */}
      <Slider
        icon={<IconBoxPadding stroke={1.5} />}
        label="Padding"
        value={padding}
        onChange={setPadding}
        min={0}
        max={30}
        step={1}
      />
      <Slider
        icon={<IconBorderCornerRounded stroke={1.5} />}
        label="Border Radius"
        value={borderRadius}
        onChange={setBorderRadius}
        min={0}
        max={100}
        step={1}
      />
      <Slider
        icon={<IconResize stroke={1.5} />}
        label="Scale"
        value={scale}
        onChange={setScale}
        min={0.5}
        max={1}
        step={0.01}
        formatValue={(v) => `${Math.round(v * 100)}%`}
      />
      <ShadowControls shadow={shadow} onChange={setShadow} />
    </div>
  )
}
