import * as RadixTooltip from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip = ({ content, children, side = 'bottom' }: TooltipProps) => (
  <RadixTooltip.Root delayDuration={500}>
    <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        side={side}
        sideOffset={6}
        className="z-50 rounded-md bg-neutral-800 px-2 py-1 text-[11px] text-white/80 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      >
        {content}
        <RadixTooltip.Arrow className="fill-neutral-800" />
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  </RadixTooltip.Root>
)

export const TooltipProvider = RadixTooltip.Provider
