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

  if (!image) {
    return <DropZone />
  }

  return (
    <div data-testid="canvas-preview" className="absolute inset-0">
      <BackgroundLayer background={background} />
      <ImageLayer image={image} config={imageConfig} />
    </div>
  )
}

export default CanvasPreview
