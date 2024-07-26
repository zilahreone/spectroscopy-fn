import React, { useState } from 'react'
import InputForm from '../components/form/InputForm'
import FileInputForm from '../components/form/FileInputForm'
import SelectForm from '../components/form/SelectForm'
import RadioButton from '../components/actions/RadioButton'
import Label from '../components/Label'
import FileUpload from '../components/form/FileUpload'
import Button from '../components/actions/Button'
import api from '../service/api'
import keycloak from '../service/keycloak'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function MeasurementsPage() {
  const navigate = useNavigate()
  const [measurements, setMeasurements] = useState({
    collected_by: keycloak.tokenParsed.preferred_username,
    date_collection: new Date().toISOString(),
    files: [],
    others_attachments: [],
    created_by: {
      id: keycloak.tokenParsed.sub,
      name: keycloak.tokenParsed.name,
      preferred_username: keycloak.tokenParsed.preferred_username,
      given_name: keycloak.tokenParsed.given_name,
      family_name: keycloak.tokenParsed.family_name,
      email: keycloak.tokenParsed.email
    }
  })
  const steps = ['General information', 'Measurement details', 'File upload']
  const [stepIndex, setStepIndex] = useState(0)
  const [uploadSpectra, setUploadSpectra] = useState([])
  const [uploadDetail, setUploadDetail] = useState([])

  const handleSetMeasurements = (key, value) => {
    const nestedObject = (getObject, setObject) => {
      let newObj = getObject
      for (const [k, v] of Object.entries(setObject)) {
        // console.log(typeof v === 'object' && !Array.isArray(v) && v !== null);
        if (typeof v === 'object' && !Array.isArray(v) && v !== null) {
          newObj[k] = getObject[k] ? nestedObject(getObject[k], v) : nestedObject(setObject[k], v)
        } else {
          newObj[k] = v
        }
      }
      return newObj
    }

    const convertFromStringToObject = (key, value) => {
      let k = key.split('\.')
      let tempObj = {}
      for (let i = k.length - 1; i >= 0; i--) {
        if (i === k.length - 1) {
          Object.assign(tempObj, { [k[i]]: value })
        } else {
          tempObj = {
            [k[i]]: tempObj
          }
        }
      }
      return tempObj
    }
    const conv = convertFromStringToObject(key, value)
    // console.log(conv);
    const merge = nestedObject(measurements, conv)
    // console.log(merge);
    setMeasurements({
      ...measurements,
      ...merge
    })
  }

  const handleCreateExperiment = async () => {
    const formData = new FormData()
    uploadSpectra.forEach(element => {
      formData.append('files', element)
    })
    uploadDetail.forEach(element => {
      formData.append('others_attachments', element)
    })
    formData.append('data', JSON.stringify(measurements))
    api.post(`/api/experiments`, formData, keycloak.token).then(resp => {
      if (resp.status === 201) {
        navigate('/list')
      } else {
        resp.json().then(json => alert(JSON.stringify(json)))
      }
    })
  }
  const handleUploadDetail = (key, files) => {
    const arrObj = Array.from(files).map(file => {
      const { name, size, type } = file
      return { name, size, type }
    })
    handleSetMeasurements(key, arrObj)
    // key == 'others_attachments' ? setUploadDetail(files) : 
    switch (key) {
      case 'others_attachments':
        setUploadDetail([...uploadDetail, ...files])
        break
      case 'files':
        setUploadSpectra([...uploadSpectra, ...files])
        break
    }
  }
  return (
    <>
      <div className='flex lg:flex-col flex-row'>
        <div className='mt-0 mb-4'>
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            {
              steps.map((step, index) => (
                <li key={index} className={`step ${index <= stepIndex && 'step-primary'}`} >
                  <div className='hidden lg:flex font-normal'>{step}</div>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='min-h-[380px]'>
          {/* <pre>
            {JSON.stringify(measurements, null, 2)}
          </pre> */}
          {/* <pre>
            {JSON.stringify(keycloak.tokenParsed, null, 2)}
          </pre> */}
          {
            stepIndex === 0 && (
              <div className='flex flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
                <div className='basis-1/2'>
                  <InputForm tlLabel={'Experiment name'}
                    required
                    value={measurements.experiment_name}
                    onEmit={(val) => handleSetMeasurements('experiment_name', val)}
                  />
                  <InputForm tlLabel={'Date of collection'}
                    required
                    type={'date'}
                    value={measurements.date_collection && measurements.date_collection.substring(0, 10)}
                    onEmit={(val) => handleSetMeasurements('date_collection', new Date(val).toISOString())}
                  />
                  <InputForm tlLabel={'Organization'} onEmit={(val) => handleSetMeasurements('organization', val)} value={measurements.organization} required />
                  <InputForm tlLabel={'Collected by'} onEmit={(val) => handleSetMeasurements('collected_by', val)} value={measurements.collected_by} required />
                </div>
                <div className='basis-1/2'>
                  <InputForm tlLabel={'Chemical name'}
                    required
                    value={measurements.chemical_name}
                    onEmit={(val) => handleSetMeasurements('chemical_name', val)}
                  />
                  <Label name={'Measurement technique'} />
                  <RadioButton onEmit={(val) => handleSetMeasurements('measurement_technique', val)} name={'measurement_techn'} checked={measurements.measurement_technique} label={'FTIR (Fourier-Transformed Infrared Spectroscopy)'} value={'ftir'} />
                  <RadioButton onEmit={(val) => handleSetMeasurements('measurement_technique', val)} name={'measurement_techn'} checked={measurements.measurement_technique} label={'TDS (Time-Domain Spectroscopy)'} value={'tds'} />
                  <RadioButton onEmit={(val) => handleSetMeasurements('measurement_technique', val)} name={'measurement_techn'} checked={measurements.measurement_technique} label={'Raman Spectroscopy'} value={'raman'} />
                </div>
              </div>
            )
          }
          {
            stepIndex === 1 && (
              <div className='flex flex-row'>
                <div className='md:basis-4/5 lg:basis-1/2 basis-full'>
                  <InputForm tlLabel={'Instrument'}
                    required
                    value={measurements.instrument}
                    onEmit={(val) => handleSetMeasurements('instrument', val)}
                  />
                  <SelectForm
                    required
                    tlLabel={'Type'}
                    selected={measurements.type}
                    options={[{ name: 'a', value: 'ant' }, { name: 'b', value: 'bat' }]}
                    onEmit={(val) => handleSetMeasurements('type', val)}
                  />
                  <SelectForm
                    required
                    tlLabel={'Normalization'}
                    selected={measurements.normalization}
                    options={[{ name: 'a', value: 'ant' }, { name: 'b', value: 'bat' }]}
                    onEmit={(val) => handleSetMeasurements('normalization', val)}
                  />
                  <FileInputForm
                    accept={'application/pdf, text/plain, .doc ,.docx, image/*'}
                    fileList={uploadDetail}
                    onEmit={(files) => handleUploadDetail('others_attachments', files)}
                    id={'other'}
                    label={'Upload details as attachment'}
                    multiple
                    tlLabel={'Other details'}
                  />
                </div>
              </div>
            )
          }
          {
            stepIndex === 2 && (
              <div className='flex'>
                {/* <label className='font-normal'>Upload spectra</label> */}
                {/* <FileUpload multiple id={'upload_spectra'}
                  fileList={uploadSpectra}
                  onEmit={(files) => handleUploadDetail('files', files)}
                /> */}
                <FileInputForm
                  className='basis-full'
                  accept={''}
                  fileList={uploadSpectra}
                  onEmit={(files) => handleUploadDetail('files', files)}
                  id={'upload_spectra'}
                  label={'Upload details as attachment'}
                  multiple
                  tlLabel={'Other Spectra'}
                />
              </div>
            )
          }
        </div>
      </div>
      <div className='flex justify-between'>
        <button className="btn btn-circle" onClick={() => stepIndex > 0 && setStepIndex(stepIndex - 1)} disabled={stepIndex === 0}>
          <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
          </svg>
        </button>
        <button className="btn btn-circle" onClick={() => steps.length - 1 > stepIndex && setStepIndex(stepIndex + 1)} disabled={steps.length - 1 === stepIndex}>
          <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className='mt-4 flex justify-center'>
        <Button type={'submit'} onEmit={() => handleCreateExperiment()} color={'primary'} name={'Create Experiment'} />
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>open modal</button> */}
    </>
  )
}
