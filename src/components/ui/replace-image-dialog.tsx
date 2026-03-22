import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { useEditorStore } from '@/store/useEditorStore'

export const ReplaceImageDialog = () => {
  const pendingImage = useEditorStore((state) => state.pendingImage)
  const confirmPendingImage = useEditorStore((state) => state.confirmPendingImage)
  const clearPendingImage = useEditorStore((state) => state.clearPendingImage)

  return (
    <AlertDialog.Root open={pendingImage !== null}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 rounded-xl bg-neutral-900 border border-white/10 p-5 shadow-2xl">
          <AlertDialog.Title className="text-sm font-medium text-white mb-1">
            Replace image?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-xs text-white/50 mb-5">
            There is already an image loaded. Do you want to replace it?
          </AlertDialog.Description>
          <div className="flex justify-end gap-2">
            <AlertDialog.Cancel
              onClick={clearPendingImage}
              className="px-3 py-1.5 text-xs rounded-lg bg-white/10 text-white/70 hover:bg-white/15 hover:text-white transition-colors"
            >
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={confirmPendingImage}
              className="px-3 py-1.5 text-xs rounded-lg bg-white text-neutral-900 font-medium hover:bg-white/90 transition-colors"
            >
              Replace
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
