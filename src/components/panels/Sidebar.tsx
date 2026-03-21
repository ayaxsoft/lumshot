import { Section } from '../ui/Section'

export const Sidebar = () => {
  return (
    <aside
      data-testid="sidebar"
      className="w-[300px] shrink-0 h-full overflow-y-auto border-r border-white/10"
    >
      <div className="flex flex-col gap-4 p-2">
        <Section title="Background" defaultOpen>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p>Background</p>
            </div>
          </div>
        </Section>
        <Section title="Image">
          <div className="flex flex-col gap-2"></div>
        </Section>
        <Section title="Canvas">
          <div className="flex flex-col gap-2"></div>
        </Section>
        <Section title="Export">
          <div className="flex flex-col gap-2"></div>
        </Section>
      </div>
    </aside>
  )
}
