import { GRADIENT_PRESETS } from '@/constants'
import { SwatchTileButton } from '@/components/ui/swatch-tile-button'
import { GradientConfig } from '@/store/types'
import { buildGradientCSS } from '@/utils/build-gradient-css'
import { gradientPresetMatchesConfig } from '@/utils/gradient-preset-matches-config'

interface GradientPresetsProps {
  config: GradientConfig
  onChange: (config: GradientConfig) => void
}

export const GradientPresets = ({ config, onChange }: GradientPresetsProps) => {
  return (
    <div
      data-testid="gradient-presets"
      role="radiogroup"
      aria-label="Presets de gradiente"
      className="grid grid-cols-5 gap-x-2.5 gap-y-3"
    >
      {GRADIENT_PRESETS.map((presetItem) => (
        <SwatchTileButton
          key={presetItem.label}
          testId="gradient-preset"
          label={presetItem.label}
          isSelected={gradientPresetMatchesConfig(config, presetItem)}
          animateWhenSelected
          onClick={() => onChange(presetItem)}
          preview={
            <span
              className="block size-full"
              style={{ background: buildGradientCSS(presetItem) }}
            />
          }
        />
      ))}
    </div>
  )
}
