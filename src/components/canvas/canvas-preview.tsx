import { CANVAS_EXPORT_SURFACE_TEST_ID } from '@/constants'
import { useEditorStore } from '../../store/useEditorStore'
import { buildCanvasFrameBoxStyle } from '../../utils/build-canvas-frame-box-style'
import { buildImageFrameStyle } from '../../utils/build-image-frame-style'
import { DropZone } from '../dropzone/dropzone'
import { BackgroundLayer } from './background-layer'
import { CanvasFrameSlot } from './canvas-frame-slot'
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
  const aspectRatio = useEditorStore((state) => state.aspectRatio)

  const imageConfig = { padding, borderRadius, scale, offsetX, offsetY, shadow, aspectRatio }

  const emptyFrameStyle = {
    ...buildCanvasFrameBoxStyle(aspectRatio),
    ...buildImageFrameStyle(borderRadius, offsetX, offsetY, shadow),
  }

  return (
    <div
      data-testid="canvas-preview"
      className="absolute inset-0 flex items-center justify-center bg-neutral-950"
    >
      <div
        data-testid={CANVAS_EXPORT_SURFACE_TEST_ID}
        className="relative h-[90%] w-[90%] overflow-hidden rounded-3xl shadow-2xl"
      >
        <BackgroundLayer background={background} />
        {image ? (
          <ImageLayer image={image} config={imageConfig} />
        ) : (
          <CanvasFrameSlot
            padding={padding}
            scale={scale}
            frameStyle={emptyFrameStyle}
            frameClassName="bg-neutral-900"
            frameTestId="dropzone-frame"
          >
            <DropZone />
          </CanvasFrameSlot>
        )}
      </div>
    </div>
  )
}

export default CanvasPreview
