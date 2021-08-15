import React, { useEffect } from 'react'

export default function Modal({ isOpen, children, onRequestClose, afterOpenModal }) {
  useEffect(() => {
    if (isOpen && afterOpenModal) afterOpenModal()
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div className="modal-overlay" style={!isOpen ? { display: 'none' } : {}}>
        <div className="modal">
        <button className="button-clear float-right" onClick={onRequestClose}>close</button>
          {children}
        </div>
      </div>
    </>
  )
}