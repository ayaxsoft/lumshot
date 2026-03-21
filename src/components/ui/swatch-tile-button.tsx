import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SwatchTileButtonProps {
  label: string
  isSelected: boolean
  onClick: () => void
  preview: ReactNode
  testId?: string
  animateWhenSelected?: boolean
}

export const SwatchTileButton = ({
  label,
  isSelected,
  onClick,
  preview,
  testId,
  animateWhenSelected = false,
}: SwatchTileButtonProps) => {
  return (
    <button
      data-testid={testId}
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onClick}
      className="flex w-full min-w-0 flex-col items-center gap-1.5 rounded-md text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/55"
    >
      <span
        className={cn(
          'w-full rounded-lg p-0.5 transition-[box-shadow] duration-200 ease-out motion-reduce:transition-none',
          isSelected ? 'ring-2 ring-inset ring-white/85' : ''
        )}
      >
        <span
          aria-hidden
          className={cn(
            'block aspect-square w-full overflow-hidden rounded-md transition-[transform,filter] duration-200 ease-out motion-reduce:transition-none [&>*]:size-full [&>*]:min-h-0 [&>*]:min-w-0',
            animateWhenSelected && isSelected
              ? 'motion-safe:animate-gradient-preset-select motion-reduce:scale-[1.02]'
              : !animateWhenSelected && isSelected
                ? 'brightness-105'
                : '',
            !isSelected && 'ring-1 ring-inset ring-white/20 hover:brightness-[1.08]'
          )}
        >
          {preview}
        </span>
      </span>
      <span
        className={cn(
          'w-full px-0.5 text-[10px] leading-snug tracking-tight',
          isSelected ? 'font-medium text-white' : 'text-white/50'
        )}
      >
        {label}
      </span>
    </button>
  )
}
