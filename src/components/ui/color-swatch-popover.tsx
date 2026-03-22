import * as Popover from '@radix-ui/react-popover'
import { HexColorPicker } from 'react-colorful'

import { COLOR_SWATCH_POPOVER_CONTENT_WIDTH_PX } from '@/constants'
import { cn } from '@/utils/cn'

interface ColorSwatchPopoverProps {
  value: string
  onChange: (color: string) => void
  ariaLabel: string
}

export const ColorSwatchPopover = ({ value, onChange, ariaLabel }: ColorSwatchPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          data-testid="color-swatch-popover-trigger"
          className={cn(
            'size-7 shrink-0 rounded-md ring-1 ring-inset ring-white/25 transition-opacity hover:opacity-90',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55'
          )}
          style={{ backgroundColor: value }}
          aria-label={ariaLabel}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-[200] rounded-lg border border-white/10 bg-zinc-900/95 p-2 shadow-xl outline-none"
          style={{ width: COLOR_SWATCH_POPOVER_CONTENT_WIDTH_PX }}
          sideOffset={6}
          align="end"
        >
          <div className="[&_.react-colorful]:h-36 [&_.react-colorful]:w-full">
            <HexColorPicker color={value} onChange={onChange} />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
