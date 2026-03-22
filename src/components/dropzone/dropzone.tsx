import { IconPhotoPlus } from '@tabler/icons-react'
import { useCallback } from 'react'

import { DROPZONE_ICON_SIZE_PX, DROPZONE_ICON_STROKE } from '@/constants'
import { useEditorStore } from '@/store/useEditorStore'

export const DropZone = () => {
  const setPendingImage = useEditorStore((state) => state.setPendingImage)

  const handleOpen = async () => {
    const image = await window.lumshotAPI.openFile()
    if (image) {
      setPendingImage(image)
    }
  }

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const files = event.dataTransfer.files
      if (files.length === 0) return

      const [file] = files
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result
        if (typeof result !== 'string') return
        const image = new Image()
        image.onload = () => {
          setPendingImage({
            path: file.name,
            dataUrl: result,
            naturalWidth: image.width,
            naturalHeight: image.height,
          })
        }
        image.src = result
      }
      reader.readAsDataURL(file)
    },
    [setPendingImage]
  )

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div
      data-testid="dropzone"
      onClick={handleOpen}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="group flex flex-col items-center justify-center w-full h-full gap-5 cursor-pointer select-none px-4"
    >
      <IconPhotoPlus
        size={DROPZONE_ICON_SIZE_PX}
        stroke={DROPZONE_ICON_STROKE}
        className="text-white/45 transition-[color,transform] duration-200 group-hover:text-white/85 group-hover:scale-105"
        aria-hidden
      />
      <div className="flex flex-col items-center gap-1.5 text-center max-w-xs">
        <p className="text-sm font-medium tracking-tight text-white/75 transition-colors duration-200 group-hover:text-white/95">
          Add an image
        </p>
        <p className="text-xs leading-relaxed text-white/38 transition-colors duration-200 group-hover:text-white/55">
          Drop a file here, click to browse, or paste from the clipboard
        </p>
      </div>
    </div>
  )
}
