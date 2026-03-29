import * as Dialog from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import { useState } from 'react'

const EMOJIS = ['🤬', '😐', '😏', '😎', '😍']
const EMOJI_LABELS = ['Very dissatisfied', 'Neutral', 'Somewhat satisfied', 'Satisfied', 'Love it']

interface FeedbackDialogProps {
  trigger: React.ReactNode
}

export const FeedbackDialog = ({ trigger }: FeedbackDialogProps) => {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      setRating(null)
      setMessage('')
    }
  }

  const handleSubmit = async () => {
    await window.lumshotAPI.sendFeedback({ rating, message })
    handleOpenChange(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] rounded-2xl bg-neutral-900 border border-white/10 p-6 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
          <div className="flex items-start justify-between mb-5">
            <div>
              <Dialog.Title className="text-base font-semibold text-white">
                Send feedback,
              </Dialog.Title>
              <Dialog.Description className="text-sm text-white/40">
                We read them all!
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white/50 hover:bg-white/15 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55"
            >
              <IconX size={14} stroke={2} aria-hidden />
            </Dialog.Close>
          </div>

          <div className="flex gap-2 mb-5" role="radiogroup" aria-label="Rating">
            {EMOJIS.map((emoji, index) => (
              <button
                key={index}
                role="radio"
                aria-checked={rating === index}
                aria-label={EMOJI_LABELS[index]}
                onClick={() => setRating(index)}
                className={`flex-1 h-11 text-2xl rounded-full bg-white/8 hover:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55 ${rating === index ? 'ring-2 ring-white/30' : ''}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          <label htmlFor="feedback-message" className="block text-sm text-white mb-3">
            How can we improve your experience?
          </label>

          <textarea
            id="feedback-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white/80 placeholder:text-white/25 resize-none focus-visible:outline-none focus-visible:border-white/20 transition-colors"
            placeholder="Tell us what you think…"
          />

          <button
            onClick={() => void handleSubmit()}
            className="w-full mt-3 h-10 rounded-xl bg-white text-neutral-900 text-sm font-medium hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
          >
            Send Feedback
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
