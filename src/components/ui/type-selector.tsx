import type { ReactNode } from 'react'

import { SwatchTileButton } from '@/components/ui/swatch-tile-button'

interface TypeSelectorOption {
  label: string
  value: string
  icon?: ReactNode
}

interface TypeSelectorProps {
  options: TypeSelectorOption[]
  value: string
  onChange: (value: string) => void
}

export const TypeSelector = ({ options, value, onChange }: TypeSelectorProps) => {
  const columnCount = options.length

  return (
    <div
      data-testid="type-selector"
      role="radiogroup"
      aria-label="Tipo de fondo"
      className="grid w-full gap-x-2 gap-y-2"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {options.map((option) => (
        <SwatchTileButton
          key={option.value}
          label={option.label}
          isSelected={option.value === value}
          onClick={() => onChange(option.value)}
          preview={option.icon}
        />
      ))}
    </div>
  )
}
