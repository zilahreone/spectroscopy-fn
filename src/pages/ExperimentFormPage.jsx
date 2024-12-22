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

export default function ExperimentFormPage() {
  const { experimentId } = useParams()
  const navigate = useNavigate()
  const [chemicals, setChemical] = useState([])
  const [samples, setSamples] = useState([])
  const [techniques, setTechniques] = useState([])
  const [organizations, setOrganizations] = useState([])
  // const [measurements, setMeasurements] = useState([])
  const [experimentForm, setExperimentForm] = useState({
    name: null,
    sampleId: null,
    sampleName: null,
    techniqueId: null,
    techniqueName: null,
    instrumentId: null,
    instrumentName: null,
    equipmentId: null,
    equipmentName: null,
    organizationId: null,
    organizationName: null,
    userId: keycloak.tokenParsed.sub,
    dateCollection: new Date().toISOString(),
    collectedBy: keycloak.tokenParsed.preferred_username,
  })

  useEffect(() => {
    let fetchExperimentDetail = null
    const fetchSample = api.get(`/api/sample`, keycloak.token)
    const fetchMeasurementTechnique = api.get(`/api/technique`, keycloak.token)
    const fetchOrganize = api.get(`/api/organization`, keycloak.token)
    let arrPromise = [fetchSample, fetchMeasurementTechnique, fetchOrganize]
    if (experimentId) {
      fetchExperimentDetail = api.get(`/api/experiment/${experimentId}`, keycloak.token)
      arrPromise.push(fetchExperimentDetail)
    }
    Promise.all(arrPromise).then((values) => {
      values.forEach((value, index) => {
        value.json().then(json => {
          switch (index) {
            case 0:
              setSamples(json.map(j => ({ ...j, name: j.name, value: j.name })))
              // setChemical(json)
              break;
            case 1:
              setTechniques(json.map(j => ({ ...j, name: j.name.charAt(0).toUpperCase() + j.name.slice(1), value: j.name, instruments: j.instruments.map(instrument => ({ ...instrument, original: { ...instrument }, name: instrument.name.charAt(0).toUpperCase() + instrument.name.slice(1), value: instrument.name })) })))
              break;
              case 2:
              setOrganizations(json.map(j => ({ original: j, id: j.id, name: j.name.charAt(0).toUpperCase() + j.name.slice(1), value: j.name, })))
              break;
            default:
              if (experimentId) {
                console.log(json);
                setExperimentForm((experimentForm) => ({
                  ...experimentForm,
                  id: json.id,
                  name: json.name,
                  sampleId: json.sample?.id,
                  sampleName: json.sample?.name,
                  techniqueId: json.technique?.id,
                  techniqueName: json.technique?.name,
                  instrumentId: json.instrument?.id,
                  instrumentName: json.instrument?.name,
                  equipmentId: json.equipmentType?.id,
                  equipmentName: json.equipmentType?.name,
                  organizationId: json.organization?.id,
                  organizationName: json.organization?.name,
                  dateCollection: new Date(json.createAt).toISOString(),
                  collectedBy: json.user?.preferredUsername || keycloak.tokenParsed.preferred_username
                }))
              }
              break;
          }
        })
      })
    })
    return () => {
      // setSamples([])
      // setOrganizations([])
      // setTechniques([])
      // setExperimentForm({})
    }
  }, [])

  const instruments = useMemo(() => {
    return techniques.reduce((prev, curr) => {
      if (curr.id === experimentForm.techniqueId) {
        prev.push(...curr.instruments)
      }
      return prev
    }, [])
  }, [experimentForm.techniqueId])
  
  useMemo(() => {
    return instruments.reduce((prev, curr) => {
      if (curr.id === experimentForm.instrumentId) {
        setExperimentForm((exprev) => ({...exprev, equipmentId: curr.equipmentType.id, equipmentName: curr.equipmentType.name}))
      }
    }, null)
  }, [experimentForm.instrumentId])


  // const handleSetMeasurements = (key, value) => {
  //   const nestedObject = (getObject, setObject) => {
  //     let newObj = getObject
  //     for (const [k, v] of Object.entries(setObject)) {
  //       // console.log(typeof v === 'object' && !Array.isArray(v) && v !== null);
  //       if (typeof v === 'object' && !Array.isArray(v) && v !== null) {
  //         newObj[k] = getObject[k] ? nestedObject(getObject[k], v) : nestedObject(setObject[k], v)
  //       } else {
  //         newObj[k] = v
  //       }
  //     }
  //     return newObj
  //   }

  //   const convertFromStringToObject = (key, value) => {
  //     let k = key.split('\.')
  //     let tempObj = {}
  //     for (let i = k.length - 1; i >= 0; i--) {
  //       if (i === k.length - 1) {
  //         Object.assign(tempObj, { [k[i]]: value })
  //       } else {
  //         tempObj = {
  //           [k[i]]: tempObj
  //         }
  //       }
  //     }
  //     return tempObj
  //   }
  //   const conv = convertFromStringToObject(key, value)
  //   // console.log(conv);
  //   const merge = nestedObject(measurements, conv)
  //   // console.log(merge);
  //   setMeasurements({
  //     ...measurements,
  //     ...merge
  //   })
  // }

  const handleCreateExperiment = async () => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(experimentForm))
    if (experimentId) {
      api.patch(`/api/experiment/${experimentId}`, formData, keycloak.token).then(resp => {
        if (resp.status === 200) {
          // navigate('/list')
        } else {
          resp.json().then(json => alert(JSON.stringify(json)))
        }
      })
    } else {
      api.post(`/api/experiment`, formData, keycloak.token).then(resp => {
        if (resp.status === 201) {
          // navigate('/list')
          console.log(experimentForm.name, ' ===> NEXT');
          setExperimentForm((prev) => ({
            ...prev,
            name: null
          }))
        } else {
          resp.json().then(json => alert(JSON.stringify(json)))
        }
      })
    }
  }
  // const handleUploadDetail = (key, files) => {
  //   const arrObj = Array.from(files).map(file => {
  //     const { name, size, type } = file
  //     return { name, size, type }
  //   })
  //   handleSetMeasurements(key, arrObj)
  //   // key == 'others_attachments' ? setUploadDetail(files) : 
  //   switch (key) {
  //     case 'others_attachments':
  //       setUploadDetail([...uploadDetail, ...files])
  //       break
  //     case 'files':
  //       setUploadSpectra([...uploadSpectra, ...files])
  //       break
  //   }
  // }
  return (
    <>
    {/* <pre> { JSON.stringify(instruments, null, 2) } </pre> */}
      <div className='flex flex-col'>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <InputForm tlLabel={'Name'}
            className={'flex-1'}
            required
            value={experimentForm.name}
            onEmit={(val) => setExperimentForm(form => ({ ...form, name: val }))}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Sample name'}
            selected={experimentForm.sampleName}
            options={samples}
            onEmit={(target) => setExperimentForm(form => ({ ...form, sampleName: target.value, sampleId: target.selectedOptions[0].id, name: target.value.toLowerCase() }))}
          />
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Measurement technique'}
            selected={experimentForm.techniqueName}
            options={techniques}
            onEmit={(target) => setExperimentForm(form => ({ ...form, techniqueName: target.value, techniqueId: target.selectedOptions[0].id }))}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Instrument'}
            selected={experimentForm.instrumentName}
            options={instruments}
            onEmit={(target) => setExperimentForm(form => ({ ...form, instrumentName: target.value, instrumentId: target.selectedOptions[0].id }))}
          />
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <InputForm tlLabel={'Equipment Type'}
            className={'flex-1'}
            disabled
            required
            value={experimentForm.equipmentName}
            // onEmit={(val) => setExperimentForm(form => ({ ...form, instrument: val }))}
          />
          {/* <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Equipment Type'}
            selected={experimentForm.equipmentType}
            options={equipmentType}
            onEmit={(val) => setExperimentForm(form => ({ ...form, equipmentType: val }))}
          /> */}
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Organization'}
            selected={experimentForm.organizationName}
            options={organizations}
            onEmit={(target) => setExperimentForm(form => ({ ...form, organizationName: target.value, organizationId: target.selectedOptions[0].id }))}
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
      </div>
      <div className='mt-4 flex justify-end'>
        <Button type={'submit'} onEmit={() => handleCreateExperiment()} color={'primary'} name={`${experimentId ? 'Update' : 'Create'} Experiment`} />
      </div>
    </>
  )
}
