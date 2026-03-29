import {
  IconArrowsMoveHorizontal,
  IconArrowsMoveVertical,
  IconBlur,
  IconDropletHalfFilled,
} from '@tabler/icons-react'

import { ShadowConfig } from '@/store/types'
import { ColorSwatchPopover } from '@/components/ui/color-swatch-popover'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

interface ShadowControlsProps {
  shadow: ShadowConfig
  onChange: (shadow: Partial<ShadowConfig>) => void
}

export const ShadowControls = ({ shadow, onChange }: ShadowControlsProps) => {
  return (
    <div data-testid="shadow-controls" className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="shadow-enabled" className="text-sm text-white/60 cursor-pointer">
          Shadow
        </label>
        <Switch
          id="shadow-enabled"
          checked={shadow.enabled}
          onCheckedChange={(checked) => onChange({ enabled: checked })}
        />
      </div>
      {shadow.enabled && (
        <>
          <Slider
            icon={<IconBlur stroke={1.5} />}
            label="Blur"
            value={shadow.blur}
            onChange={(value) => onChange({ blur: value })}
            min={0}
            max={60}
            step={1}
          />
          <Slider
            icon={<IconArrowsMoveHorizontal stroke={1.5} />}
            label="Offset X"
            value={shadow.offsetX}
            onChange={(value) => onChange({ offsetX: value })}
            min={-30}
            max={30}
            step={1}
          />
          <Slider
            icon={<IconArrowsMoveVertical stroke={1.5} />}
            label="Offset Y"
            value={shadow.offsetY}
            onChange={(value) => onChange({ offsetY: value })}
            min={-30}
            max={30}
            step={1}
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-white/60">Color</span>
            <ColorSwatchPopover
              value={shadow.color}
              onChange={(color) => onChange({ color: color })}
              ariaLabel="Shadow color"
            />
          </div>
          <Slider
            icon={<IconDropletHalfFilled stroke={1.5} />}
            label="Opacity"
            value={shadow.opacity}
            onChange={(value) => onChange({ opacity: value })}
            min={0}
            max={100}
            step={1}
          />
        </>
      )}
    </div>
  )
}
