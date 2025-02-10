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
  const [forms, setForms] = useState([])

  const [sampleForm, setSampleForm] = useState({
    name: null,
    description: null,
    chemicalId: null,
    chemicalName: null,
    formId: null,
    formName: null,
    source: null,
    note: null,
    organizationName: null,
    organizationId: null,
    categoryName: null,
    categoryId: null,
    attachments: [],
    images: [],
  })

  useEffect(() => {
    let fetchSampleDetail = null
    let fetchSampleDetailImages = null
    const fetchChemical = api.get(`/api/chemical`, keycloak.token)
    const fetchOrganize = api.get(`/api/organization`, keycloak.token)
    const fetchCategory = api.get(`/api/category`, keycloak.token)
    const fetchForm = api.get(`/api/form`, keycloak.token)
    if (sampleId) {
      fetchSampleDetail = api.get(`/api/sample/${sampleId}`, keycloak.token)
      // fetchSampleDetailImages = api.get(`/api/sample/${sampleId}`, keycloak.token)
    }
    let arrPromise = [fetchChemical, fetchOrganize, fetchCategory, fetchForm]
    fetchSampleDetail && arrPromise.push(fetchSampleDetail)
    Promise.all(arrPromise).then((values) => {
      values.forEach((value, index) => {
        if (value.status === 200) {
          value.json().then(json => {
            switch (index) {
              case 0:
                setChemicals(json)
                break;
              case 1:
                setOrganizations(json.map(form => ({ ...form, temp: form, name: form.name.charAt(0).toUpperCase() + form.name.slice(1), value: form.name })))
                break;
              case 2:
                setCategorys(json.map(form => ({ ...form, temp: form, name: form.name.charAt(0).toUpperCase() + form.name.slice(1), value: form.name })))
                break;
              case 3:
                setForms(json.map(form => ({ ...form, temp: form, name: form.name.charAt(0).toUpperCase() + form.name.slice(1), value: form.name })))
                break;
              default:
                if (sampleId) {
                  handleSetSample(json)
                }
                break;
            }
          })
        }
      })
    })
    return () => {
      // setChemicals([])
      // setOrganizations([])
      // setCategorys([])
    }
  }, [])

  const handleSetSample = async (json) => {
    let sampleForm = {
      id: json.id,
      name: json.name,
      description: json.description,
      source: json.source,
      note: json.note,
      images: json.images,
      attachments: json.attachments,
      chemicalId: json.chemical.id,
      chemicalName: json.chemical.name,
      formId: json.form.id,
      formName: json.form.name,
      categoryId: json.category.id,
      categoryName: json.category.name,
      organizationId: json.organization.id,
      organizationName: json.organization.name
    }
    const fetch = (filename) => {
      return new Promise((resolve, reject) => {
        api.get(`/api/sample/${sampleId}/${filename}`, keycloak.token).then(resp => {
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
    let attachments = []
    let images = []
    for (const attach of json.attachments) {
      const result = await fetch(attach.name);
      attachments.push(new File([result], attach.name, { type: attach.mimeType }))
    }
    for (const image of json.images) {
      const result = await fetch(image.name);
      images.push(new File([result], image.name, { type: image.mimeType }))
    }
    setSampleForm({
      ...sampleForm,
      attachments,
      images
    })
  }

  const handleUploads = (key, files) => {
    // const arrObj = Array.from(files).map(file => {
    //   const { name, size, type } = file
    //   return { name, size, type }
    // })
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
        break;
      case 'attachments':
        let attachments = null
        if (typeof files === 'number') {
          attachments = sampleForm.attachments.toSpliced(files, 1)
        } else {
          attachments = [...sampleForm.attachments, ...files]
        }
        setSampleForm({ ...sampleForm, attachments: attachments })
        break;
    }
  }

  const handleSubmitForm = () => {
    // console.log(sampleForm);
    const formData = new FormData()
    sampleForm.images.forEach(image => {
      // console.log(image instanceof File);
      if (image instanceof File) {
        formData.append('images', image)
      }
    })
    sampleForm.attachments.forEach(attachment => {
      if (attachment instanceof File) {
        formData.append('attachments', attachment)
      }
    })
    formData.append('data', JSON.stringify({
      ...sampleForm,
      images: sampleForm.images.map(image => ({ ...image, name: image.name, size: image.size, mimeType: image.type || image.mimeType })),
      attachments: sampleForm.attachments.map(attach => ({ ...attach, name: attach.name, size: attach.size, mimeType: attach.type || attach.mimeType })),
      // attachments: sampleForm.attachments.map(attach => ({ name: attach.name, size: attach.size, type: attach.type }))
    }))
    // console.log(JSON.parse(formData.get('data')));
    if (sampleId) {
      // console.log(sampleForm.attachments.map(file => ({ ...file, name: file.name, size: file.size, mimeType: file.type || file.mimeType })));
      api.patch(`/api/sample/${sampleId}`, formData, keycloak.token).then(resp => {
        if (resp.status === 200) {
          navigate('/samples')
        } else {
          resp.json().then(json => alert(JSON.stringify(json)))
        }
      })
    } else {
      api.post(`/api/sample`, formData, keycloak.token).then(resp => {
        if (resp.status === 201) {
          navigate('/samples')
          // console.log(`${sampleForm.name} => NEXT`);
          // setSampleForm((prev) => ({...prev, name: null}))
        } else {
          resp.json().then(json => alert(JSON.stringify(json)))
        }
      })
    }
  }

  const log = (log) => {
    console.log(log);
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
            tlLabel={'Chemical name'}
            selected={sampleForm.chemicalName}
            options={chemicals}
            onEmit={(target) => setSampleForm((prev) => ({ ...prev, chemicalName: target.value, chemicalId: target.selectedOptions[0].id, name: sampleForm.name || target.value.toLowerCase() }))}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Form'}
            selected={sampleForm.formName}
            options={forms}
            onEmit={(target) => setSampleForm((prev) => ({ ...prev, formId: target.selectedOptions[0].id, formName: target.value }))}
          />
        </div>
        <div className='flex flex-1 flex-col sm:flex-row gap-x-2 md:gap-x-4 lg:gap-x-8'>
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Category'}
            selected={sampleForm.categoryName}
            options={categorys}
            onEmit={(target) => setSampleForm((prev) => ({ ...prev, categoryName: target.value, categoryId: target.selectedOptions[0].id }))}
          />
          <SelectForm
            className={'flex-1'}
            required
            tlLabel={'Organization'}
            selected={sampleForm.organizationName}
            options={organizations}
            onEmit={(target) => setSampleForm((prev) => ({ ...prev, organizationName: target.value, organizationId: target.selectedOptions[0].id }))}
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
          {/* <Button className={'bg-primary text-md'} name={`sample`} onEmit={() => handleGetImage()} /> */}
          <Button className={'bg-primary text-md'} name={`${sampleId ? 'Update' : 'Create'} sample`} onEmit={() => handleSubmitForm()} />
        </div>
      </div>
    </>
  )
}
