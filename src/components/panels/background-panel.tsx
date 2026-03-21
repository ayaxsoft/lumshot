import type { ReactNode } from 'react'

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

const BACKGROUND_OPTIONS: BackgroundPanelOption[] = [
  {
    value: 'gradient',
    label: 'Gradient',
    icon: (
      <div
        className="size-full rounded-md"
        style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}
      />
    ),
  },
  {
    value: 'solid',
    label: 'Solid',
    icon: <div className="size-full rounded-md bg-blue-500" />,
  },
  {
    value: 'radial',
    label: 'Radial',
    icon: (
      <div
        className="size-full rounded-md"
        style={{ background: 'radial-gradient(circle, #8B5CF6, #1a1a2e)' }}
      />
    ),
  },
  {
    value: 'mesh',
    label: 'Mesh',
    icon: (
      <div
        className="size-full rounded-md"
        style={{
          background:
            'radial-gradient(ellipse 95% 80% at 8% 12%, #EC4899 0%, transparent 58%), radial-gradient(ellipse 85% 95% at 95% 8%, #8B5CF6 0%, transparent 52%), linear-gradient(160deg, #EC4899 0%, #8B5CF6 52%, #EC4899 100%)',
        }}
      />
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
