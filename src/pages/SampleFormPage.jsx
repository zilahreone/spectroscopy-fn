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

export default function SampleFormPage() {
  const navigate = useNavigate()
  const { sampleId } = useParams()

  const [uploadSpectra, setUploadSpectra] = useState([])
  const [uploadDetail, setUploadDetail] = useState([])

  const [chemicals, setChemicals] = useState([])
  const [organizations, setOrganizations] = useState([])
  const [categorys, setCategorys] = useState([])
  const [sampleDetail, setSampleDetail] = useState({})

  const [sampleForm, setSampleForm] = useState({
    name: null,
    description: null,
    materialId: null,
    chemicalName: null,
    form: null,
    source: null,
    note: null,
    attachments: null,
    images: null,
    organization: null,
    organizationId: null,
    category: null,
    categoryId: null,
  })

  const form = ['Powder', 'Solid', 'Liquid'].map(f => ({ name: f }))

  useEffect(() => {
    const fetchMaterial = api.get(`/api/material`, keycloak.token)
    const fetchOrganize = api.get(`/api/organization`, keycloak.token)
    const fetchCategory = api.get(`/api/category`, keycloak.token)
    const fetchSampleDetail = api.get(`/api/sample/${sampleId}`, keycloak.token)
    Promise.all([fetchMaterial, fetchOrganize, fetchCategory, fetchSampleDetail]).then((values) => {
      values.forEach((value, index) => {
        value.json().then(json => {
          switch (index) {
            case 0:
              setChemicals(json)
              break;
            case 1:
              setOrganizations(json)
              break;
            case 2:
              setCategorys(json)
              break;
            case 3:
              if (sampleId) setSampleDetail(json)
              break;
            default:
              break;
          }
        })
      })
    })
    return () => {
      setChemicals([])
      setOrganizations([])
      setCategorys([])
      setSampleDetail({})
    }
  }, [])
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <InputForm tlLabel={'Name'}
            className={'flex-1'}
            required
            value={sampleForm.name}
            onEmit={(val) => setSampleForm((prev) => ({ ...prev, name: val }))}
          />
          <InputForm tlLabel={'Description'}
            className={'flex-1'}
            required
            value={sampleForm.description}
            onEmit={(val) => setSampleForm((prev) => ({ ...prev, description: val }))}
          />
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Chemical name'}
            selected={sampleForm.chemicalName}
            options={chemicals}
            onEmit={(val) => setSampleForm((prev) => ({ ...prev, chemicalName: val, materialId: chemicals.filter(chem => chem.name === val)[0].id }))}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Form'}
            selected={sampleForm.form}
            options={form}
            onEmit={(val) => setSampleForm((prev) => ({ ...prev, form: val }))}
          />
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <InputForm tlLabel={'Source'}
            className={'flex-1'}
            required
            value={sampleForm.source}
            onEmit={(val) => setSampleForm((prev) => ({ ...prev, source: val }))}
          />
          <InputForm tlLabel={'Note'}
            className={'flex-1'}
            required
            value={sampleForm.note}
            onEmit={(val) => setSampleForm((prev) => ({ ...prev, note: val }))}
          />
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Organization'}
            selected={sampleForm.organization}
            options={organizations}
            onEmit={(val) => setSampleForm((prev) => ({ ...prev, organization: val, organizationId: organizations.filter(org => org.name === val)[0].id }))}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Organization'}
            selected={sampleForm.category}
            options={categorys}
            onEmit={(val) => setSampleForm((prev) => ({ ...prev, category: val, categoryId: categorys.filter(cat => cat.name === val)[0].id }))}
          />
        </div>
        <FileInputForm
          className='min-w-[250px] w-1/3'
          accept={'application/pdf, text/plain, .doc , .docx, image/*'}
          fileList={uploadDetail}
          onEmit={(files) => handleUploadDetail('others_attachments', files)}
          id={'other'}
          label={'Upload details as attachment'}
          multiple
          tlLabel={'Upload details'}
        />
        <FileInputForm
          className='min-w-[250px] w-1/3'
          accept={''}
          fileList={uploadSpectra}
          onEmit={(files) => handleUploadDetail('files', files)}
          id={'upload_spectra'}
          label={'Upload details as attachment'}
          multiple
          tlLabel={'Upload Spectra'}
        />
      </div>
    </>
  )
}
