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
    attachments: [],
    images: [],
    organization: null,
    organizationId: null,
    category: null,
    categoryId: null,
  })

  const form = ['Powder', 'Solid', 'Liquid'].map(f => ({ name: f }))

  useEffect(() => {
    let fetchSampleDetail = null
    const fetchMaterial = api.get(`/api/chemical`, keycloak.token)
    const fetchOrganize = api.get(`/api/organization`, keycloak.token)
    const fetchCategory = api.get(`/api/category`, keycloak.token)
    if (sampleId) fetchSampleDetail = api.get(`/api/sample/${sampleId}`, keycloak.token)
    let arrPromise = [fetchMaterial, fetchOrganize, fetchCategory]
    fetchSampleDetail && arrPromise.push(fetchSampleDetail)
    Promise.all(arrPromise).then((values) => {
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

  const handleUploads = (key, files) => {
    const arrObj = Array.from(files).map(file => {
      const { name, size, type } = file
      return { name, size, type }
    })
    // console.log(arrObj);
    switch (key) {
      case 'images':
        let images = null
        if (typeof files === 'number') {
          // console.log(sampleForm.images);
          images = Array.from(sampleForm.images).toSpliced(files, 1)
        } else {
          images = [...sampleForm.images, ...files]
        }
        setSampleForm({ ...sampleForm, images: images })
        break
      case 'attachments':
        let attachments = null
        if (typeof files === 'number') {
          attachments = sampleForm.attachments.toSpliced(files, 1)
        } else {
          attachments = [...sampleForm.attachments, ...files]
        }
        setSampleForm({ ...sampleForm, attachments: attachments })
        break
    }
  }

  const handleSubmitForm = () => {
    console.log(sampleForm);
    const formData = new FormData()
    sampleForm.images.forEach(image => {
      formData.append('images', image)
    })
    sampleForm.attachments.forEach(attachment => {
      formData.append('attachments', attachment)
    })
    formData.append('data', JSON.stringify({
      ...sampleForm,
      images: sampleForm.images.map(image => ({ name: image.name, size: image.size, type: image.type })),
      attachments: sampleForm.attachments.map(attach => ({ name: attach.name, size: attach.size, type: attach.type }))
    }))
    // var object = {};
    // formData.forEach(function (value, key) {
    //   object[key] = value;
    // });
    // var json = JSON.stringify(object);
    // console.log(object);

    // api.post(`/api/experiments`, formData, keycloak.token).then(resp => {
    //   if (resp.status === 201) {
    //     navigate('/list')
    //   } else {
    //     resp.json().then(json => alert(JSON.stringify(json)))
    //   }
    // })
    api.post(`/api/sample`, formData, keycloak.token).then(resp => {
      if (resp.status === 201) {
        // navigate('/list')
      } else {
        resp.json().then(json => alert(JSON.stringify(json)))
      }
    })
  }

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
            tlLabel={'Category'}
            selected={sampleForm.category}
            options={categorys}
            onEmit={(val) => setSampleForm((prev) => ({ ...prev, category: val, categoryId: categorys.filter(cat => cat.name === val)[0].id }))}
          />
        </div>
        <FileInputForm
          className=''
          accept={'image/png, image/gif, image/jpeg'}
          fileList={sampleForm.images}
          onEmit={(files) => handleUploads('images', files)}
          id={'upload_images'}
          label={'Upload images'}
          multiple
          tlLabel={'Upload images'}
        />
        <FileInputForm
          className=''
          accept={'application/pdf, text/plain, .doc ,.docx'}
          fileList={sampleForm.attachments}
          onEmit={(files) => handleUploads('attachments', files)}
          id={'upload_spectra'}
          label={'Upload attachments'}
          multiple
          tlLabel={'Attachments'}
        />
        <div className='flex justify-end'>
          <Button className={'bg-primary text-md'} name={'Create sample'} onEmit={() => handleSubmitForm()} />
        </div>
      </div>
    </>
  )
}
