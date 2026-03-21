import { PATTERN_PRESETS } from '@/constants'
import { SwatchTileButton } from '@/components/ui/swatch-tile-button'
import { PatternConfig } from '@/store/types'
import { buildPatternCSS } from '@/utils/build-pattern-css'
import { patternPresetMatchesConfig } from '@/utils/pattern-preset-matches-config'

interface PatternPresetsProps {
  config: PatternConfig
  onChange: (config: PatternConfig) => void
}

export const PatternPresets = ({ config, onChange }: PatternPresetsProps) => {
  return (
    <div
      data-testid="pattern-presets"
      role="radiogroup"
      aria-label="Presets de patrón"
      className="grid grid-cols-5 gap-x-2.5 gap-y-3"
    >
      {PATTERN_PRESETS.map((presetItem) => (
        <SwatchTileButton
          key={presetItem.label}
          testId="pattern-preset"
          label={presetItem.label}
          isSelected={patternPresetMatchesConfig(config, presetItem)}
          animateWhenSelected
          onClick={() => onChange(presetItem)}
          preview={
            <span className="block size-full" style={{ background: buildPatternCSS(presetItem) }} />
          }
        />
      ))}
    </div>
  )
}
