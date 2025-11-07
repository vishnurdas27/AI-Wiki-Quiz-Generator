import React from 'react'

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    // 1. Overlay: 
    //  - Added onClick={onClose} to close the modal when clicking the background.
    //  - Added backdrop-blur-sm for a modern frosted glass effect.
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card max-w-4xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="btn">Close</button>
        </div>
        {children}
      </div>
    </div>
  )
}