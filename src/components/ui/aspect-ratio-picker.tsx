import { CANVAS_ASPECT_AUTO, CANVAS_ASPECT_PRESETS } from '@/constants'
import type { AspectRatio } from '@/store/types'
import { cn } from '@/utils/cn'

import { AspectRatioSwatchPreview } from './aspect-ratio-swatch-preview'

interface AspectRatioPickerProps {
  value: AspectRatio
  onChange: (value: AspectRatio) => void
}

export const AspectRatioPicker = ({ value, onChange }: AspectRatioPickerProps) => {
  const autoSelected = value === CANVAS_ASPECT_AUTO.value

  return (
    <div
      data-testid="aspect-ratio-picker"
      role="radiogroup"
      aria-label="Aspect ratio"
      className="flex flex-col gap-3"
    >
      <button
        type="button"
        role="radio"
        aria-checked={autoSelected}
        onClick={() => onChange(CANVAS_ASPECT_AUTO.value)}
        className={cn(
          'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-[box-shadow,filter] duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/55 cursor-pointer',
          autoSelected
            ? 'ring-2 ring-inset ring-white/85'
            : 'ring-1 ring-inset ring-white/20 hover:brightness-[1.08]'
        )}
      >
        <AspectRatioSwatchPreview aspectRatio="auto" compact />
        <span
          className={cn(
            'min-w-0 flex-1 font-medium',
            autoSelected ? 'text-white' : 'text-white/55'
          )}
        >
          {CANVAS_ASPECT_AUTO.label}
        </span>
        <span className="shrink-0 text-[10px] text-white/35">Original</span>
      </button>

      <div>
        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-white/30">
          Fixed ratio
        </p>
        <div className="grid w-full grid-cols-3 gap-x-2 gap-y-2">
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
                  'flex min-w-0 w-full items-center justify-center gap-2 rounded-md px-1 py-2 text-[10px] leading-snug tracking-tight transition-[box-shadow,filter] duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/55 cursor-pointer',
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
      </div>
    </div>
  )
}
