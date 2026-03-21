import { useEditorStore } from '../../store/useEditorStore'
import DropZone from '../dropzone/DropZone'
import { BackgroundLayer } from './BackgroundLayer'
import { ImageLayer } from './ImageLayer'

const CanvasPreview = () => {
  const image = useEditorStore((state) => state.image)
  const background = useEditorStore((state) => state.background)
  const shadow = useEditorStore((state) => state.shadow)
  const padding = useEditorStore((state) => state.padding)
  const borderRadius = useEditorStore((state) => state.borderRadius)
  const scale = useEditorStore((state) => state.scale)
  const offsetX = useEditorStore((state) => state.offsetX)
  const offsetY = useEditorStore((state) => state.offsetY)

  const imageConfig = { padding, borderRadius, scale, offsetX, offsetY, shadow }

  return (
    <div
      data-testid="canvas-preview"
      className="absolute inset-0 flex items-center justify-center bg-neutral-950"
    >
      <div className="relative h-[90%] w-[90%] overflow-hidden rounded-3xl shadow-2xl">
        <BackgroundLayer background={background} />
        {image ? (
          <ImageLayer image={image} config={imageConfig} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              style={{ width: `${(1 - padding / 100) * scale * 100}%` }}
              className="aspect-video w-[80%] overflow-hidden rounded-2xl bg-neutral-900"
            >
              <DropZone />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CanvasPreview
