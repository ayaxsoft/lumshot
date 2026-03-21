import {
  MESH_BASE_LINEAR_ANGLE_DEG,
  MESH_FALLBACK_STOP_0_COLOR,
  MESH_FALLBACK_STOP_1_COLOR,
  MESH_RADIAL_LAYER_SPECS,
} from '../constants'
import { GradientConfig } from '../store/types'

const meshColorForStopIndex = (
  stops: GradientConfig['stops'],
  colorStopIndex: 0 | 1 | 2
): string => {
  const fromStops = stops[colorStopIndex]?.color
  if (fromStops) {
    return fromStops
  }
  if (colorStopIndex === 2) {
    return stops[0]?.color ?? MESH_FALLBACK_STOP_0_COLOR
  }
  return colorStopIndex === 0 ? MESH_FALLBACK_STOP_0_COLOR : MESH_FALLBACK_STOP_1_COLOR
}

export const buildMeshGradientCSS = (gradient: GradientConfig): string => {
  const { stops } = gradient
  const radialLayers = MESH_RADIAL_LAYER_SPECS.map(
    (layerSpec) =>
      `radial-gradient(ellipse ${layerSpec.ellipseWidthPercent}% ${layerSpec.ellipseHeightPercent}% at ${layerSpec.atXPercent}% ${layerSpec.atYPercent}%, ${meshColorForStopIndex(stops, layerSpec.colorStopIndex)} 0%, transparent ${layerSpec.transparentAtPercent}%)`
  )
  const baseStop0 = meshColorForStopIndex(stops, 0)
  const baseStop1 = meshColorForStopIndex(stops, 1)
  const baseLinear = `linear-gradient(${MESH_BASE_LINEAR_ANGLE_DEG}deg, ${baseStop0} 0%, ${baseStop1} 52%, ${baseStop0} 100%)`
  return [...radialLayers, baseLinear].join(', ')
}
