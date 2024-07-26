import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../service/api';
import keycloak from '../service/keycloak';
import InputForm from '../components/form/InputForm';
import Label from '../components/Label';
import RadioButton from '../components/actions/RadioButton';
import SelectForm from '../components/form/SelectForm';
import FileInputForm from '../components/form/FileInputForm';
import Button from '../components/actions/Button';

export default function MeasurementsDetailPage() {
  let { measurementId } = useParams();
  const navigator = useNavigate()
  const [experiment, setExperiment] = useState({
    id: null,
    experiment_name: null,
    chemical_name: null,
    created_at: null,
    files: [],
    others_attachments: [],
    date_collection: null,
    measurement_technique: null,
    organization: null,
    collected_by: null,
    instrument: null,
    type: null,
    normalization: null,
    created_by: {}
  })
  const [uploadDetails, setUploadDetails] = useState([])
  const [uploadExperiments, setUploadExperiments] = useState([])

  useEffect(() => {
    api.get(`/api/experiments/${measurementId}`, keycloak.token).then(resp => {
      resp.json().then(json => {
        // const obj = Object.keys(json).reduce((a, v) => ({ ...a, [v]: null }), {})
        setExperiment(json)
      })
    })
  }, [])

  const handleUploadDetail = (key, files) => {
    // console.log(files);
    const arrObj = Array.from(files).map(file => {
      const { name, size } = file
      return { name, size }
    })
    setExperiment({ ...experiment, [key]: [...experiment[key], ...arrObj] })
    setUploadDetails(files)
  }

  const handleUpdate = () => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(experiment))
    uploadExperiments.forEach(file => formData.append('files', file))
    uploadDetails.forEach(file => formData.append('others_attachments', file))
    api.put(`/api/experiments/${measurementId}`, formData, keycloak.token).then(resp => {
      if (resp.status === 200) {
        // navigator('/list')
      }
    })
  }

  return (
    <>
      <div>MeasurementsDetailPage {measurementId}</div>
      <pre>
        {JSON.stringify(experiment, null, 2)}
      </pre>
      <div class="grid sm:grid-cols-2 grid-cols-1 md:gap-x-4 lg:gap-x-8  gap-x-2">
        <InputForm tlLabel={'Experiment name'} value={experiment.experiment_name} onEmit={(val) => setExperiment({ ...experiment, experiment_name: val })} required />
        <InputForm tlLabel={'Chemical name'} value={experiment.chemical_name} onEmit={(val) => setExperiment({ ...experiment, chemical_name: val })} required />
        <InputForm tlLabel={'Instrument'} value={experiment.instrument} onEmit={(val) => setExperiment({ ...experiment, instrument: val })} required />
        {/* <InputForm tlLabel={'Collected by'} value={experiment.collected_by} onEmit={(val) => handleSetMeasurements('collected_by', val)} required /> */}
        <div className="sm:col-span-2">
          <Label name={'Measurement technique'} />
          <div className='flex sm:flex-row flex-col'>
            <RadioButton onEmit={(val) => setExperiment({ ...experiment, measurement_technique: val })} name={'measurement_techn'} checked={experiment.measurement_technique} label={'FTIR (Fourier-Transformed Infrared Spectroscopy)'} value={'ftir'} />
            <RadioButton onEmit={(val) => setExperiment({ ...experiment, measurement_technique: val })} name={'measurement_techn'} checked={experiment.measurement_technique} label={'TDS (Time-Domain Spectroscopy)'} value={'tds'} />
            <RadioButton onEmit={(val) => setExperiment({ ...experiment, measurement_technique: val })} name={'measurement_techn'} checked={experiment.measurement_technique} label={'Raman Spectroscopy'} value={'raman'} />
          </div>
        </div>
        <InputForm tlLabel={'Organization'} value={experiment.organization} onEmit={(val) => setExperiment({ ...experiment, organization: val })} required />
        <InputForm tlLabel={'Date of collection'}
          required
          type={'date'}
          value={experiment.date_collection && experiment.date_collection.substring(0, 10)}
          onEmit={(val) => handleSetMeasurements('date_collection', new Date(val).toISOString())}
        />
        <SelectForm
          required
          tlLabel={'Type'}
          selected={experiment.type}
          options={[{ name: 'a', value: 'ant' }, { name: 'b', value: 'bat' }]}
          onEmit={(val) => setExperiment({ ...experiment, type: val })}
        />
        <SelectForm
          required
          tlLabel={'Normalization'}
          selected={experiment.normalization}
          options={[{ name: 'a', value: 'ant' }, { name: 'b', value: 'bat' }]}
          onEmit={(val) => setExperiment({ ...experiment, normalization: val })}
        />
        <FileInputForm
          accept={'application/pdf, text/plain, .doc ,.docx, image/*'}
          fileList={experiment.others_attachments}
          onEmit={(files) => handleUploadDetail('others_attachments', files)}
          id={'upload_attachments'}
          label={'Upload details as attachment'}
          multiple
          tlLabel={'Other details'}
        />
        <FileInputForm
          accept={''}
          fileList={experiment.files}
          onEmit={(files) => handleUploadDetail('files', files)}
          id={'upload_spectras'}
          label={'Upload spectra'}
          multiple
          tlLabel={'Upload spectra'}
        />
      </div>
      <div className='mt-4 flex justify-center'>
        <Button type={'submit'} onEmit={() => handleUpdate()} color={'primary'} className={'w-1/6'} name={'Update'} />
      </div>
    </>
  )
}
