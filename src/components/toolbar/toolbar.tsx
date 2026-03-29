import { useEditorHistory } from '@/hooks/use-editor-history'
import { useEditorStore } from '@/store/useEditorStore'
import { FeedbackDialog } from '@/components/ui/feedback-dialog'
import { Tooltip } from '@/components/ui/tooltip'
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconMessageCircle,
  IconRefresh,
} from '@tabler/icons-react'

export const Toolbar = () => {
  const reset = useEditorStore((state) => state.reset)
  const { undo, redo, canRedo, canUndo } = useEditorHistory()

  return (
    <div className="h-10 shrink-0 flex items-center px-3 gap-1 bg-neutral-900 border-b border-white/5">
      <Tooltip content="Undo" side="bottom">
        <button
          aria-label="Undo"
          onClick={() => void undo()}
          disabled={!canUndo}
          className="no-drag-region flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55"
        >
          <IconArrowBackUp size={15} stroke={1.75} aria-hidden />
        </button>
      </Tooltip>
      <Tooltip content="Redo" side="bottom">
        <button
          aria-label="Redo"
          onClick={() => void redo()}
          disabled={!canRedo}
          className="no-drag-region flex items-center justify-center w-7 h-7 rounded-md text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55"
        >
          <IconArrowForwardUp size={15} stroke={1.75} aria-hidden />
        </button>
      </Tooltip>

      <div className="w-px h-4 bg-white/10 mx-1" />

      <Tooltip content="Reset all changes" side="bottom">
        <button
          onClick={() => {
            void reset()
            useEditorStore.temporal.getState().clear()
          }}
          className="no-drag-region flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55"
        >
          <IconRefresh size={13} stroke={1.75} aria-hidden />
          Start Over
        </button>
      </Tooltip>

      <div className="flex-1" />

      <FeedbackDialog
        trigger={
          <button className="no-drag-region flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55">
            <IconMessageCircle size={13} stroke={1.75} aria-hidden />
            Feedback
          </button>
        }
      />
    </div>
  )
}
