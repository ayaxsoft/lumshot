import { useCallback, useState } from 'react'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'

import {
  GRADIENT_PRESETS,
  GRADIENT_PRESETS_COLLAPSED_COUNT,
  GRADIENT_PRESETS_PEEK_COUNT,
} from '@/constants'
import { SwatchTileButton } from '@/components/ui/swatch-tile-button'
import type { GradientConfig } from '@/store/types'
import { buildGradientCSS } from '@/utils/build-gradient-css'
import { gradientPresetMatchesConfig } from '@/utils/gradient-preset-matches-config'
import { cn } from '@/utils/cn'

interface GradientPresetsProps {
  config: GradientConfig
  onChange: (config: GradientConfig) => void
}

interface GradientPresetTileProps {
  preset: (typeof GRADIENT_PRESETS)[number]
  config: GradientConfig
  onChange: (config: GradientConfig) => void
}

const GradientPresetTile = ({ preset, config, onChange }: GradientPresetTileProps) => (
  <SwatchTileButton
    testId="gradient-preset"
    label={preset.label}
    isSelected={gradientPresetMatchesConfig(config, preset)}
    animateWhenSelected
    onClick={() => onChange(preset)}
    preview={<span className="block size-full" style={{ background: buildGradientCSS(preset) }} />}
  />
)

const peekPresets = GRADIENT_PRESETS.slice(
  GRADIENT_PRESETS_COLLAPSED_COUNT,
  GRADIENT_PRESETS_COLLAPSED_COUNT + GRADIENT_PRESETS_PEEK_COUNT
)

export const GradientPresets = ({ config, onChange }: GradientPresetsProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = useCallback(() => setIsExpanded((prev) => !prev), [])

  return (
    <div data-testid="gradient-presets" role="radiogroup" aria-label="Gradient presets">
      <div className="grid grid-cols-5 gap-2">
        {GRADIENT_PRESETS.slice(0, GRADIENT_PRESETS_COLLAPSED_COUNT).map((presetItem) => (
          <GradientPresetTile
            key={presetItem.label}
            preset={presetItem}
            config={config}
            onChange={onChange}
          />
        ))}

        <button
          type="button"
          aria-label={isExpanded ? 'Show fewer presets' : 'Show all presets'}
          onClick={toggleExpanded}
          className="flex w-full min-w-0 flex-col items-center gap-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/55"
        >
          <span className="relative w-full rounded-lg p-0.5">
            {!isExpanded &&
              peekPresets.map((preset, index) => (
                <span
                  key={preset.label}
                  aria-hidden
                  className="absolute inset-0.5 rounded-md"
                  style={{
                    background: buildGradientCSS(preset),
                    transform: `translate(${index === 0 ? '-4px' : '4px'}, ${-(GRADIENT_PRESETS_PEEK_COUNT - index) * 5}px)`,
                    opacity: 0.55 + index * 0.15,
                  }}
                />
              ))}
            <span
              aria-hidden
              className="relative flex aspect-square w-full items-center justify-center rounded-md bg-neutral-900 ring-1 ring-inset ring-white/15 transition-colors hover:ring-white/25"
            >
              {isExpanded ? (
                <IconChevronUp stroke={2} className="size-3.5 text-white/55" />
              ) : (
                <IconChevronDown stroke={2} className="size-3.5 text-white/55" />
              )}
            </span>
          </span>
          <span className="w-full px-0.5 text-[10px] leading-snug tracking-tight text-white/50">
            {isExpanded ? 'Less' : 'More'}
          </span>
        </button>
      </div>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-5 gap-2 pt-2">
            {GRADIENT_PRESETS.slice(GRADIENT_PRESETS_COLLAPSED_COUNT).map((presetItem) => (
              <GradientPresetTile
                key={presetItem.label}
                preset={presetItem}
                config={config}
                onChange={onChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
