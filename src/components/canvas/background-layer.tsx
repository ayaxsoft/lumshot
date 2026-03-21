import { BackgroundConfig } from '../../store/types'
import { buildBackgroundCSS } from '../../utils/build-background-css'

interface BackgroundLayerProps {
  background: BackgroundConfig
}

export const BackgroundLayer = ({ background }: BackgroundLayerProps) => {
  return (
    <div
      className="absolute inset-0"
      style={{ background: buildBackgroundCSS(background) }}
      data-testid="background-layer"
    />
  )
}
