import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SwatchTileButtonProps {
  label: string
  isSelected: boolean
  onClick: () => void
  preview?: ReactNode
  previewContain?: boolean
  testId?: string
  animateWhenSelected?: boolean
}

export const SwatchTileButton = ({
  label,
  isSelected,
  onClick,
  preview,
  previewContain = false,
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
      className="flex w-full min-w-0 flex-col items-center gap-1.5 rounded-md text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/55 cursor-pointer"
    >
      {preview !== undefined ? (
        <>
          <span
            className={cn(
              'w-full rounded-lg p-0.5 transition-[box-shadow] duration-200 ease-out motion-reduce:transition-none',
              isSelected ? 'ring-2 ring-inset ring-white/85' : ''
            )}
          >
            <span
              aria-hidden
              className={cn(
                'aspect-square w-full overflow-hidden rounded-md transition-[transform,filter] duration-200 ease-out motion-reduce:transition-none',
                previewContain
                  ? 'flex items-center justify-center [&>*]:max-h-full [&>*]:max-w-full'
                  : 'block [&>*]:size-full [&>*]:min-h-0 [&>*]:min-w-0',
                animateWhenSelected && isSelected
                  ? 'motion-safe:animate-gradient-preset-select motion-reduce:scale-[1.02]'
                  : !animateWhenSelected && isSelected
                    ? 'brightness-105'
                    : '',
                !isSelected &&
                  (previewContain
                    ? 'bg-white/[0.07] hover:bg-white/[0.11]'
                    : 'ring-1 ring-inset ring-white/20 hover:brightness-[1.08]')
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
        </>
      ) : (
        <span
          className={cn(
            'w-full rounded-md px-1.5 py-2 text-[10px] leading-snug tracking-tight transition-[box-shadow,filter] duration-200 ease-out motion-reduce:transition-none',
            isSelected
              ? 'font-medium text-white ring-2 ring-inset ring-white/85'
              : 'text-white/50 ring-1 ring-inset ring-white/20 hover:brightness-[1.08]'
          )}
        >
          {label}
        </span>
      )}
    </button>
  )
}
