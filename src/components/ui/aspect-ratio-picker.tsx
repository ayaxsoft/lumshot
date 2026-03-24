import { CANVAS_ASPECT_PRESETS } from '@/constants'
import type { AspectRatio } from '@/store/types'
import { cn } from '@/utils/cn'

import { AspectRatioSwatchPreview } from './aspect-ratio-swatch-preview'

interface AspectRatioPickerProps {
  value: AspectRatio
  onChange: (value: AspectRatio) => void
}

export const AspectRatioPicker = ({ value, onChange }: AspectRatioPickerProps) => {
  return (
    <div
      data-testid="aspect-ratio-picker"
      role="radiogroup"
      aria-label="Aspect ratio"
      className="grid w-full grid-cols-3 gap-x-2 gap-y-2"
    >
      {CANVAS_ASPECT_PRESETS.map((option) => {
        const isSelected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex min-w-0 w-full items-center justify-center gap-2 rounded-md px-1 py-2 text-[10px] leading-snug tracking-tight transition-[box-shadow,filter] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/55 cursor-pointer',
              isSelected
                ? 'font-medium text-white ring-2 ring-inset ring-white/85'
                : 'text-white/50 ring-1 ring-inset ring-white/20 hover:brightness-[1.08]'
            )}
          >
            <AspectRatioSwatchPreview aspectRatio={option.value} compact />
            <span className="tabular-nums">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
