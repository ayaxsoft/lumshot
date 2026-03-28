import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent, createEvent } from '@testing-library/react'
import { DropZone } from '@/components/dropzone/dropzone'

const { setPendingImage } = vi.hoisted(() => ({
  setPendingImage: vi.fn(),
}))

vi.mock('@/store/useEditorStore', () => ({
  useEditorStore: (selector: (s: { setPendingImage: typeof setPendingImage }) => unknown) =>
    selector({ setPendingImage }),
}))

const stubImageConstructor = () => {
  const Original = globalThis.Image
  globalThis.Image = class MockImage {
    width = 200
    height = 100
    onload: (() => void) | null = null
    set src(_: string) {
      queueMicrotask(() => this.onload?.())
    }
  } as unknown as typeof Image
  return () => {
    globalThis.Image = Original
  }
}

const stubFileReader = (result: string) => {
  const Original = globalThis.FileReader
  globalThis.FileReader = class MockFileReader {
    onload: ((ev: ProgressEvent<FileReader>) => void) | null = null
    readAsDataURL(file: Blob) {
      void file
      queueMicrotask(() => {
        this.onload?.({ target: { result } } as ProgressEvent<FileReader>)
      })
    }
  } as unknown as typeof FileReader
  return () => {
    globalThis.FileReader = Original
  }
}

describe('DropZone', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.lumshotAPI = {
      openFile: vi.fn(),
      exportImage: vi.fn().mockResolvedValue({ success: true }),
      openExportedFile: vi.fn().mockResolvedValue(undefined),
      sendFeedback: vi.fn().mockResolvedValue({ success: true }),
    }
  })

  it('should render the drop zone', () => {
    render(<DropZone />)
    expect(screen.getByText('Add an image')).toBeInTheDocument()
    expect(
      screen.getByText('Drop a file here, click to browse, or paste from the clipboard')
    ).toBeInTheDocument()
  })

  it('should call openFile and setPendingImage when clicking on the drop zone', async () => {
    const meta = {
      path: '/tmp/x.png',
      dataUrl: 'data:image/png;base64,AA',
      naturalWidth: 10,
      naturalHeight: 20,
    }
    vi.mocked(window.lumshotAPI.openFile).mockResolvedValue(meta)

    render(<DropZone />)
    fireEvent.click(screen.getByTestId('dropzone'))

    await waitFor(() => {
      expect(setPendingImage).toHaveBeenCalledWith(meta)
    })
  })

  it('should not call setPendingImage if openFile returns null', async () => {
    vi.mocked(window.lumshotAPI.openFile).mockResolvedValue(null)

    render(<DropZone />)
    fireEvent.click(screen.getByTestId('dropzone'))

    await waitFor(() => {
      expect(window.lumshotAPI.openFile).toHaveBeenCalled()
    })
    expect(setPendingImage).not.toHaveBeenCalled()
  })

  it('should update the image with the dimensions read when dropping a file', async () => {
    const restoreReader = stubFileReader('data:image/png;base64,AAA')
    const restoreImage = stubImageConstructor()

    render(<DropZone />)
    const zone = screen.getByTestId('dropzone')

    const file = new File(['x'], 'foto.png', { type: 'image/png' })
    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(file)

    fireEvent.drop(zone, { dataTransfer })

    await waitFor(() => {
      expect(setPendingImage).toHaveBeenCalledWith({
        path: 'foto.png',
        dataUrl: 'data:image/png;base64,AAA',
        naturalWidth: 200,
        naturalHeight: 100,
      })
    })

    restoreReader()
    restoreImage()
  })

  it('should prevent the default behavior when dragging over the drop zone', () => {
    render(<DropZone />)
    const zone = screen.getByTestId('dropzone')
    const ev = createEvent.dragOver(zone)
    fireEvent(zone, ev)
    expect(ev.defaultPrevented).toBe(true)
  })
})
