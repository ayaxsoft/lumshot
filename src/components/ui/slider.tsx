import type { ReactNode } from 'react'
import { SliderRange, Slider as SliderRoot, SliderThumb, SliderTrack } from '@radix-ui/react-slider'

interface SliderProps {
  label: string
  icon?: ReactNode
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  formatValue?: (value: number) => string
}

export const Slider = ({
  label,
  icon,
  value,
  onChange,
  min,
  max,
  step,
  formatValue,
}: SliderProps) => {
  const displayedValue = formatValue !== undefined ? formatValue(value) : String(value)
  return (
    <div data-testid="slider" className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-1.5">
      <div className="flex min-w-0 shrink-0 items-center gap-2 text-sm text-white/60">
        {icon !== undefined ? (
          <span className="flex shrink-0 text-white/45 [&_svg]:size-4" aria-hidden>
            {icon}
          </span>
        ) : null}
        <span className="min-w-0 max-w-40 truncate">{label}</span>
      </div>

      <div className="min-w-16 min-h-0 flex-1 py-0.5">
        <SliderRoot
          className="relative flex h-6 w-full cursor-pointer touch-none select-none items-center"
          value={[value]}
          onValueChange={(nextValues) => {
            const next = nextValues[0]
            if (next !== undefined) {
              onChange(next)
            }
          }}
          min={min}
          max={max}
          step={step}
        >
          <SliderTrack className="relative h-full w-full overflow-hidden rounded-md">
            <SliderRange className="hidden" />
          </SliderTrack>
          <SliderThumb className="block h-5 w-5 rounded-full bg-white shadow focus:outline-none" />
        </SliderRoot>
      </div>

      <span className="shrink-0 tabular-nums text-sm text-white/60">{displayedValue}</span>
    </div>
  )
}
