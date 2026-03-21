import { useId } from 'react'

import { BACKGROUND_TYPE_GLYPH_VIEWBOX_PX } from '@/constants'

const sanitizeDomIdFragment = (reactUseIdValue: string): string =>
  reactUseIdValue.split(':').join('')

export const BackgroundTypeLinearGlyph = () => {
  const gradientId = `btg-linear-${sanitizeDomIdFragment(useId())}`
  const size = BACKGROUND_TYPE_GLYPH_VIEWBOX_PX

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0.3} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.95} />
        </linearGradient>
      </defs>
      <rect x="3" y="5" width="18" height="14" rx="2.5" fill={`url(#${gradientId})`} />
    </svg>
  )
}

export const BackgroundTypeSolidGlyph = () => {
  const size = BACKGROUND_TYPE_GLYPH_VIEWBOX_PX

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" opacity={0.92} />
    </svg>
  )
}

export const BackgroundTypeRadialGlyph = () => {
  const gradientId = `btg-radial-${sanitizeDomIdFragment(useId())}`
  const size = BACKGROUND_TYPE_GLYPH_VIEWBOX_PX

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0.95} />
          <stop offset="55%" stopColor="currentColor" stopOpacity={0.35} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.07} />
        </radialGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="3" fill={`url(#${gradientId})`} />
    </svg>
  )
}

export const BackgroundTypeMeshGlyph = () => {
  const filterId = `btg-mesh-blur-${sanitizeDomIdFragment(useId())}`
  const size = BACKGROUND_TYPE_GLYPH_VIEWBOX_PX

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.25" />
        </filter>
      </defs>
      <ellipse
        cx="8"
        cy="10"
        rx="7"
        ry="5.5"
        fill="currentColor"
        opacity={0.22}
        filter={`url(#${filterId})`}
      />
      <ellipse
        cx="17"
        cy="14"
        rx="6.5"
        ry="7"
        fill="currentColor"
        opacity={0.18}
        filter={`url(#${filterId})`}
      />
      <ellipse
        cx="12"
        cy="7"
        rx="5.5"
        ry="5"
        fill="currentColor"
        opacity={0.26}
        filter={`url(#${filterId})`}
      />
    </svg>
  )
}
