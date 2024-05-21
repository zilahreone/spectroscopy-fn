import React, { useEffect, useState } from 'react'
import Label from '../Label'
import IconButton from '../actions/IconButton'
import Modal from '../actions/Modal'

export default function FileUpload({ id, name, label, multiple, accept, uploadView, onEmit, fileList = [] }) {
  const [files, setFiles] = useState([])
  const [fileSelect, setFileSelect] = useState({ title: null, content: null })
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // if (files.length > 0) {
    //   console.log(files);
    //   // setFiles(fileList)
    //   onEmit(files)
    // }
    if (fileList.length > 0) setFiles(fileList)
  }, [])

  const handleUpload = (e) => {
    // console.log(files.length);
    let fl = []
    if (files.length === 0) {
      // setFiles([...files, ...e.target.files])
      fl = [...files, ...e.target.files]
    } else {
      for (const iterator of e.target.files) {
        // console.log(!files.map(file => file.name).includes(iterator.name));
        if (!files.map(file => file.name).includes(iterator.name)) fl = [...files, iterator]
        // setFiles([...files, iterator])
      }
    }
    setFiles(fl)
    if (fileList) onEmit(fl)
    document.getElementById(id).value = ''
  }
  const handleRemoveFile = (index) => {
    const deleted = files.toSpliced(index, 1)
    setFiles(deleted)
    if (fileList) onEmit(deleted)
    document.getElementById(id).value = ''
  }
  const handleShowModal = (e) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        // this will then display a text file
        // content.innerText = reader.result;
        // console.log(reader.result);
        setFileSelect(Object.assign({}, {
          content: reader.result,
          title: e.name,
        }))
      },
      false,
    );

    if (e) {
      reader.readAsText(e)
    }
    setIsModalOpen(true)
    // console.log(reader.readAsText(e));
    // document.getElementById('my_modal_4').showModal()
  }

  return (
    <>
      <div className='my-4'>
        {
          Array.from(files).map((file, index) => {
            return (
              <div className='flex items-center gap-x-2' key={index}>
                <IconButton
                  onEmit={() => handleRemoveFile(index)}
                  icon={
                    <svg className="w-6 h-6 text-red-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                  }
                />
                <div className='cursor-pointer' onClick={() => handleShowModal(file)}>
                  <Label name={file.name} />
                </div>
              </div>
            )
          })
        }
        {
          uploadView && uploadView
        }
      </div>
      <div>
        <input onChange={handleUpload} type="file" name={name} id={id} multiple={multiple} accept={accept} hidden />
        {/* <input onChange={(e) => uploadView('helllo')} type="file" name={name} id={id} multiple={multiple} accept={accept} hidden /> */}
        <label htmlFor={id} className='btn btn-primary btn-wide'>{!label && 'Choose file to upload'}</label>
      </div>
      <Modal isOpen={isModalOpen} isClose={(e) => setIsModalOpen(e)} title={fileSelect.title} content={fileSelect.content} id={'my_modal_4'} />
      {/* <span id="file-chosen">No file chosen</span> */}
      {/* <button htmlFor="upload" className="btn btn-primary">Primary</button> */}
    </>
  )
}
