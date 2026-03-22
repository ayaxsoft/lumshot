import { CANVAS_OPTIONS } from '@/constants'
import { useEditorStore } from '@/store/useEditorStore'
import { AspectRatio } from '@/store/types'

import { TypeSelector } from '../ui/type-selector'

export const CanvasPanel = () => {
  const aspectRatio = useEditorStore((state) => state.aspectRatio)
  const setAspectRatio = useEditorStore((state) => state.setAspectRatio)

  return (
    <div data-testid="canvas-panel" className="flex flex-col gap-2">
      <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">Aspect Ratio</p>
      <TypeSelector
        options={CANVAS_OPTIONS}
        value={aspectRatio}
        onChange={(value) => setAspectRatio(value as AspectRatio)}
      />
    </div>
  )
}
