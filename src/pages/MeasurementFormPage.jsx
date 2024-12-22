import React, { useEffect, useMemo, useState } from 'react'
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
  const [instruments, setInstruments] = useState([])

  const [technique, setTechnique] = useState(null)
  const [measurementForm, setMeasurementForm] = useState({
    name: null,
    experimentId: null,
    experimentName: null,
    instrumentId: null,
    instrumentName: null,
    techniqueName: null,
    measurementCondition: {
      accumulations: null
    },
    spectrumDescription: null,
    remark: null,
    attachment: []
  })


  const tdsForm = {
    binder: null,
    measurementCondition: {
      waveLength: '',
      accumulations: null
    }
  }

  const FTIRForm = {
    measurementTechnique: null,
    measurementRange: null,
    binder: null,
    measurementCondition: {
      source: null,
      beamSplitter: null,
      detector: null,
      accumulations: null
    }
  }

  const RAMANForm = {
    measurementTechnique: {
      sers: {
        chip: null,
        nanoparticles: null,
        papers: null,
        other: null
      }
    },
    measurementCondition: {
      waveLength: '',
      laserPower: '',
      exposureTime: '',
      accumulations: null,
      lens: '',
    },
    typeData: null
  }

  useEffect(() => {
    const experiments = api.get(`/api/experiment`, keycloak.token)
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
              console.log(json);
              value.status === 200 && handleSetExperiment(json)
              break;
            default:
              break;
          }
        })
      })
    })
    return () => {
      setExperiments([])
      setMeasurementForm({})
    }
  }, [])

  const handleSetExperiment = async (json) => {
    const techniqueName = json.experiment.technique.name
    let attachment = []
    let signalForm = {}
    if (techniqueName === 'raman') {
      signalForm = {
        ...RAMANForm,
        measurementCondition: {
          ...RAMANForm.measurementCondition,
          ...json.measurementCondition
        },
        measurementTechnique: {
          ...RAMANForm.measurementTechnique,
          sers: {
            ...RAMANForm.measurementTechnique.sers,
            ...json.measurementTechnique.sers
          }
        },
        typeData: json.typeData
      }
    }
    if (json.attachment.name) {
      const result = await fetchFile(json.attachment.name)
      attachment = [new File([result], json.attachment.name, { type: json.attachment.mimeType })]
    }
    setTechnique(techniqueName)
    setMeasurementForm({
      ...measurementForm,
      id: json.id,
      name: json.name,
      experimentId: json.experiment.id,
      experimentName: json.experiment.name,
      techniqueName: techniqueName,
      attachment: attachment,
      ...signalForm
    })
  }

  const fetchFile = (filename) => {
    return new Promise((resolve, reject) => {
      api.get(`/api/measurement/${measurementId}/${filename}`, keycloak.token).then(resp => {
        if (resp.status === 200) {
          resp.blob().then(blob => {
            resolve(blob)
          })
        } else {
          reject(resp.statusText)
        }
      })
    })
  }

  const handleCreateExperiment = async () => {
    const formData = new FormData()
    let attachmentObj = {
      name: null,
      size: null,
      mimeType: null
    }
    Array.from(measurementForm.attachment).forEach(attach => {
      // console.log(attach);
      formData.append('attachment', attach)
      const { name, size, type } = attach
      attachmentObj = {
        name, size, mimeType: type || attach.mimeType
      }
    })
    formData.append('data', JSON.stringify({
      ...measurementForm,
      attachment: attachmentObj
    }))
    api.post(`/api/measurement`, formData, keycloak.token).then(resp => {
      if (resp.status === 201) {
        // navigate('/list')
      } else {
        resp.json().then(json => alert(JSON.stringify(json)))
      }
    })
  }

  const handleSelectExperiment = ({ id, name }) => {
    const experiment = experiments.reduce((prev, curr) => {
      if (curr.name === name) {
        prev = curr
      }
      return prev
    }, {})
    const technique = experiment.technique?.name
    let measurementObj = {
      ...measurementForm,
      experimentId: id,
      experimentName: name,
      instrumentId: experiment.instrument?.id,
      instrumentName: experiment.instrument?.name,
      techniqueName: technique
    }

    switch (technique) {
      case 'tds':
        setMeasurementForm({ ...tdsForm, ...measurementForm, experimentName: value })
        break;
      case 'ftir':
        setMeasurementForm({ ...FTIRForm, ...measurementForm, experimentName: value })
        break;
      case 'raman':
        // setMeasurementForm({ ...RAMANForm, ...measurementForm, experimentId: id, experimentName: name, instrumentId: experiment.instrument?.id, instrumentName: experiment.instrument?.name, techniqueName: experiment.technique?.name })
        setMeasurementForm({
          ...measurementObj,
          ...RAMANForm,
          measurementCondition: {
            ...measurementForm.measurementCondition,
            ...RAMANForm.measurementCondition
          }
        })
        break;
      default:
        break;
    }
    setTechnique(technique)
  }

  const handleUploads = (file) => {
    let attachment = null
    if (typeof file === 'number') {
      attachment = measurementForm.attachment.toSpliced(file, 1)
    } else {
      attachment = file
      // attachments = [...measurementForm.attachments, ...files]
    }
    setMeasurementForm({ ...measurementForm, attachment: attachment })
  }

  useMemo(() => {
    // console.log('memo');
    setMeasurementForm((prev) => ({
      ...prev,
      name: `${prev.experimentName} (` +
        `${prev.measurementTechnique?.sers?.chip},${prev.measurementTechnique?.sers?.nanoparticles},${prev.measurementTechnique?.sers?.papers},${prev.measurementTechnique?.sers?.other})`.replaceAll('null', '') +
        `(${prev.measurementCondition?.waveLength},${prev.measurementCondition?.laserPower?.replace('%', 'pct')},${prev.measurementCondition?.exposureTime},${prev.measurementCondition?.lens},${prev.measurementCondition?.accumulations})`.replaceAll('null', '')
    }))
  }, [measurementForm.measurementTechnique, measurementForm.measurementCondition])
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex gap-x-2 flex-col sm:flex-row md:gap-x-4 lg:gap-x-8'>
          <InputForm tlLabel={'Name'}
            className={'flex-1'}
            required
            value={measurementForm.name}
            onEmit={(val) => setMeasurementForm(form => ({ ...form, name: val }))}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Experiment name'}
            selected={measurementForm.experimentName}
            options={experiments}
            onEmit={(target) => handleSelectExperiment({ id: target.selectedOptions[0].id, name: target.value })}
          />
          <InputForm tlLabel={'Instrument'}
            className={'flex-1'}
            disabled
            required
            value={measurementForm.instrumentName}
          />
        </div>

        <div className='flex gap-x-2 flex-col sm:flex-row md:gap-x-4 lg:gap-x-8'>
          {
            ['tds', 'ftir'].includes(technique) && (
              <InputForm
                className={'flex-1'}
                tlLabel={'Binder'}
                required
                value={measurementForm.binder}
                onEmit={(val) => setMeasurementForm(form => ({ ...form, binder: val }))}
              />
            )
          }
          <InputForm tlLabel={'Spectrum Description'}
            className={'flex-1'}
            required
            value={measurementForm.spectrumDescription}
            onEmit={(val) => setMeasurementForm(form => ({ ...form, spectrumDescription: val }))}
          />
          <InputForm tlLabel={'Remark'}
            className={'flex-1'}
            required
            value={measurementForm.remark}
            onEmit={(val) => setMeasurementForm(form => ({ ...form, remark: val }))}
          />
        </div>

        {
          ['ftir', 'raman'].includes(technique) && (
            <div className="border rounded-xl p-4 mb-4">
              <span className='text-l font-medium mt-2 mb-4'>Measurement Teahnique</span>
              <div className='flex gap-x-2 flex-col sm:flex-row md:gap-x-4 lg:gap-x-8'>
                {
                  technique === 'ftir' && (
                    <div className='flex flex-col sm:flex-row'>
                      <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementTechnique: val }))} label={'Transmission'} value={'transmission'} name={'measurementTechnique'} checked={measurementForm.measurementTechnique} />
                      <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementTechnique: val }))} label={'Reflection'} value={'reflection'} name={'measurementTechnique'} checked={measurementForm.measurementTechnique} />
                      <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementTechnique: val }))} label={'ATR'} value={'atr'} name={'measurementTechnique'} checked={measurementForm.measurementTechnique} />
                    </div>
                  )
                }
                {
                  technique === 'raman' && (
                    <>
                      <InputForm tlLabel={'Chip'}
                        className={'flex-1'}
                        required
                        value={measurementForm.measurementTechnique?.sers?.chip}
                        onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementTechnique: { ...form.measurementTechnique, sers: { ...form.measurementTechnique.sers, chip: val } } }))}
                      />
                      <InputForm tlLabel={'Nanoparticles'}
                        className={'flex-1'}
                        required
                        value={measurementForm.measurementTechnique?.sers?.nanoparticles}
                        onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementTechnique: { ...form.measurementTechnique, sers: { ...form.measurementTechnique.sers, nanoparticles: val } } }))}
                      />
                      <InputForm tlLabel={'Papers'}
                        className={'flex-1'}
                        required
                        value={measurementForm.measurementTechnique?.sers?.papers}
                        onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementTechnique: { ...form.measurementTechnique, sers: { ...form.measurementTechnique.sers, papers: val } } }))}
                      />
                      <InputForm tlLabel={'Other'}
                        className={'flex-1'}
                        required
                        value={measurementForm.measurementTechnique?.sers?.other}
                        onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementTechnique: { ...form.measurementTechnique, sers: { ...form.measurementTechnique.sers, other: val } } }))}
                      />
                    </>
                  )
                }
              </div>
            </div>
          )
        }

        {
          technique === 'ftir' && (
            <div className="border rounded-xl p-4 mb-4">
              <span className='text-l font-medium mt-2 mb-4'>Measurement Range</span>
              <div className='flex gap-x-2 flex-col sm:flex-row md:gap-x-4 lg:gap-x-8'>
                <div className='flex flex-col sm:flex-row'>
                  <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementRange: val }))} label={'NIR'} value={'nir'} name={'measurementRange'} checked={measurementForm.measurementRange} />
                  <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementRange: val }))} label={'MIR'} value={'mir'} name={'measurementRange'} checked={measurementForm.measurementRange} />
                  <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementRange: val }))} label={'FIR'} value={'fir'} name={'measurementRange'} checked={measurementForm.measurementRange} />
                </div>
              </div>
            </div>
          )
        }

        <div className="border rounded-xl p-4 mb-4">
          <span className='text-l font-medium mt-2 mb-4'>Measurement Conditions</span>
          <div className='flex gap-x-2 flex-col sm:flex-row md:gap-x-4 lg:gap-x-8'>
            {
              ['tds', 'raman'].includes(technique) && (
                <InputForm
                  className={'flex-1'}
                  required
                  tlLabel={'Wavelength'}
                  type="number"
                  suffix={'nm'}
                  value={measurementForm.measurementCondition?.waveLength}
                  onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementCondition: { ...form.measurementCondition, waveLength: val } }))}
                />
              )
            }
            {
              technique === 'ftir' && (
                <>
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Source'}
                    required
                    value={measurementForm.measurementCondition?.source}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementCondition: { ...form.measurementCondition, source: val } }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Beam Splitter'}
                    required
                    value={measurementForm.measurementCondition?.beamSplitter}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementCondition: { ...form.measurementCondition, beamSplitter: val } }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Detector'}
                    required
                    value={measurementForm.measurementCondition?.detector}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementCondition: { ...form.measurementCondition, detector: val } }))}
                  />
                </>
              )
            }
            {
              technique === 'raman' && (
                <>
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Laser power'}
                    required
                    type="number"
                    suffix={'%'}
                    value={measurementForm.measurementCondition?.laserPower}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementCondition: { ...form.measurementCondition, laserPower: val } }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Exposure time'}
                    required
                    type="number"
                    suffix={'s'}
                    value={measurementForm.measurementCondition?.exposureTime}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementCondition: { ...form.measurementCondition, exposureTime: val } }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Lens'}
                    required
                    type="number"
                    suffix={'x'}
                    value={measurementForm.measurementCondition?.lens}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementCondition: { ...form.measurementCondition, lens: val } }))}
                  />
                </>
              )
            }
            <InputForm
              className={'flex-1'}
              tlLabel={'Accumulations'}
              required
              type='number'
              value={measurementForm.measurementCondition?.accumulations}
              onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementCondition: { ...form.measurementCondition, accumulations: val } }))}
            />
          </div>
        </div>
        {
          technique === 'raman' && (
            <div className="border rounded-xl p-4">
              <span className='text-l font-medium mt-2 mb-4'>Type of Data</span>
              <div className='flex flex-col sm:flex-row'>
                <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, typeData: val }))} label={'Single'} value={'single'} name={'typeData'} checked={measurementForm.typeData} />
                <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, typeData: val }))} label={'Mapping'} value={'mapping'} name={'typeData'} checked={measurementForm.typeData} />
              </div>
              {/* <Label name={'Measurement technique'} /> */}
              {/* <RadioButton onEmit={(val) => handleSetMeasurements('measurement_technique', val)} name={'measurement_techn'} checked={measurements.measurement_technique} label={'FTIR (Fourier-Transformed Infrared Spectroscopy)'} value={'ftir'} /> */}
            </div>
          )
        }
        <FileInputForm
          className=''
          accept={'text/plain'}
          fileList={measurementForm.attachment}
          onEmit={(file) => handleUploads(file)}
          id={'upload_spectra'}
          label={'Upload attachments'}
          tlLabel={'Attachments'}
        />
      </div>
      <div className='mt-4 flex justify-end'>
        <Button type={'submit'} onEmit={() => handleCreateExperiment()} color={'primary'} name={'Create measurement'} />
      </div>
    </>
  )
}
