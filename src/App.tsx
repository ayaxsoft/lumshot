import CanvasPreview from './components/canvas/CanvasPreview'
import { Sidebar } from './components/panels/Sidebar'

function App() {
  return (
    <div className="flex w-screen h-screen bg-neutral-900">
      <Sidebar />
      <main className="flex-1 relative">
        <CanvasPreview />
      </main>
    </div>
  )
}

export default App
