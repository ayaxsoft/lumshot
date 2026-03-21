import { HexColorPicker } from 'react-colorful'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div data-testid="color-picker" className="w-full">
      <HexColorPicker color={value} onChange={onChange} />
    </div>
  )
}
