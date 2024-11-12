import React, { useEffect, useState } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom'

export default function MeasurementFormPage() {
  const { measurementId } = useParams()
  const navigate = useNavigate()
  const [experiments, setExperiments] = useState([])
  const [measurementDetail, setMeasurementDetail] = useState({})

  const [measurementForm, setMeasurementForm] = useState({
    measurementName: null,
    experimentName: null,
    experimentId: null,
    waveLength: '',
    laserPower: '',
    exposureTime: '',
    accumulations: null,
    lens: '',
    files: []
  })
  const [uploadSpectra, setUploadSpectra] = useState([])
  const [uploadDetail, setUploadDetail] = useState([])

  useEffect(() => {
    const experiments = api.get(`/api/experiments`, keycloak.token)
    let fetchArr = [experiments]
    if (measurementId) {
      const measurementDetail = api.get(`/api/measurement/${measurementId}`, keycloak.token)
      fetchArr.push(measurementDetail)
    }
    Promise.all(fetchArr).then((values) => {
      values.forEach((value, index) => {
        value.json().then(json => {
          switch (index) {
            case 0:
              value.status === 200 && setExperiments(json)
              break;
            case 1:
              value.status === 200 && setMeasurementDetail(json)
              break;
            default:
              break;
          }
        })
      })
    })
    return () => {
      setExperiments([])
      setMeasurementDetail({})
    }
  }, [])

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
        <div className='flex gap-x-2 flex-col sm:flex-row md:gap-x-4 lg:gap-x-8'>
          <InputForm tlLabel={'Measurement name'}
            className={'flex-1'}
            required
            value={measurementForm.measurementName}
            onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementName: val }))}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Experiment name'}
            selected={measurementForm.experimentName}
            options={experiments}
            onEmit={(val) => setMeasurementForm(form => ({ ...form, experimentName: val, experimentId: experiments.filter(exp => exp.name === val)[0].id }))}
          />
          <InputForm
            className={'flex-1'}
            required
            tlLabel={'Wavelength'}
            type="number"
            isLabelInside
            labelInside={'nm'}
            value={measurementForm.waveLength.split('nm')[0]}
            onEmit={(val) => setMeasurementForm(form => ({ ...form, waveLength: val + 'nm' }))}
          />
        </div>
        <div className='flex gap-x-2 flex-col sm:flex-row md:gap-x-4 lg:gap-x-8'>
          <InputForm
            className={'flex-1'}
            tlLabel={'Laser power'}
            required
            type="number"
            isLabelInside
            labelInside={'%'}
            value={measurementForm.laserPower.split('%')[0]}
            onEmit={(val) => setMeasurementForm(form => ({ ...form, laserPower: val + '%' }))}
          />
          <InputForm
            className={'flex-1'}
            tlLabel={'Exposure time'}
            required
            type="number"
            isLabelInside
            labelInside={'s'}
            value={measurementForm.exposureTime.split('s')[0]}
            onEmit={(val) => setMeasurementForm(form => ({ ...form, exposureTime: val + 's' }))}
          />
          <InputForm
           className={'flex-1'}
            tlLabel={'Accumulations'}
            required
            type='number'
            value={measurementForm.accumulations}
            onEmit={(val) => setMeasurementForm(form => ({ ...form, accumulations: val }))}
          />
          <InputForm
           className={'flex-1'}
            tlLabel={'Lens'}
            required
            type="number"
            isLabelInside
            labelInside={'X'}
            value={measurementForm.lens.split('X')[0]}
            onEmit={(val) => setMeasurementForm(form => ({ ...form, lens: val + 'X' }))}
          />
        </div>
        {/* <FileInputForm
          className='min-w-[250px] w-1/3'
          accept={'application/pdf, text/plain, .doc ,.docx, image/*'}
          fileList={uploadDetail}
          onEmit={(files) => handleUploadDetail('others_attachments', files)}
          id={'other'}
          label={'Upload details as attachment'}
          multiple
          tlLabel={'Upload details'}
        /> */}
        {/* <FileInputForm
          className='min-w-[250px] w-1/3'
          accept={''}
          fileList={uploadSpectra}
          onEmit={(files) => handleUploadDetail('files', files)}
          id={'upload_spectra'}
          label={'Upload details as attachment'}
          multiple
          tlLabel={'Upload Spectra'}
        /> */}
      </div>
      <div className='mt-4 flex justify-end'>
        <Button type={'submit'} onEmit={() => handleCreateExperiment()} color={'primary'} name={'Create measurement'} />
      </div>
    </>
  )
}
