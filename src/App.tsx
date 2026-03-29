import CanvasPreview from '@/components/canvas/canvas-preview'
import { Sidebar } from '@/components/panels/sidebar'
import { ReplaceImageDialog } from '@/components/ui/replace-image-dialog'
import { TooltipProvider } from '@/components/ui/tooltip'
import { usePasteImage } from './hooks/use-paste-image'
import { Toolbar } from './components/toolbar/toolbar'

const App = () => {
  usePasteImage()

  return (
    <TooltipProvider>
      <div className="flex flex-col w-screen h-screen bg-neutral-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-1.5 focus:text-xs focus:bg-neutral-900 focus:text-white focus:rounded-lg focus:ring-1 focus:ring-white/30"
        >
          Skip to main content
        </a>
        <div className="drag-region relative flex items-center justify-center h-10 shrink-0 bg-neutral-950 border-b border-white/5">
          <h1 className="text-[11px] font-medium text-white select-none">Lumshot</h1>
        </div>
        <ReplaceImageDialog />
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <main id="main-content" className="flex-1 flex flex-col min-h-0">
            <Toolbar />
            <div className="flex-1 relative">
              <CanvasPreview />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default App
