import CanvasPreview from '@/components/canvas/canvas-preview'
import { Sidebar } from '@/components/panels/sidebar'

export default function App() {
  return (
    <div className="flex w-screen h-screen bg-neutral-900">
      <Sidebar />
      <main className="flex-1 relative">
        <CanvasPreview />
      </main>
    </div>
  )
}
