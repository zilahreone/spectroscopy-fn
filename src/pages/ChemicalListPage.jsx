import React, { useEffect, useState } from 'react'
import IconButton from '../components/actions/IconButton'
import Label from '../components/Label'
import ConfirmModal from '../components/actions/ConfirmModal'
import Button from '../components/actions/Button'
import api from '../service/api'
import keycloak from '../service/keycloak'
import { json, useNavigate } from 'react-router-dom'

export default function ChemicalListPage() {
  const navigate = useNavigate()
  const [experiments, setExperiments] = useState([
    {
      experiment: 'Pure measurements',
      files: [
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
      ]
    },
    {
      experiment: 'Test measurements',
      files: [
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
        {
          name: 'Arabinose 15%+PE85% S1 -- FTIR_absorbance_400-0_0.66713cm-1_Hg_MM_PE-DTGS_5scan -- 2024-04-05_16-03-01.0.dpt'
        },
      ]
    },
  ])
  const [uploadFilesExperiment, setUploadFilesExperiment] = useState([])
  const [modalActive, setModalActive] = useState(false)
  const [modalMsg, setModalMsg] = useState({})

  useEffect(() => {
    api.get(`/api/experiments`, keycloak.token).then((resp) => {
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

      <div className=' mt-4 flex justify-center'>
        <Button onEmit={() => handleUpdateExperimentList} color={'primary'} name={'Update'} />
      </div>
      <ConfirmModal type={modalMsg.type} isOpen={modalActive} isClose={() => setModalActive(false)} title={modalMsg.title} content={modalMsg.content} onEmit={(value) => handleEmitModal(value)} />
    </>
  )
}
