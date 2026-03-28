import { useEffect, useCallback } from 'react'
import { IconCheck, IconExternalLink, IconX } from '@tabler/icons-react'

interface ExportToastProps {
  filePath: string
  onDismiss: () => void
}

const AUTO_DISMISS_MS = 5000

export const ExportToast = ({ filePath, onDismiss }: ExportToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [onDismiss])

  const handleOpen = useCallback(() => {
    if (window.lumshotAPI) {
      void window.lumshotAPI.openExportedFile(filePath)
    }
    onDismiss()
  }, [filePath, onDismiss])

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-xl bg-neutral-800 border border-white/10 px-4 py-3 shadow-2xl shadow-black/50 animate-in"
      style={{ animation: 'toast-in 0.22s cubic-bezier(0.34,1.56,0.64,1) both' }}
    >
      {/* Check icon */}
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 shrink-0">
        <IconCheck size={13} stroke={2.5} className="text-emerald-400" />
      </span>

      {/* Message */}
      <span className="text-sm text-white/80 whitespace-nowrap">Image exported</span>

      {/* Open button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-1.5 ml-1 rounded-lg bg-white/10 hover:bg-white/18 px-3 py-1.5 text-xs font-medium text-white transition-colors"
      >
        <IconExternalLink size={12} stroke={2} />
        Open
      </button>

      {/* Dismiss */}
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="flex items-center justify-center w-5 h-5 rounded-md text-white/30 hover:text-white/70 transition-colors"
      >
        <IconX size={13} stroke={2} />
      </button>
    </div>
  )
}
