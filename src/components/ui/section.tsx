import { useId, useState, type ReactNode } from 'react'
import { IconPlus, IconMinus } from '@tabler/icons-react'
import { cn } from '@/utils/cn'

interface SectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export const Section = ({ title, children, defaultOpen = true }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <div className="flex flex-col gap-2" data-testid="section">
      <button
        type="button"
        data-testid="section-button"
        className={cn(
          'flex w-full items-center justify-between px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left',
          isOpen && 'text-white bg-white/5'
        )}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <h3 className="text-xs font-medium uppercase tracking-wider">{title}</h3>
        <IconPlus className={cn('h-4 w-4 shrink-0', isOpen && 'hidden')} aria-hidden />
        <IconMinus className={cn('h-4 w-4 shrink-0', !isOpen && 'hidden')} aria-hidden />
      </button>
      <div
        id={panelId}
        role="region"
        aria-label={title}
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none',
          isOpen ? 'grid-rows-[minmax(0,1fr)]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-4 pb-2 pt-2">{children}</div>
        </div>
      </div>
    </div>
  )
}
