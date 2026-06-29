import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { overlayVariants, modalPanelVariants } from '@/lib/motion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, children, className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const timer = setTimeout(() => panelRef.current?.focus(), 0)

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Trap focus within panel
      if (e.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Portal to document.body so CSS transforms on ancestor elements
  // don't break position:fixed (which uses the nearest transform ancestor
  // as its containing block instead of the viewport)
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 sm:py-10"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            variants={modalPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            tabIndex={-1}
            className={cn(
              'relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto outline-none',
              'rounded-2xl border border-white/10 bg-neutral-900/95 backdrop-blur-md shadow-2xl',
              '[&::-webkit-scrollbar]:hidden [scrollbar-width:none]',
              className,
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
