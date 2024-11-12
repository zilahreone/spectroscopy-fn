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
import { useNavigate } from 'react-router-dom'

export default function ExperimentFormPage() {
  const navigate = useNavigate()
  const [chemicals, setChemical] = useState([])
  const [organizations, setOrganizations] = useState([])
  const [measurements, setMeasurements] = useState([])
  const [experimentForm, setExperimentForm] = useState({
    experimentName: null,
    sampleId: null,
    organizationName: null,
    organizationId: null,
    chemicalName: null,
    chemicalId: null,
    techniqueName: null,
    techniqueId: null,
    equipmentType: null,
    instrument: null,
    dateCollection: new Date().toISOString(),
    collectedBy: keycloak.tokenParsed.preferred_username,
    createdBy: {
      id: keycloak.tokenParsed.sub,
      name: keycloak.tokenParsed.name,
      preferred_username: keycloak.tokenParsed.preferred_username,
      given_name: keycloak.tokenParsed.given_name,
      family_name: keycloak.tokenParsed.family_name,
      email: keycloak.tokenParsed.email
    },
    files: [],
    others_attachments: [],
  })
  const equipmentType = ['Portable', 'Benchtop', 'Handheld'].map(eqip => ({ name: eqip, value: eqip.toLowerCase() }))
  const [uploadSpectra, setUploadSpectra] = useState([])
  const [uploadDetail, setUploadDetail] = useState([])

  useEffect(() => {
    const fetchMaterial = api.get(`/api/material`, keycloak.token)
    const fetchOrganize = api.get(`/api/organization`, keycloak.token)
    const fetchMeasurementTechnique = api.get(`/api/technique`, keycloak.token)
    Promise.all([fetchMaterial, fetchOrganize, fetchMeasurementTechnique]).then((values) => {
      values.forEach((value, index) => {
        value.json().then(json => {
          switch (index) {
            case 0:
              setChemical(json)
              break;
            case 1:
              setOrganizations(json)
              break;
            case 2:
              setMeasurements(json.map(j => ({ ...j, original: { id: j.id, name: j.name }, name: `${j.name.toUpperCase()} ${j.description && `- (${j.description})`}`, value: j.name })))
              break;
            default:
              break;
          }
        })
      })
    })
    return () => {
      setChemical([])
      setOrganizations([])
    }
  }, [])


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
          <InputForm tlLabel={'Experiment name'}
            className={'flex-1'}
            required
            value={experimentForm.experimentName}
            onEmit={(val) => setExperimentForm(form => ({ ...form, experimentName: val }))}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Chemical name'}
            selected={experimentForm.chemicalName}
            options={chemicals}
            onEmit={(val) => setExperimentForm(form => ({ ...form, chemicalName: val, chemicalId: chemicals.filter(chem => chem.name === val)[0].id }))}
          />
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <InputForm tlLabel={'Instrument'}
            className={'flex-1'}
            required
            value={experimentForm.instrument}
            onEmit={(val) => setExperimentForm(form => ({ ...form, instrument: val }))}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Equipment Type'}
            selected={experimentForm.equipmentType}
            options={equipmentType}
            onEmit={(val) => setExperimentForm(form => ({ ...form, equipmentType: val }))}
          />
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Measurement technique'}
            selected={experimentForm.measurementTechnique}
            options={measurements}
            onEmit={(val) => setExperimentForm(form => ({ ...form, techniqueName: val, techniqueId: measurements.filter(mea => mea.original.name === val)[0].id }))}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Organization'}
            selected={experimentForm.organizationName}
            options={organizations}
            onEmit={(val) => setExperimentForm(form => ({ ...form, organizationName: val, organizationId: organizations.filter(org => org.name === val)[0].id }))}
          />
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <InputForm
            className={'flex-1'}
            tlLabel={'Date of collection'}
            required
            type={'date'}
            value={experimentForm.dateCollection && experimentForm.dateCollection.substring(0, 10)}
            onEmit={(val) => setExperimentForm(form => ({ ...form, dateCollection: new Date(val).toISOString() }))}
          />
          <InputForm
            disabled
            className={'flex-1'}
            tlLabel={'Collected by'}
            value={experimentForm.collectedBy} required
            onEmit={(val) => setExperimentForm(form => ({ ...form, collectedBy: val }))}
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
        <Button type={'submit'} onEmit={() => handleCreateExperiment()} color={'primary'} name={'Create Experiment'} />
      </div>
    </>
  )
}
