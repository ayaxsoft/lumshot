import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/utils/cn'

interface CanvasFrameSlotProps {
  padding: number
  scale: number
  frameStyle: CSSProperties
  frameClassName?: string
  frameTestId?: string
  children: ReactNode
}

export const CanvasFrameSlot = ({
  padding,
  scale,
  frameStyle,
  frameClassName,
  frameTestId,
  children,
}: CanvasFrameSlotProps) => {
  const insetPercent = padding / 2

  return (
    <div
      data-testid="canvas-frame-inset"
      className="absolute flex min-h-0 min-w-0 items-center justify-center"
      style={{
        top: `${insetPercent}%`,
        bottom: `${insetPercent}%`,
        left: `${insetPercent}%`,
        right: `${insetPercent}%`,
      }}
    >
      <div
        data-testid="canvas-frame-scale-slot"
        className="flex min-h-0 min-w-0 items-center justify-center"
        style={{
          width: `${scale * 100}%`,
          height: `${scale * 100}%`,
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      >
        <div
          data-testid={frameTestId}
          className={cn('overflow-hidden', frameClassName)}
          style={frameStyle}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
