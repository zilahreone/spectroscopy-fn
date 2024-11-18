import React, { useState } from 'react'
import Modal from '../actions/Modal'
import Label from '../Label'
import IconButton from '../actions/IconButton'

export default function FileInputForm({ className, id, multiple, accept, name, label, required, tlLabel, trLabel, blLabel, brLabel, placeholder, onEmit, fileList }) {
  const [files, setFiles] = useState([])
  const [fileSelect, setFileSelect] = useState({ title: null, content: null })
  const [isModalOpen, setIsModalOpen] = useState(false)
  // useEffect(() => {
  //   if (fileList.length > 0) setFiles(fileList)
  // }, [])

  const handleUpload = (e) => {
    // fileList undefined
    // let fl = []
    // if (files.length === 0) {
    //   fl = [...files, ...e.target.files]
    // } else {
    //   for (const iterator of e.target.files) {
    //     // console.log(!files.map(file => file.name).includes(iterator.name));
    //     if (!files.map(file => file.name).includes(iterator.name)) fl = [...files, iterator]
    //     // setFiles([...files, iterator])
    //   }
    // }
    // setFiles(fl)
    // if (fileList) onEmit(fl)
    // for (const file of e.target.files) {
    //   console.log(file);
    //   if (!fileList.map(file => file.name).includes(file.name)) fl = [...files, file]
    // }
    const filesFilter = Array.from(e.target.files).filter(file => !fileList.map(file => file.name).includes(file.name))
    onEmit(filesFilter)
    document.getElementById(id).value = ''
  }
  const handleRemoveFile = (index) => {
    // console.log(
    //   fileList.toSpliced(index, 1)
    // )
    // const deleted = files.toSpliced(index, 1)
    // setFiles(deleted)
    // if (fileList) onEmit(deleted)
    onEmit(index)
    document.getElementById(id).value = ''
  }
  const handleShowModal = (e) => {
    if (e.type.includes('image')) {
      setFileSelect(Object.assign({}, {
        content: <img className='max-w-96' src={URL.createObjectURL(e)} alt="" />,
        title: e.name,
      }))
      setIsModalOpen(true)
    } else if (e.type.includes('pdf')) {
      window.open(URL.createObjectURL(e), '_blank');
    }
    
    if (accept.includes('image')) {
    } else {
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
        false
      )
      if (e) {
        reader.readAsText(e)
      }
    }
    // console.log(reader.readAsText(e));
    // document.getElementById('my_modal_4').showModal()
  }
  return (
    <div className={className}>
      <div className="form-control">
        <div className="label font-medium">
          <span className="label-text">{tlLabel}</span>
          <span className="label-text-alt">{trLabel}</span>
        </div>
        <div className='pb-0'>
          {
            fileList && Array.from(fileList).map((file, index) => {
              return (
                <div className='flex items-center gap-x-0' key={index}>
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
        </div>
        {/* <input type="file" className="file-input file-input-bordered file-input-primary file-input-sm w-full" placeholder={placeholder} required={required} /> */}
        <input onChange={handleUpload} type="file" name={name} id={id} multiple={multiple} accept={accept} hidden />
        <label htmlFor={id} className='mt-2 btn btn-primary btn-sm w-fit'>{label || 'Choose file to upload'}</label>
        <div className="label font-medium">
          <span className="label-text-alt">{blLabel}</span>
          <span className="label-text-alt">{brLabel}</span>
        </div>
      </div>
      <Modal isOpen={isModalOpen} isClose={(e) => setIsModalOpen(e)} title={fileSelect.title} content={fileSelect.content} id={'my_modal_0'} />
    </div>
  )
}
