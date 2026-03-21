import type { ReactNode } from 'react'

import {
  BackgroundTypeLinearGlyph,
  BackgroundTypeMeshGlyph,
  BackgroundTypeRadialGlyph,
  BackgroundTypeSolidGlyph,
} from '@/components/ui/background-type-glyphs'
import { TypeSelector } from '@/components/ui/type-selector'
import { useEditorStore } from '@/store/useEditorStore'
import type { BackgroundType, GradientConfig } from '@/store/types'
import { GradientPresets } from '../ui/gradient-presets'
import { ColorPicker } from '../ui/color-picker'

interface BackgroundPanelOption {
  value: BackgroundType
  label: string
  icon: ReactNode
}

interface BackgroundTypeIconTileProps {
  children: ReactNode
}

const BackgroundTypeIconTile = ({ children }: BackgroundTypeIconTileProps) => {
  return (
    <div
      className="flex size-full min-h-0 min-w-0 items-center justify-center rounded-md bg-white/5 text-white/65 [&_svg]:size-7 [&_svg]:shrink-0"
      aria-hidden
    >
      {children}
    </div>
  )
}

const BACKGROUND_OPTIONS: BackgroundPanelOption[] = [
  {
    value: 'gradient',
    label: 'Gradient',
    icon: (
      <BackgroundTypeIconTile>
        <BackgroundTypeLinearGlyph />
      </BackgroundTypeIconTile>
    ),
  },
  {
    value: 'solid',
    label: 'Solid',
    icon: (
      <BackgroundTypeIconTile>
        <BackgroundTypeSolidGlyph />
      </BackgroundTypeIconTile>
    ),
  },
  {
    value: 'radial',
    label: 'Radial',
    icon: (
      <BackgroundTypeIconTile>
        <BackgroundTypeRadialGlyph />
      </BackgroundTypeIconTile>
    ),
  },
  {
    value: 'mesh',
    label: 'Mesh',
    icon: (
      <BackgroundTypeIconTile>
        <BackgroundTypeMeshGlyph />
      </BackgroundTypeIconTile>
    ),
  },
]

export const BackgroundPanel = () => {
  const background = useEditorStore((state) => state.background)
  const setBackground = useEditorStore((state) => state.setBackground)

  const handleChange = (value: string) => {
    const option = BACKGROUND_OPTIONS.find((item) => item.value === value)
    if (!option) {
      return
    }
    const backgroundType = option.value
    if (backgroundType === 'radial') {
      setBackground({ type: backgroundType, gradient: { ...background.gradient, type: 'radial' } })
    } else if (backgroundType === 'mesh') {
      setBackground({ type: backgroundType, gradient: { ...background.gradient, type: 'mesh' } })
    } else if (backgroundType === 'gradient') {
      setBackground({ type: backgroundType, gradient: { ...background.gradient, type: 'linear' } })
    } else {
      setBackground({ type: backgroundType })
    }
  }

  const handleGradientChange = (config: GradientConfig) => {
    setBackground({ type: 'gradient', gradient: config })
  }

  const handleRadialPresetChange = (config: GradientConfig) => {
    setBackground({ type: 'radial', gradient: { ...config, type: 'radial' } })
  }

  const handleSolidChange = (color: string) => {
    setBackground({ type: 'solid', solid: color })
  }

  const handleMeshPresetChange = (config: GradientConfig) => {
    setBackground({ type: 'mesh', gradient: { ...config, type: 'mesh' } })
  }

  return (
    <div data-testid="background-panel" className="flex flex-col gap-3">
      <TypeSelector options={BACKGROUND_OPTIONS} value={background.type} onChange={handleChange} />
      {background.type === 'gradient' && (
        <div className="flex flex-col gap-2 border-t border-white/6 pt-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">Presets</p>
          <GradientPresets config={background.gradient} onChange={handleGradientChange} />
        </div>
      )}
      {background.type === 'solid' && (
        <div className="border-t border-white/6 pt-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/35 mb-2">
            Color
          </p>
          <ColorPicker value={background.solid} onChange={handleSolidChange} />
        </div>
      )}
      {background.type === 'radial' && (
        <div className="flex flex-col gap-2 border-t border-white/6 pt-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">Presets</p>
          <GradientPresets config={background.gradient} onChange={handleRadialPresetChange} />
        </div>
      )}
      {background.type === 'mesh' && (
        <div className="flex flex-col gap-2 border-t border-white/6 pt-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">Presets</p>
          <GradientPresets config={background.gradient} onChange={handleMeshPresetChange} />
        </div>
      )}
    </div>
  )
}
