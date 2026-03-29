import { useCallback, useState } from 'react'
import { ExportFormat } from '@/store/types'
import { captureCompositePreviewAsDataUrl } from '@/utils/capture-composite-preview-as-data-url'
import { useEditorStore } from '@/store/useEditorStore'
import { IconDownload } from '@tabler/icons-react'
import { ExportToast } from '../ui/export-toast'

const EXPORT_FORMATS: { label: string; value: ExportFormat }[] = [
  { label: 'PNG', value: 'png' },
  { label: 'WebP', value: 'webp' },
  { label: 'JPEG', value: 'jpeg' },
]

const EXPORT_RESOLUTIONS: { label: string; value: 1 | 2 | 3 }[] = [
  { label: '1x', value: 1 },
  { label: '2x', value: 2 },
  { label: '3x', value: 3 },
]

export const ExportPanel = () => {
  const mode = useEditorStore((state) => state.mode)
  const image = useEditorStore((state) => state.image)
  const exportFormat = useEditorStore((state) => state.exportFormat)
  const setExportFormat = useEditorStore((state) => state.setExportFormat)
  const exportResolution = useEditorStore((state) => state.exportResolution)
  const setExportResolution = useEditorStore((state) => state.setExportResolution)

  const [exportError, setExportError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [exportedFilePath, setExportedFilePath] = useState<string | null>(null)

  const handleExport = useCallback(async () => {
    if (isExporting || (mode !== 'code' && image === null)) return
    setExportError(null)
    setIsExporting(true)

    if (window.lumshotAPI === undefined) {
      setExportError('Export is only available in the desktop app.')
      setIsExporting(false)
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
      setIsExporting(false)
      return
    }

    const result = await window.lumshotAPI.exportImage({
      dataUrl: compositedDataUrl,
      format: exportFormat,
      resolution: exportResolution,
    })

    if (result.error) {
      setExportError(result.error)
    } else if (result.filePath) {
      setExportedFilePath(result.filePath)
    }
    setIsExporting(false)
  }, [isExporting, exportFormat, exportResolution, image, mode])

  const canExport = mode === 'code' || image !== null

  return (
    <div data-testid="export-panel" className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {/* Format pills */}
        <div
          role="radiogroup"
          aria-label="Export format"
          className="flex flex-1 rounded-lg bg-white/5 p-0.5 gap-0.5"
        >
          {EXPORT_FORMATS.map((fmt) => (
            <button
              key={fmt.value}
              type="button"
              role="radio"
              aria-checked={exportFormat === fmt.value}
              onClick={() => setExportFormat(fmt.value)}
              className={`flex flex-1 items-center justify-center h-6 rounded-md text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/55 ${
                exportFormat === fmt.value
                  ? 'bg-white/15 text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        {/* Resolution pills */}
        <div
          role="radiogroup"
          aria-label="Export resolution"
          className="flex rounded-lg bg-white/5 p-0.5 gap-0.5"
        >
          {EXPORT_RESOLUTIONS.map((res) => (
            <button
              key={res.value}
              type="button"
              role="radio"
              aria-checked={exportResolution === res.value}
              onClick={() => setExportResolution(res.value)}
              className={`flex w-8 items-center justify-center h-6 rounded-md text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/55 ${
                exportResolution === res.value
                  ? 'bg-white/15 text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {res.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={!canExport || isExporting}
        onClick={() => void handleExport()}
        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-white px-4 text-sm font-semibold tracking-tight text-neutral-950 shadow-lg shadow-black/35 transition-[transform,box-shadow,background-color] duration-200 ease-out hover:bg-zinc-100 hover:shadow-xl hover:shadow-black/40 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none"
      >
        <IconDownload stroke={2} className="size-4.5 shrink-0 opacity-90" aria-hidden />
        Export Image
      </button>

      {exportError !== null ? (
        <p className="text-center text-xs leading-snug text-red-400/90" role="alert">
          {exportError}
        </p>
      ) : null}

      {exportedFilePath !== null && (
        <ExportToast filePath={exportedFilePath} onDismiss={() => setExportedFilePath(null)} />
      )}
    </div>
  )
}
