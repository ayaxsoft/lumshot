import {
  IconArrowsMoveHorizontal,
  IconArrowsMoveVertical,
  IconBorderCornerRounded,
  IconBoxPadding,
  IconResize,
} from '@tabler/icons-react'

import { useEditorStore } from '@/store/useEditorStore'

import { Slider } from '../ui/slider'
import { ShadowControls } from '../ui/shadow-controls'

export const ImagePanel = () => {
  const padding = useEditorStore((state) => state.padding)
  const setPadding = useEditorStore((state) => state.setPadding)

  const borderRadius = useEditorStore((state) => state.borderRadius)
  const setBorderRadius = useEditorStore((state) => state.setBorderRadius)

  const scale = useEditorStore((state) => state.scale)
  const setScale = useEditorStore((state) => state.setScale)

  const offsetX = useEditorStore((state) => state.offsetX)
  const offsetY = useEditorStore((state) => state.offsetY)
  const setOffset = useEditorStore((state) => state.setOffset)

  const shadow = useEditorStore((state) => state.shadow)
  const setShadow = useEditorStore((state) => state.setShadow)

  return (
    <div data-testid="image-panel" className="flex flex-col gap-2">
      <Slider
        icon={<IconBoxPadding stroke={1.5} />}
        label="Padding"
        value={padding}
        onChange={setPadding}
        min={0}
        max={100}
        step={1}
      />
      <Slider
        icon={<IconBorderCornerRounded stroke={1.5} />}
        label="Border Radius"
        value={borderRadius}
        onChange={setBorderRadius}
        min={0}
        max={100}
        step={1}
      />
      <Slider
        icon={<IconResize stroke={1.5} />}
        label="Scale"
        value={scale}
        onChange={setScale}
        min={0.5}
        max={1}
        step={0.01}
        formatValue={(nextScale) => `${Math.round(nextScale * 100)}%`}
      />
      <Slider
        icon={<IconArrowsMoveHorizontal stroke={1.5} />}
        label="Offset X"
        value={offsetX}
        onChange={(value) => setOffset(value, offsetY)}
        min={-100}
        max={100}
        step={1}
      />
      <Slider
        icon={<IconArrowsMoveVertical stroke={1.5} />}
        label="Offset Y"
        value={offsetY}
        onChange={(value) => setOffset(offsetX, value)}
        min={-100}
        max={100}
        step={1}
      />

      <ShadowControls shadow={shadow} onChange={setShadow} />
    </div>
  )
}
