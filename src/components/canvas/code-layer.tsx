import { useCallback, useRef } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import atomOneDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark'
import atomOneLight from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-light'
import dracula from 'react-syntax-highlighter/dist/esm/styles/hljs/dracula'
import github from 'react-syntax-highlighter/dist/esm/styles/hljs/github'
import githubGist from 'react-syntax-highlighter/dist/esm/styles/hljs/github-gist'
import hybrid from 'react-syntax-highlighter/dist/esm/styles/hljs/hybrid'
import monokai from 'react-syntax-highlighter/dist/esm/styles/hljs/monokai'
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/hljs/night-owl'
import nord from 'react-syntax-highlighter/dist/esm/styles/hljs/nord'
import obsidian from 'react-syntax-highlighter/dist/esm/styles/hljs/obsidian'
import shadesOfPurple from 'react-syntax-highlighter/dist/esm/styles/hljs/shades-of-purple'
import solarizedDark from 'react-syntax-highlighter/dist/esm/styles/hljs/solarized-dark'
import solarizedLight from 'react-syntax-highlighter/dist/esm/styles/hljs/solarized-light'
import tomorrowNight from 'react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night'
import tomorrowNightBlue from 'react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-blue'
import vs2015 from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015'
import { CODE_THEME_BG } from '@/constants'
import { buildShadowCSS } from '@/utils/build-shadow-css'
import type { CodeConfig, ShadowConfig } from '@/store/types'

const THEME_MAP: Record<string, Record<string, React.CSSProperties>> = {
  atomOneDark,
  atomOneLight,
  dracula,
  github,
  githubGist,
  hybrid,
  monokai,
  nightOwl,
  nord,
  obsidian,
  shadesOfPurple,
  solarizedDark,
  solarizedLight,
  tomorrowNight,
  tomorrowNightBlue,
  vs2015,
}

// Vertical space taken by the gutter (em units, relative to code font-size).
// react-syntax-highlighter renders line numbers at ~3.5em wide.
const GUTTER_EM = 3.5
const CODE_V_PX = 28
const CODE_H_PX = 28
const LINE_HEIGHT = 1.75

interface CodeLayerProps {
  code: CodeConfig
  padding: number
  scale: number
  borderRadius: number
  shadow: ShadowConfig
  onCodeChange: (content: string) => void
}

export const CodeLayer = ({
  code,
  padding,
  scale,
  borderRadius,
  shadow,
  onCodeChange,
}: CodeLayerProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const themeStyle = THEME_MAP[code.theme] ?? nightOwl
  const bg = CODE_THEME_BG[code.theme] ?? '#011627'
  const isLight =
    !(
      (THEME_MAP[code.theme] as Record<string, React.CSSProperties>)?.hljs?.color
        ?.toString()
        .startsWith('#0') ?? false
    ) &&
    (bg === '#ffffff' || bg === '#fafafa' || bg === '#fdf6e3' || bg === '#f8f8f8')

  // Title bar: semi-transparent dark/light overlay on top of the solid `bg`
  const titleOverlay = isLight ? 'rgba(0,0,0,0.055)' : 'rgba(0,0,0,0.28)'
  const titleBorder = isLight ? 'rgba(0,0,0,0.09)' : 'rgba(255,255,255,0.07)'
  const filenameColor = isLight ? 'rgba(0,0,0,0.36)' : 'rgba(255,255,255,0.36)'
  const caretColor = isLight ? 'rgba(0,0,0,0.72)' : 'rgba(255,255,255,0.72)'

  // Corner radius: store value (0-100) → tasteful px (0-22px)
  const cornerRadius = Math.round(4 + Math.min(borderRadius * 0.18, 18))

  const boxShadow =
    buildShadowCSS(shadow) || '0 24px 64px rgba(0,0,0,0.38), 0 6px 20px rgba(0,0,0,0.24)'

  // Outer padding drives the gap between window and canvas edge
  const outerPad = `${Math.max(padding * 0.5, 3)}%`

  // Textarea left-padding must visually align with the code text column
  const gutterPx = code.showLineNumbers ? code.fontSize * GUTTER_EM : 0
  const textareaLeft = CODE_H_PX + gutterPx

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== 'Tab') return
      e.preventDefault()
      const el = e.currentTarget
      const s = el.selectionStart
      const next = code.content.slice(0, s) + '  ' + code.content.slice(el.selectionEnd)
      onCodeChange(next)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 2
      })
    },
    [code.content, onCodeChange]
  )

  return (
    <div
      data-testid="code-layer"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        padding: outerPad,
      }}
    >
      {/* ── Code window: fills the padded area, scales visually ── */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          borderRadius: cornerRadius,
          boxShadow,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          // Solid window background so the canvas gradient never bleeds through
          background: bg,
        }}
      >
        {/* ── macOS title bar ── */}
        {code.windowStyle === 'macos' && (
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 20px',
              background: titleOverlay,
              borderBottom: `1px solid ${titleBorder}`,
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, zIndex: 1 }}>
              <div
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  background: '#FF5F57',
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  background: '#FEBC2E',
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  background: '#28C840',
                  flexShrink: 0,
                }}
              />
            </div>
            {code.filename && (
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontFamily: code.fontFamily,
                  color: filenameColor,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  letterSpacing: '0.01em',
                }}
              >
                {code.filename}
              </span>
            )}
          </div>
        )}

        {/* ── Windows title bar ── */}
        {code.windowStyle === 'windows' && (
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              background: titleOverlay,
              borderBottom: `1px solid ${titleBorder}`,
            }}
          >
            <span
              style={{
                flex: 1,
                paddingLeft: 16,
                fontSize: 13,
                fontFamily: code.fontFamily,
                color: filenameColor,
                userSelect: 'none',
              }}
            >
              {code.filename}
            </span>
            {(['─', '□', '✕'] as const).map((icon) => (
              <span
                key={icon}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 46,
                  height: 36,
                  fontSize: 13,
                  color: isLight ? 'rgba(0,0,0,0.42)' : 'rgba(255,255,255,0.42)',
                  userSelect: 'none',
                }}
              >
                {icon}
              </span>
            ))}
          </div>
        )}

        {/* ── Code area: flex-1 so it fills remaining window height ── */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Syntax-highlighted display — visual only, no pointer events */}
          <SyntaxHighlighter
            language={code.language === 'text' ? 'plaintext' : code.language}
            style={themeStyle}
            showLineNumbers={code.showLineNumbers}
            lineNumberStyle={{
              minWidth: `${GUTTER_EM}em`,
              paddingRight: '1em',
              paddingLeft: 0,
              opacity: 0.3,
              userSelect: 'none',
              fontFamily: code.fontFamily,
              fontSize: `${code.fontSize}px`,
              lineHeight: LINE_HEIGHT,
              textAlign: 'right',
            }}
            customStyle={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              margin: 0,
              padding: `${CODE_V_PX}px ${CODE_H_PX}px`,
              background: 'transparent',
              fontSize: `${code.fontSize}px`,
              fontFamily: code.fontFamily,
              lineHeight: LINE_HEIGHT,
              whiteSpace: 'pre',
              tabSize: 2,
              pointerEvents: 'none',
              minHeight: '100%',
            }}
            codeTagProps={{
              style: {
                fontFamily: code.fontFamily,
                fontSize: `${code.fontSize}px`,
                lineHeight: LINE_HEIGHT,
              },
            }}
          >
            {code.content || ' '}
          </SyntaxHighlighter>

          {/* Transparent input overlay */}
          <textarea
            ref={textareaRef}
            data-export-ignore="true"
            value={code.content}
            onChange={(e) => onCodeChange(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="// Start typing..."
            style={{
              position: 'absolute',
              inset: 0,
              resize: 'none',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: 'transparent',
              caretColor,
              fontFamily: code.fontFamily,
              fontSize: `${code.fontSize}px`,
              lineHeight: LINE_HEIGHT,
              paddingTop: CODE_V_PX,
              paddingBottom: CODE_V_PX,
              paddingLeft: textareaLeft,
              paddingRight: CODE_H_PX,
              whiteSpace: 'pre',
              overflow: 'hidden',
              tabSize: 2,
            }}
          />
        </div>
      </div>
    </div>
  )
}
