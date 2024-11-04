import React, { useEffect, useRef } from 'react'

export default function Modal({ id, title, content, isOpen, isClose, onEmit }) {
  const refModal = useRef(null)
  
  document.onkeydown = function(evt) {
    if (evt.code === 'Escape') isClose(false)
  }

  useEffect(() => {
    refModal.current.scroll(0, 0)
  }, [isOpen])
  return (
    // <dialog id={id} className={`modal ${isOpen && 'modal-open'}`} onKeyUp={(e) => e.code === 'Escape' && isClose(false)}>
    <dialog id={id} className={`modal ${isOpen && 'modal-open'} modal-bottom sm:modal-middle`}>
      <div className="modal-box" ref={refModal}>
        <h3 className="font-bold text-lg">{ title }</h3>
        <p className="py-4 whitespace-pre">{ (content) }</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn mr-2 bg-red-400" onClick={() => {isClose(false), onEmit()}}>Confirm</button>
            <button className="btn" onClick={() => isClose(false)}>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
