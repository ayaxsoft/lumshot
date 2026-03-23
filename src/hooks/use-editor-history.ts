import { useShallow } from 'zustand/react/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'

import { useEditorStore } from '@/store/useEditorStore'

export const useEditorHistory = () =>
  useStoreWithEqualityFn(
    useEditorStore.temporal,
    useShallow((state) => ({
      undo: state.undo,
      redo: state.redo,
      canUndo: state.pastStates.length > 0,
      canRedo: state.futureStates.length > 0,
    }))
  )
