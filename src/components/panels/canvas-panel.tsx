import { AspectRatioPicker } from '@/components/ui/aspect-ratio-picker'
import { useEditorStore } from '@/store/useEditorStore'

export const CanvasPanel = () => {
  const aspectRatio = useEditorStore((state) => state.aspectRatio)
  const setAspectRatio = useEditorStore((state) => state.setAspectRatio)

  return (
    <div data-testid="canvas-panel">
      <AspectRatioPicker value={aspectRatio} onChange={setAspectRatio} />
    </div>
  )
}
