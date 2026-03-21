import { useEditorStore } from '../../store/useEditorStore'
import { buildImageFrameStyle } from '../../utils/build-image-frame-style'
import { DropZone } from '../dropzone/dropzone'
import { BackgroundLayer } from './background-layer'
import { ImageLayer } from './image-layer'

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

  const emptyFrameStyle = buildImageFrameStyle(borderRadius, offsetX, offsetY, shadow)

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
              style={{
                width: `${(1 - padding / 100) * scale * 100}%`,
              }}
            >
              <div
                data-testid="dropzone-frame"
                className="aspect-video w-full overflow-hidden bg-neutral-900"
                style={emptyFrameStyle}
              >
                <DropZone />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CanvasPreview
