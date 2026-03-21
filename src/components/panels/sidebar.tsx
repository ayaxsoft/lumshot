import { Section } from '@/components/ui/section'
import { BackgroundPanel } from './background-panel'

export const Sidebar = () => {
  return (
    <aside
      data-testid="sidebar"
      className="w-[350px] shrink-0 h-full overflow-y-auto border-r border-white/10"
    >
      <div className="flex flex-col gap-4 p-4">
        <Section title="Background" defaultOpen>
          <BackgroundPanel />
        </Section>
        <Section title="Image" defaultOpen>
          <div className="flex flex-col gap-2"></div>
        </Section>
        <Section title="Canvas" defaultOpen>
          <div className="flex flex-col gap-2"></div>
        </Section>
        <Section title="Export" defaultOpen>
          <div className="flex flex-col gap-2"></div>
        </Section>
      </div>
    </aside>
  )
}
