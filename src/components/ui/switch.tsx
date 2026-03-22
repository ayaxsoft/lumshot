import type { ComponentPropsWithoutRef } from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/utils/cn'

export const Switch = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>) => (
  <SwitchPrimitive.Root
    className={cn(
      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55 data-[state=checked]:bg-white/40',
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block h-4 w-4 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5'
      )}
    />
  </SwitchPrimitive.Root>
)
