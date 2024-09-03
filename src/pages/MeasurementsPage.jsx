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
      <div className='flex flex-col'>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <InputForm
            className={'flex-1'}
            tlLabel={'Experiment name'}
            required
            value={measurements.experiment_name}
            onEmit={(val) => handleSetMeasurements('experiment_name', val)}
          />
          <InputForm
            className={'flex-1'}
            tlLabel={'Chemical name'}
            required
            value={measurements.chemical_name}
            onEmit={(val) => handleSetMeasurements('chemical_name', val)}
          />
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <div className='flex-1'>
            <InputForm tlLabel={'Instrument'}
              required
              value={measurements.instrument}
              onEmit={(val) => handleSetMeasurements('instrument', val)}
            />
            <InputForm
              tlLabel={'Organization'}
              value={measurements.organization} required
              onEmit={(val) => handleSetMeasurements('organization', val)}
            />
          </div>
          <div className='flex-1'>
            <Label name={'Measurement technique'} />
            <RadioButton onEmit={(val) => handleSetMeasurements('measurement_technique', val)} name={'measurement_techn'} checked={measurements.measurement_technique} label={'FTIR (Fourier-Transformed Infrared Spectroscopy)'} value={'ftir'} />
            <RadioButton onEmit={(val) => handleSetMeasurements('measurement_technique', val)} name={'measurement_techn'} checked={measurements.measurement_technique} label={'TDS (Time-Domain Spectroscopy)'} value={'tds'} />
            <RadioButton onEmit={(val) => handleSetMeasurements('measurement_technique', val)} name={'measurement_techn'} checked={measurements.measurement_technique} label={'Raman Spectroscopy'} value={'raman'} />
          </div>
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <InputForm
            className={'flex-1'}
            tlLabel={'Date of collection'}
            required
            type={'date'}
            value={measurements.date_collection && measurements.date_collection.substring(0, 10)}
            onEmit={(val) => handleSetMeasurements('date_collection', new Date(val).toISOString())}
          />
          <InputForm
            className={'flex-1'}
            tlLabel={'Collected by'}
            value={measurements.collected_by} required
            onEmit={(val) => handleSetMeasurements('collected_by', val)}
          />
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Type'}
            selected={measurements.type}
            options={[{ name: 'a', value: 'ant' }, { name: 'b', value: 'bat' }]}
            onEmit={(val) => handleSetMeasurements('type', val)}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Normalization'}
            selected={measurements.normalization}
            options={[{ name: 'a', value: 'ant' }, { name: 'b', value: 'bat' }]}
            onEmit={(val) => handleSetMeasurements('normalization', val)}
          />
        </div>
        <FileInputForm
          className='min-w-[250px] w-1/3'
          accept={'application/pdf, text/plain, .doc ,.docx, image/*'}
          fileList={uploadDetail}
          onEmit={(files) => handleUploadDetail('others_attachments', files)}
          id={'other'}
          label={'Upload details as attachment'}
          multiple
          tlLabel={'Other details'}
        />
        <FileInputForm
          className='min-w-[250px] w-1/3'
          accept={''}
          fileList={uploadSpectra}
          onEmit={(files) => handleUploadDetail('files', files)}
          id={'upload_spectra'}
          label={'Upload details as attachment'}
          multiple
          tlLabel={'Other Spectra'}
        />
      </div>
      <div className='flex'>
        {/* <label className='font-normal'>Upload spectra</label> */}
        {/* <FileUpload multiple id={'upload_spectra'}
                  fileList={uploadSpectra}
                  onEmit={(files) => handleUploadDetail('files', files)}
                /> */}
      </div>
      <div className='mt-4 flex justify-end'>
        <Button type={'submit'} onEmit={() => handleCreateExperiment()} color={'primary'} name={'Create Experiment'} />
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>open modal</button> */}
    </>
  )
}
