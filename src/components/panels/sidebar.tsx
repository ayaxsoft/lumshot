import { Section } from '@/components/ui/section'
import { useEditorStore } from '@/store/useEditorStore'
import { BackgroundPanel } from './background-panel'
import { CodePanel } from './code-panel'
import { ImagePanel } from './image-panel'
import { CanvasPanel } from './canvas-panel'
import { ExportPanel } from './export-panel'
import { IconPhoto, IconCode } from '@tabler/icons-react'
import type { EditorMode } from '@/store/types'

export const Sidebar = () => {
  const mode = useEditorStore((state) => state.mode)
  const setMode = useEditorStore((state) => state.setMode)

  const handleModeChange = (nextMode: EditorMode) => {
    setMode(nextMode)
  }

  return (
    <aside
      data-testid="sidebar"
      className="w-[300px] shrink-0 h-full flex flex-col border-r border-white/10"
    >
      {/* Mode switcher */}
      <div className="shrink-0 px-3 pt-3 pb-1">
        <div className="flex rounded-lg bg-white/5 p-0.5 gap-0.5">
          <button
            onClick={() => handleModeChange('image')}
            className={`flex flex-1 items-center justify-center gap-1.5 h-7 rounded-md text-xs transition-colors ${
              mode === 'image' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <IconPhoto size={13} stroke={1.75} />
            Image
          </button>
          <button
            onClick={() => handleModeChange('code')}
            className={`flex flex-1 items-center justify-center gap-1.5 h-7 rounded-md text-xs transition-colors ${
              mode === 'code' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <IconCode size={13} stroke={1.75} />
            Code
          </button>
        </div>
      </div>

      {/* Scrollable panels */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-3 p-2 pt-1">
          <Section title="Background" defaultOpen>
            <BackgroundPanel />
          </Section>
          {mode === 'image' ? (
            <Section title="Image" defaultOpen>
              <ImagePanel />
            </Section>
          ) : (
            <Section title="Code" defaultOpen>
              <CodePanel />
            </Section>
          )}
          <Section title="Canvas" defaultOpen={false}>
            <CanvasPanel />
          </Section>
        </div>
      </div>

      {/* Sticky export footer */}
      <div className="shrink-0 border-t border-white/10 p-3">
        <ExportPanel />
      </div>
    </aside>
  )
}
