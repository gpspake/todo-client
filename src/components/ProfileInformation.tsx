import React, { useCallback, useEffect, useRef } from 'react'

export const ProfileInformation: React.FC<{ onClose: any }> = (
  { onClose, children }
) => {
  const ref = useRef(null)
  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [])
  
  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!(ref.current! as any).contains(e.target)) {
        onClose?.() // using optional chaining here, change to onClose && onClose(), if required
      }
    },
    [ref.current],
  )
  
  // Below is the 10 lines of code you need.
  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener('click', clickListener)
    document.addEventListener('keyup', escapeListener)
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener('click', clickListener)
      document.removeEventListener('keyup', escapeListener)
    }
  }, [])
  
  return <div ref={ref}>{children}</div>
}
