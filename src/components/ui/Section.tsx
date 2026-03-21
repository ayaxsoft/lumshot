import { useId, useState, type ReactNode } from 'react'
import { IconPlus, IconMinus } from '@tabler/icons-react'
import { cn } from '@/utils/cn'

interface SectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export const Section = ({ title, children, defaultOpen = false }: SectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <div className="flex flex-col gap-2" data-testid="section">
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <h3 className="text-xs font-medium uppercase tracking-wider">{title}</h3>
        <IconPlus className={cn('h-4 w-4 transition-transform', isOpen && 'hidden')} aria-hidden />
        <IconMinus
          className={cn('h-4 w-4 transition-transform', !isOpen && 'hidden')}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-label={title}
        className={cn(
          'grid transition-all duration-200',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="px-3 pb-2">{children}</div>
        </div>
      </div>
    </div>
  )
}
