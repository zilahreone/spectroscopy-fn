import React, { useEffect, useState } from 'react'
import IconButton from '../components/actions/IconButton'
import Label from '../components/Label'
import ConfirmModal from '../components/actions/ConfirmModal'
import Button from '../components/actions/Button'
import api from '../service/api'
import keycloak from '../service/keycloak'
import { json, useNavigate } from 'react-router-dom'

export default function ExperimentPage() {
  const navigate = useNavigate()
  const [experiments, setExperiments] = useState([])
  const [uploadFilesExperiment, setUploadFilesExperiment] = useState([])
  const [modalActive, setModalActive] = useState(false)
  const [modalMsg, setModalMsg] = useState({})

  useEffect(() => {
    api.get(`/api/experiment`, keycloak.token).then((resp) => {
      resp.json().then(json => {
        console.log(json);
        setExperiments(json)
      })
    })
  }, [])

  const handleAddFile = (experIndex) => {
    let newExperiments = [...experiments]
    newExperiments[experIndex].files.push({ name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt' })
    setExperiments(newExperiments)
  }
  const handleRename = (experIndex) => {
    setModalMsg({
      type: 'rename',
      title: 'Rename',
      content: experiments[experIndex].experiment_name,
      experiment_index: experIndex,
      file_index: -1
    })
    setModalActive(true)
  }
  const handleDeleteExperiment = (experIndex) => {
    setModalMsg({
      type: 'delete',
      title: 'Confirm Delete',
      content: `Are You sure want to delete <strong>${experiments[experIndex].experiment}</strong> ?`,
      experiment_index: experIndex,
      file_index: -1
    })
    setModalActive(true)
  }
  const handleRemoveFile = (experIndex, fileIndex) => {
    // console.log(experiments[experIndex].files.length, fileIndex);
    setModalMsg({
      type: 'delete',
      title: 'Confirm Delete',
      content: `Are You sure want to delete <strong>${experiments[experIndex].files[fileIndex].name}</strong> ?`,
      experiment_index: experIndex,
      file_index: fileIndex
    })
    setModalActive(true)
    // setExperiments(experiments.toSpliced(modalMsg.experiment_index, 1))
  }
  const handleEmitModal = (value) => {
    if (modalMsg.type === 'rename') {
      const newExperiment = [...experiments]
      newExperiment[modalMsg.experiment_index].experiment = value
      setExperiments(newExperiment)
    } else if (modalMsg.type === 'delete') {
      if (modalMsg.experiment_index >= 0 && modalMsg.file_index < 0) {
        setExperiments(experiments.toSpliced(modalMsg.experiment_index, 1))
      } else if (modalMsg.experiment_index >= 0 && modalMsg.file_index >= 0) {
        const newExperiment = [...experiments]
        newExperiment[modalMsg.experiment_index].files.splice(modalMsg.file_index, 1)
        setExperiments(newExperiment)
      }
    } ``
    setModalActive(false)
  }
  const handleUpload = (experIndex, files) => {
    const newExperiment = [...experiments]
    Array.from(files).forEach(file => {
      if (!experiments[experIndex].files.includes(file.name)) {
        setUploadFilesExperiment([...uploadFilesExperiment, file])
        newExperiment[experIndex].files.push({ name: file.name })
      }
    })
    setExperiments(newExperiment)
    document.getElementById(`exp_list_fileupload_${experIndex}`).value = ''
  }
  const handleUploadFile = () => { }
  const handleUpdateExperimentList = () => { }
  return (
    <>
      <div className='flex text-lg font-medium justify-left mb-8'>ExperimentListPage</div>
      {
        experiments.map((exper, exp_index) => (
          <div key={exp_index} className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border-base-300 border mb-1">
              <input type="checkbox" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-l font-medium flex"><a className='z-30 hover:font-semibold' onClick={() => navigate(`/measurements/${exper.id}`)}>Experiment: {exper.experiment_name}</a> 
              </div>
              <div className="ml-4 collapse-content flex flex-col gap-y-2">
                <div className="collapse collapse-plus bg-base-200">
                  <input type="checkbox" name="my-accordion-3" defaultChecked />
                  <div className="collapse-title text-l font-medium">
                    <div>Chemical: {exper.chemical_name}</div>
                    {/* <button className='bg-slate-500 z-30 justify-center flex' onClick={() => alert('clickclick')}>click</button> */}
                  </div>
                  <div className="collapse-content">
                    {
                      exper.files.map((file, f_index) => (
                        <div key={`file_${f_index}`} className='flex items-center'>
                          <div>
                            <ul className="menu menu-xs menu-horizontal">
                              {/* <label htmlFor='fileupload' className='btn btn-primary btn-wide'>{'Choose file to upload'}</label> */}
                              <li>
                                <label htmlFor={`exp_fileupload_${exp_index}`} className="tooltip" data-tip="Add Experiment">
                                  <input onChange={(e) => handleUpload(exp_index, e.target.files)} type="file" id={`exp_fileupload_${exp_index}`} multiple hidden />
                                  <svg className="w-5 h-5 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                                  </svg>
                                </label>
                              </li>
                              <li>
                                <a className="tooltip" data-tip="Rename" onClick={() => handleRename(exp_index)}>
                                  <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                  </svg>
                                </a>
                              </li>
                              <li>
                                <a className="tooltip" data-tip="Delete" onClick={() => handleDeleteExperiment(exp_index)}>
                                  <svg className="w-5 h-5 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                  </svg>
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* <p className='cursor-pointer' onClick={() => navigate(`/measurements/${exper.id}`)}>{file.name}</p> */}
                          <p className='cursor-default'>{file.name}</p>
                        </div>
                      ))
                    }
                  </div>
                  {/* หกดหก */}
                </div>
              </div>
            </div>
          </div>
        ))
      }

      <div className=' mt-4 flex justify-center'>
        <Button onEmit={() => handleUpdateExperimentList} color={'primary'} name={'Update'} />
      </div>
      <ConfirmModal type={modalMsg.type} isOpen={modalActive} isClose={() => setModalActive(false)} title={modalMsg.title} content={modalMsg.content} onEmit={(value) => handleEmitModal(value)} />
    </>
  )
}
