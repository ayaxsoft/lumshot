import { describe, it, expect } from 'vitest'

import { buildCanvasFrameBoxStyle } from '@/utils/build-canvas-frame-box-style'

describe('buildCanvasFrameBoxStyle', () => {
  it('should use width-first layout for landscape and square ratios', () => {
    expect(buildCanvasFrameBoxStyle('1:1')).toEqual({
      aspectRatio: '1 / 1',
      width: '100%',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    })
    expect(buildCanvasFrameBoxStyle('16:9')).toEqual({
      aspectRatio: '16 / 9',
      width: '100%',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    })
  })

  it('should use height-first layout for portrait ratios', () => {
    expect(buildCanvasFrameBoxStyle('9:16')).toEqual({
      aspectRatio: '9 / 16',
      height: '100%',
      width: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    })
    expect(buildCanvasFrameBoxStyle('4:5')).toEqual({
      aspectRatio: '4 / 5',
      height: '100%',
      width: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    })
  })

  it('should map additional landscape presets', () => {
    expect(buildCanvasFrameBoxStyle('3:2')).toEqual({
      aspectRatio: '3 / 2',
      width: '100%',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    })
    expect(buildCanvasFrameBoxStyle('5:4')).toEqual({
      aspectRatio: '5 / 4',
      width: '100%',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    })
  })

  it('should use natural aspect with width-first when image is wider than tall', () => {
    expect(buildCanvasFrameBoxStyle('auto', { naturalWidth: 800, naturalHeight: 600 })).toEqual({
      aspectRatio: '800 / 600',
      width: '100%',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    })
  })

  it('should use natural aspect with height-first when image is taller than wide', () => {
    expect(buildCanvasFrameBoxStyle('auto', { naturalWidth: 600, naturalHeight: 800 })).toEqual({
      aspectRatio: '600 / 800',
      height: '100%',
      width: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    })
  })

  it('should fall back to 16/9 landscape layout for auto without valid natural size', () => {
    expect(buildCanvasFrameBoxStyle('auto')).toEqual({
      aspectRatio: '16 / 9',
      width: '100%',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    })
    expect(buildCanvasFrameBoxStyle('auto', { naturalWidth: 0, naturalHeight: 100 })).toEqual({
      aspectRatio: '16 / 9',
      width: '100%',
      height: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    })
  })
})
