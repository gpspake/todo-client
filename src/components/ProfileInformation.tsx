import React, { useCallback, useEffect, useRef } from 'react'

export const ProfileInformation: React.FC<{ onClose: () => void, children: React.ReactNode }> = (
  { onClose, children }
) => {
  const ref = useRef<HTMLDivElement>(null);
  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (ref.current as HTMLDivElement && !(ref.current as HTMLDivElement).contains(e.target as Node)) {
        onClose?.() // using optional chaining here, change to onClose && onClose(), if required
      }
    },
    [onClose]
  )

  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener('click', clickListener, {capture: true})
    document.addEventListener('keyup', escapeListener, {capture: true})
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener('click', clickListener)
      document.removeEventListener('keyup', escapeListener)
    }
  }, [clickListener, escapeListener])

  return <div ref={ref}>{children}</div>
}
