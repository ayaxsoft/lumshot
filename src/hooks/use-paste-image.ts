import { useEditorStore } from '@/store/useEditorStore'
import { useEffect } from 'react'

export const usePasteImage = () => {
  const setPendingImage = useEditorStore((state) => state.setPendingImage)

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items
      if (items === undefined) return

      for (const item of items) {
        if (!item.type.startsWith('image/')) continue

        const blob = item.getAsFile()
        if (blob === null) continue

        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result
          if (typeof result !== 'string') return
          const img = new Image()
          img.onload = () => {
            setPendingImage({
              path: blob.name || 'clipboard',
              dataUrl: result,
              naturalWidth: img.width,
              naturalHeight: img.height,
            })
          }
          img.src = result
        }
        reader.readAsDataURL(blob)
        break
      }
    }

    document.addEventListener('paste', handlePaste)

    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [setPendingImage])
}
