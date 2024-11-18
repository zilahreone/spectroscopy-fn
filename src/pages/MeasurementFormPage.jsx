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

  const [technique, setTechnique] = useState(null)

  const [measurementForm, setMeasurementForm] = useState({
    measurementName: null,
    experimentName: null,
    instrument: null,
    measurementCondition: {
      accumulations: null
    },
    spectrumDescription: null
  })

  const [uploadSpectra, setUploadSpectra] = useState([])
  const [uploadDetail, setUploadDetail] = useState([])

  const tdsForm = {
    binder: null,
    instrument: null,
    measurementCondition: {
      waveLength: '',
      accumulations: null
    }
  }

  const FTIRForm = {
    measurementTechnique: null,
    measurementRange: null,
    binder: null,
    instrument: null,
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
    instrument: null,
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

  const handleSelectExperiment = (value) => {
    // const experiment = experiments.filter(exp => exp.name === value)[0]
    // setMeasurementForm(form => ({ ...form, experimentName: value, experimentId: experiment.id }))
    switch (value) {
      case 'tds':
        setMeasurementForm({ ...measurementForm, ...tdsForm })
        break;
      case 'ftir':
        setMeasurementForm({ ...measurementForm, ...FTIRForm })
        break;
      case 'raman':
        setMeasurementForm({ ...measurementForm, ...RAMANForm })
        break;
      default:
        break;
    }
    setTechnique(value)
  }

  const renderMeasurementTechnique = () => {
    let condition = []
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
            options={['tds', 'ftir', 'raman'].map(val => ({ name: val, value: val }))}
            // options={experiments}
            onEmit={(val) => handleSelectExperiment(val)}
          />
          <SelectForm
            className={'flex-1'}
            required
            disabled
            tlLabel={'Instrument'}
            selected={measurementForm.instrument}
            options={experiments}
            onEmit={(val) => handleSelectExperiment(val)}
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
                        value={measurementForm.measurementTechnique.sers.chip}
                        onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementTechnique: { ...form.measurementTechnique, sers: { ...form.measurementTechnique.sers, chip: val } } }))}
                      />
                      <InputForm tlLabel={'Nanoparticles'}
                        className={'flex-1'}
                        required
                        value={measurementForm.measurementTechnique.sers.nanoparticles}
                        onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementTechnique: { ...form.measurementTechnique, sers: { ...form.measurementTechnique.sers, nanoparticles: val } } }))}
                      />
                      <InputForm tlLabel={'Papers'}
                        className={'flex-1'}
                        required
                        value={measurementForm.measurementTechnique.sers.papers}
                        onEmit={(val) => setMeasurementForm(form => ({ ...form, measurementTechnique: { ...form.measurementTechnique, sers: { ...form.measurementTechnique.sers, papers: val } } }))}
                      />
                      <InputForm tlLabel={'Other'}
                        className={'flex-1'}
                        required
                        value={measurementForm.measurementTechnique.sers.other}
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
                  isLabelInside
                  labelInside={'nm'}
                  value={measurementForm.waveLength?.split('nm')[0]}
                  onEmit={(val) => setMeasurementForm(form => ({ ...form, waveLength: val + 'nm' }))}
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
                    value={measurementForm.source}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, source: val }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Beam Splitter'}
                    required
                    value={measurementForm.beamSplitter}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, beamSplitter: val }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Detector'}
                    required
                    value={measurementForm.detector}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, detector: val }))}
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
                    isLabelInside
                    labelInside={'%'}
                    value={measurementForm.laserPower?.split('%')[0]}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, laserPower: val + '%' }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Exposure time'}
                    required
                    type="number"
                    isLabelInside
                    labelInside={'s'}
                    value={measurementForm.exposureTime?.split('s')[0]}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, exposureTime: val + 's' }))}
                  />
                  <InputForm
                    className={'flex-1'}
                    tlLabel={'Lens'}
                    required
                    type="number"
                    isLabelInside
                    labelInside={'X'}
                    value={measurementForm.lens?.split('X')[0]}
                    onEmit={(val) => setMeasurementForm(form => ({ ...form, lens: val + 'X' }))}
                  />
                </>
              )
            }
            <InputForm
              className={'flex-1'}
              tlLabel={'Accumulations'}
              required
              type='number'
              value={measurementForm.accumulations}
              onEmit={(val) => setMeasurementForm(form => ({ ...form, accumulations: val }))}
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
        {/* <div className='flex gap-x-2 flex-col sm:flex-row md:gap-x-4 lg:gap-x-8'>
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
        </div> */}
        {
          // renderMeasurementTechnique()
        }
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
