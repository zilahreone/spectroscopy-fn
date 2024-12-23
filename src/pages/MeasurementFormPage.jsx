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
    signal: {
      measurementCondition: {
        accumulations: null
      },
    },
    spectrumDescription: null,
    remark: null,
    attachment: []
  })

  const tdsForm = {
    binder: null,
    measurementCondition: {
      waveLength: '',
      // accumulations: null
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
      // accumulations: null
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
      waveLength: null,
      laserPower: null,
      exposureTime: null,
      // accumulations: null,
      lens: null,
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
              value.status === 200 && handleSetExperiment(json)
              break;
            default:
              break;
          }
        })
      })
    })
    return () => {
      // setExperiments([])
      // setMeasurementForm({})
    }
  }, [])

  const handleSetExperiment = async (json) => {
    // console.log(json);
    const techniqueName = json.experiment.technique.name    
    let attachment = []
    let signalForm = {}
    switch (techniqueName) {
      case 'raman':
        signalForm = {
          ...RAMANForm,
          measurementCondition: {
            ...RAMANForm.measurementCondition,
            ...json.raman.measurementCondition
          },
          measurementTechnique: {
            ...RAMANForm.measurementTechnique,
            sers: {
              ...RAMANForm.measurementTechnique.sers,
              ...json.raman.measurementTechnique.sers
            }
          },
          typeData: json.raman.typeData
        }
        break;
      default:
        break;
    }
    if (json.attachment.name) {
      await fetchFile(json.attachment.name).then(result => {
        attachment = [new File([result], json.attachment.name, { type: json.attachment.mimeType })]
      }).catch(err => {
      })
    }
    setTechnique(techniqueName)
    setMeasurementForm({
      ...measurementForm,
      id: json.id,
      name: json.name,
      experimentId: json.experiment.id,
      experimentName: json.experiment.name,
      instrumentId: json.experiment.instrument.id,
      instrumentName: json.experiment.instrument.name,
      techniqueName: techniqueName,
      spectrumDescription: json.spectrumDescription,
      remark: json.remark,
      attachment: attachment,
      signal: {
        ...measurementForm.signal,
        ...signalForm
      }
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
          reject(resp.status)
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
    // console.log(measurementForm);
    if (measurementId) {
      api.patch(`/api/measurement/${measurementId}`, formData, keycloak.token).then(resp => {
        if (resp.status === 200) {
          // navigate('/list')
        } else {
          resp.json().then(json => alert(JSON.stringify(json)))
        }
      })
    } else {
      api.post(`/api/measurement`, formData, keycloak.token).then(resp => {
        if (resp.status === 201) {
          // navigate('/list')
        } else {
          resp.json().then(json => alert(JSON.stringify(json)))
        }
      })
    }
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
        setMeasurementForm({
          ...measurementObj,
          signal: {
            ...measurementObj.signal,
            ...RAMANForm,
            measurementCondition: {
              ...measurementObj.signal.measurementCondition,
              ...RAMANForm.measurementCondition,
            }
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
        `${prev.signal.measurementTechnique?.sers?.chip},${prev.signal.measurementTechnique?.sers?.nanoparticles},${prev.signal.measurementTechnique?.sers?.papers},${prev.signal.measurementTechnique?.sers?.other})`.replaceAll('null', '') +
        `(${prev.signal.measurementCondition?.waveLength},${prev.signal.measurementCondition?.laserPower?.replace('%', 'pct')},${prev.signal.measurementCondition?.exposureTime},${prev.signal.measurementCondition?.lens},${prev.signal.measurementCondition?.accumulations})`.replaceAll('null', '')
    }))
  }, [measurementForm.signal.measurementTechnique, measurementForm.signal.measurementCondition])

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
                value={measurementForm.signal?.binder}
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
                      <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementTechnique: val } }))} label={'Transmission'} value={'transmission'} name={'measurementTechnique'} checked={measurementForm.signal.measurementTechnique} />
                      <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementTechnique: val } }))} label={'Reflection'} value={'reflection'} name={'measurementTechnique'} checked={measurementForm.signal.measurementTechnique} />
                      <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementTechnique: val } }))} label={'ATR'} value={'atr'} name={'measurementTechnique'} checked={measurementForm.signal.measurementTechnique} />
                    </div>
                  )
                }
                {
                  technique === 'raman' && (
                    <>
                      <InputForm tlLabel={'Chip'}
                        className={'flex-1'}
                        required
                        value={measurementForm.signal.measurementTechnique?.sers?.chip}
                        onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementTechnique: { ...form.signal.measurementTechnique, sers: { ...form.signal.measurementTechnique.sers, chip: val } } } }))}
                      />
                      <InputForm tlLabel={'Nanoparticles'}
                        className={'flex-1'}
                        required
                        value={measurementForm.signal.measurementTechnique?.sers?.nanoparticles}
                        onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementTechnique: { ...form.signal.measurementTechnique, sers: { ...form.signal.measurementTechnique.sers, nanoparticles: val } } } }))}
                      />
                      <InputForm tlLabel={'Papers'}
                        className={'flex-1'}
                        required
                        value={measurementForm.signal.measurementTechnique?.sers?.papers}
                        onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementTechnique: { ...form.signal.measurementTechnique, sers: { ...form.signal.measurementTechnique.sers, papers: val } } } }))}
                      />
                      <InputForm tlLabel={'Other'}
                        className={'flex-1'}
                        required
                        value={measurementForm.signal.measurementTechnique?.sers?.other}
                        onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementTechnique: { ...form.signal.measurementTechnique, sers: { ...form.signal.measurementTechnique.sers, other: val } } } }))}
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
                  <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementRange: val } }))} label={'NIR'} value={'nir'} name={'measurementRange'} checked={measurementForm.signal.measurementRange} />
                  <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementRange: val } }))} label={'MIR'} value={'mir'} name={'measurementRange'} checked={measurementForm.signal.measurementRange} />
                  <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementRange: val } }))} label={'FIR'} value={'fir'} name={'measurementRange'} checked={measurementForm.signal.measurementRange} />
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
                  value={measurementForm.signal.measurementCondition?.waveLength}
                  onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementCondition: { ...form.signal.measurementCondition, waveLength: val } } }))}
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
                    value={measurementForm.signal.measurementCondition?.source}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementCondition: { ...form.signal.measurementCondition, source: val } } }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Beam Splitter'}
                    required
                    value={measurementForm.signal.measurementCondition?.beamSplitter}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementCondition: { ...form.signal.measurementCondition, beamSplitter: val } } }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Detector'}
                    required
                    value={measurementForm.signal.measurementCondition?.detector}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementCondition: { ...form.signal.measurementCondition, detector: val } } }))}
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
                    value={measurementForm.signal.measurementCondition?.laserPower}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementCondition: { ...form.signal.measurementCondition, laserPower: val } } }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Exposure time'}
                    required
                    type="number"
                    suffix={'s'}
                    value={measurementForm.signal.measurementCondition?.exposureTime}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementCondition: { ...form.signal.measurementCondition, exposureTime: val } } }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Lens'}
                    required
                    type="number"
                    suffix={'x'}
                    value={measurementForm.signal.measurementCondition?.lens}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementCondition: { ...form.signal.measurementCondition, lens: val } } }))}
                  />
                </>
              )
            }
            <InputForm
              className={'flex-1'}
              tlLabel={'Accumulations'}
              required
              type='number'
              value={measurementForm.signal.measurementCondition?.accumulations}
              onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, measurementCondition: { ...form.signal.measurementCondition, accumulations: val } } }))}
            />
          </div>
        </div>
        {
          technique === 'raman' && (
            <div className="border rounded-xl p-4">
              <span className='text-l font-medium mt-2 mb-4'>Type of Data</span>
              <div className='flex flex-col sm:flex-row'>
                <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, typeData: val } }))} label={'Single'} value={'single'} name={'typeData'} checked={measurementForm.signal.typeData} />
                <RadioButton onEmit={(val) => setMeasurementForm(form => ({ ...form, signal: { ...form.signal, typeData: val } }))} label={'Mapping'} value={'mapping'} name={'typeData'} checked={measurementForm.signal.typeData} />
              </div>
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
        <Button type={'submit'} onEmit={() => handleCreateExperiment()} color={'primary'} name={ `${measurementId ? 'Update' : 'Create'} measurement`} />
      </div>
    </>
  )
}
