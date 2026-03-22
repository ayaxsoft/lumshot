import { useCallback, useState } from 'react'
import { EXPORT_RESOLUTION_MAX, EXPORT_RESOLUTION_MIN } from '@/constants'
import { ExportFormat } from '@/store/types'
import { captureCompositePreviewAsDataUrl } from '@/utils/capture-composite-preview-as-data-url'
import { TypeSelector } from '../ui/type-selector'
import { useEditorStore } from '@/store/useEditorStore'
import { IconDownload } from '@tabler/icons-react'
import { Slider } from '../ui/slider'

const EXPORT_OPTIONS: { label: string; value: ExportFormat }[] = [
  { label: 'PNG', value: 'png' },
  { label: 'WebP', value: 'webp' },
  { label: 'JPEG', value: 'jpeg' },
]

export const ExportPanel = () => {
  const image = useEditorStore((state) => state.image)
  const exportFormat = useEditorStore((state) => state.exportFormat)
  const setExportFormat = useEditorStore((state) => state.setExportFormat)
  const exportResolution = useEditorStore((state) => state.exportResolution)
  const setExportResolution = useEditorStore((state) => state.setExportResolution)

  const [exportError, setExportError] = useState<string | null>(null)

  const handleExport = useCallback(async () => {
    setExportError(null)
    if (image === null) {
      return
    }
    if (window.lumshotAPI === undefined) {
      setExportError('Export is only available in the desktop app.')
      return
    }

    let compositedDataUrl: string
    try {
      compositedDataUrl = await captureCompositePreviewAsDataUrl({
        exportResolution,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setExportError(message)
      return
    }

    const result = await window.lumshotAPI.exportImage({
      dataUrl: compositedDataUrl,
      format: exportFormat,
      resolution: exportResolution,
    })

    if (result.error) {
      setExportError(result.error)
    }
  }, [exportFormat, exportResolution, image])

  const canExport = image !== null

  return (
    <div data-testid="export-panel" className="flex flex-col gap-2">
      <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">Export</p>
      <TypeSelector
        options={EXPORT_OPTIONS}
        value={exportFormat}
        onChange={(value) => setExportFormat(value as ExportFormat)}
      />

      <Slider
        label="Resolution"
        value={exportResolution}
        onChange={setExportResolution}
        min={EXPORT_RESOLUTION_MIN}
        max={EXPORT_RESOLUTION_MAX}
        step={1}
        formatValue={(value) => `${value}x`}
      />

      <button
        type="button"
        disabled={!canExport}
        onClick={() => void handleExport()}
        className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-4 py-3.5 text-sm font-semibold tracking-tight text-neutral-950 shadow-lg shadow-black/35 transition-[transform,box-shadow,background-color] duration-200 ease-out hover:bg-zinc-100 hover:shadow-xl hover:shadow-black/40 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none"
      >
        <IconDownload stroke={2} className="size-4.5 shrink-0 opacity-90" aria-hidden />
        Export
      </button>
      {exportError !== null ? (
        <p className="text-center text-xs leading-snug text-red-400/90" role="alert">
          {exportError}
        </p>
      ) : null}
    </div>
  )
}
