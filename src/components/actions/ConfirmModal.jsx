import React, { useEffect, useRef, useState } from 'react'
import InputForm from '../form/InputForm'

export default function ConfirmModal({ id, type, title, content, isOpen, isClose, onEmit }) {
  const refModal = useRef(null)
  const [rename, setRename] = useState('')
  
  document.onkeydown = function(evt) {
    if (evt.code === 'Escape') {
      isClose()
    }
  }

  const handleEmit = () => {
    if (type === 'rename') {
      onEmit(rename)
    } else if (type === 'delete') {
      onEmit()
    }
  }

  useEffect(() => {
    // refModal.current.scroll(0, 0)
    if (type === 'rename' && content) setRename(content)
  }, [isOpen])

  return (
    <dialog id={id} className={`modal ${isOpen && 'modal-open'}`}>
      <div className="modal-box min-w-fit" ref={refModal}>
        <h3 className="font-bold text-lg mb-4">{ title }</h3>
        {
          type === 'rename' ? <><InputForm value={rename} onEmit={(value) => setRename(value)} onKeyDown={(code) => code === 'Enter' && handleEmit() } required /></> : <div dangerouslySetInnerHTML={{ __html: content }} />
        }
        
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn mr-4" onClick={() => isClose(false)}>Close</button>
            <button className={`btn text-white ${type === 'delete' ? 'bg-red-500 hover:bg-red-600' : type === 'rename' ? 'bg-green-500 hover:bg-green-600' : ''}`} onClick={() => handleEmit()}>{ type === 'rename' ? 'Rename' : 'Confirm' }</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
