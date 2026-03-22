import CanvasPreview from '@/components/canvas/canvas-preview'
import { Sidebar } from '@/components/panels/sidebar'
import { ReplaceImageDialog } from '@/components/ui/replace-image-dialog'
import { usePasteImage } from './hooks/use-paste-image'

const App = () => {
  usePasteImage()

  return (
    <div className="flex flex-col w-screen h-screen bg-neutral-900">
      <div className="drag-region relative flex items-center justify-center h-10 shrink-0 bg-neutral-950 border-b border-white/5">
        <span className="text-[11px] font-medium text-white/30 select-none">Lumshot</span>
      </div>
      <ReplaceImageDialog />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 relative">
          <CanvasPreview />
        </main>
      </div>
    </div>
  )
}

export default App
