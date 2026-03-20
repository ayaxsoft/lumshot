import { useEditorStore } from '../../store/useEditorStore'
import { useCallback } from 'react'

const DropZone = () => {
  const setImage = useEditorStore((state) => state.setImage)

  const handleOpen = async () => {
    const image = await window.lumshotAPI.openFile()
    if (image) {
      console.log('image opened', image.naturalWidth, image.naturalHeight)
      setImage(image)
    }
  }

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const files = event.dataTransfer.files
      if (files.length === 0) return

      const [file] = files
      const reader = new FileReader()
      reader.onload = (ev) => {
        const image = new Image()
        image.onload = () => {
          console.log('image loaded', image.width, image.height)
          setImage({
            path: file.name,
            dataUrl: ev.target?.result as string,
            naturalWidth: image.width,
            naturalHeight: image.height,
          })
        }
        image.src = ev.target?.result as string
      }
      reader.readAsDataURL(file)
    },
    [setImage]
  )

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div
      onClick={handleOpen}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex flex-col items-center justify-center w-full h-full gap-4 cursor-pointer select-none text-white/40 hover:text-white/70 transition-colors"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <p className="text-sm">Drop an image or click to open</p>
    </div>
  )
}

export default DropZone
