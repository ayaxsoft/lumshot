import { Section } from '@/components/ui/section'
import { BackgroundPanel } from './background-panel'
import { ImagePanel } from './image-panel'
import { CanvasPanel } from './canvas-panel'
import { ExportPanel } from './export-panel'

export const Sidebar = () => {
  return (
    <aside
      data-testid="sidebar"
      className="w-[350px] shrink-0 h-full overflow-y-auto border-r border-white/10"
    >
      <div className="flex flex-col gap-4 p-2">
        <Section title="Background" defaultOpen>
          <BackgroundPanel />
        </Section>
        <Section title="Image" defaultOpen>
          <ImagePanel />
        </Section>
        <Section title="Canvas" defaultOpen>
          <CanvasPanel />
        </Section>
        <Section title="Export" defaultOpen>
          <ExportPanel />
        </Section>
      </div>
    </aside>
  )
}
