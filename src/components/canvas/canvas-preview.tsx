import { useEffect, useMemo, useRef, useState } from 'react'
import { CANVAS_EXPORT_SURFACE_TEST_ID } from '@/constants'
import { useEditorStore } from '../../store/useEditorStore'
import { buildCanvasFrameBoxStyle } from '../../utils/build-canvas-frame-box-style'
import { buildImageFrameStyle } from '../../utils/build-image-frame-style'
import { resolveCanvasAspectRatioNumber } from '../../utils/resolve-canvas-aspect-ratio-number'
import { DropZone } from '../dropzone/dropzone'
import { BackgroundLayer } from './background-layer'
import { CanvasFrameSlot } from './canvas-frame-slot'
import { ImageLayer } from './image-layer'

const CANVAS_FIT_FACTOR = 0.9

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

  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setContainerSize({ width, height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const imageConfig = useMemo(
    () => ({ padding, borderRadius, scale, offsetX, offsetY, shadow, aspectRatio }),
    [padding, borderRadius, scale, offsetX, offsetY, shadow, aspectRatio]
  )

  const surfaceStyle = useMemo(() => {
    const { width: cw, height: ch } = containerSize
    if (cw === 0 || ch === 0)
      return { width: 0, height: 0, transition: 'width 0.3s ease, height 0.3s ease' }

    const ratio = resolveCanvasAspectRatioNumber(
      aspectRatio,
      image ? { naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight } : undefined
    )
    const maxW = cw * CANVAS_FIT_FACTOR
    const maxH = ch * CANVAS_FIT_FACTOR
    let w = maxW
    let h = w / ratio
    if (h > maxH) {
      h = maxH
      w = h * ratio
    }
    return { width: `${w}px`, height: `${h}px`, transition: 'width 0.3s ease, height 0.3s ease' }
  }, [containerSize, aspectRatio, image])

  const emptyFrameStyle = useMemo(
    () => ({
      ...buildCanvasFrameBoxStyle(aspectRatio),
      ...buildImageFrameStyle(borderRadius, offsetX, offsetY, shadow),
    }),
    [aspectRatio, borderRadius, offsetX, offsetY, shadow]
  )

  return (
    <div
      ref={containerRef}
      data-testid="canvas-preview"
      className="absolute inset-0 flex items-center justify-center bg-neutral-950"
    >
      <div
        data-testid={CANVAS_EXPORT_SURFACE_TEST_ID}
        className="relative overflow-hidden rounded-3xl shadow-2xl"
        style={surfaceStyle}
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
