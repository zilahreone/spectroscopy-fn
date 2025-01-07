import React, { useEffect, useMemo, useState } from 'react'
import api from '../service/api'
import SearchInput from './SearchInput'
import Button from './actions/Button'
import TableList from './TableList'
import Modal from './actions/Modal'
import {  useNavigate } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'

export default function DataList({ listName }) {

  const navigate = useNavigate()
  const [thead, setTHead] = useState([])
  const [dataList, setDataList] = useState([])
  const [modalActive, setModalActive] = useState(false)
  const [delData, setDelData] = useState({ id: null, name: null })
  const [searchKeyword, setSearchKeyword] = useState(null)

  const { keycloak } = useKeycloak()

  const handleTableList = (arrList = []) => {
    // console.log(arrList);
    // const upRight = <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" /></svg>
    const upRight = <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
    const deleteIcon = <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="red"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" /></svg>

    const convertUTCDateToLocalDate = (date) => {
      const d = new Date(date)
      return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
    }
    switch (listName) {
      // const rtn = arrList.reduce((prev, curr, currIndex) => {
      //   prev.push({ ...curr, tbody: [currIndex + 1, curr.name, curr.form?.name, curr.chemical?.name, curr.category?.name, curr.organization?.name, convertUTCDateToLocalDate(curr.updateAt), [upRight, deleteIcon]] })
      //   return prev
      // }, [])
      case 'sample':
        setTHead(['No.', 'Name.', 'Form', 'Chemical', 'Category', 'Organization', 'Update at', keycloak.authenticated && 'Tools'])
        return arrList.map((data, index) => ({...data, tbody: [index + 1, data.name, data.form?.name, data.chemical?.name, data.category?.name, data.organization?.name, convertUTCDateToLocalDate(data.updateAt), keycloak.authenticated && [upRight, deleteIcon]]}))
      case 'experiment':
        setTHead(['No.', 'Name.', 'Sample', 'Technique', 'Instrument', 'Equipment', 'Update at', keycloak.authenticated && 'Tools'])
        return arrList.map((data, index) => ({...data, tbody: [index + 1, data.name, data.sample?.name, data.technique?.name, data.instrument?.name, data.equipmentType?.name, convertUTCDateToLocalDate(data.updateAt), keycloak.authenticated && [upRight, deleteIcon]]}))
        case 'measurement':
        setTHead(['No.', 'Name.', 'Experiment', 'Technique', 'Update at', keycloak.authenticated && 'Tools'])
        return arrList.map((data, index) => ({ ...data, tbody: [index + 1, data.name, data.experiment.name, data.experiment.technique.name, convertUTCDateToLocalDate(data.updateAt), keycloak.authenticated && [upRight, deleteIcon]] }))
      default:
        break;
    }
  }

  useEffect(() => {
    api.get(`/api/${listName}`, keycloak.token).then(resp => {
      resp.json().then(json => {
        resp.status === 200
          ? setDataList(handleTableList(json))
          : setDataList([])
      })
    })
    return () => {
      // console.log(listName);
      // setDataList([])
      // setTHead([])
    }
  }, [listName])

  const memoDataList = useMemo(() => {
    if (!searchKeyword) {
      return dataList
    } else {
      return dataList.filter(dl => dl.name.includes(searchKeyword))
    }
  }, [dataList, searchKeyword])


  const handleDelete = ({ id, name }) => {
    // console.log('delete', listName, id, name);
    // setDataList(dataList.filter(sd => sd.id !== id))`
    api.delete(`/api/${listName}/${id}`, keycloak.token).then(resp => {
      if (resp.status === 200) {
        setDataList(dataList.filter(sd => sd.id !== id))
      }
    })
  }

  const handleTools = (index, { id, name }) => {
    // console.log(index, id, name);
    switch (index) {
      case 0:
        navigate(encodeURIComponent(`${name}`), { relative: "path" })
        break;
      case 1:
        setDelData({ id, name })
        setModalActive(true)
        break;
      default:
        break;
    }
  }

  const handleSearchInput = (keyword) => {
    setSearchKeyword(keyword)
  }

  const handleFetch = () => {
    console.log(
      memoDataList[0]
    );
    
    for (const data of memoDataList) {
      let obj = {
        id: data.id,
        name: `raman ${data.sample.name}`,
        sampleId: data.sample.id,
        sampleName: data.sample.name,
        userId: data.user.id,
        userName: data.user.name,
        organizationId: data.organization.id,
        organizationName: data.organization.name,
        techniqueId: data.technique.id,
        techniqueName: data.technique.name,
        equipmentId: data.equipmentType.id,
        equipmentName: data.equipmentType.name,
        instrumentId: data.instrument.id,
        instrumentName: data.instrument.name,
      }
      // console.log(obj);
      // console.log({ name: `raman ${data.name}`});
      // const formData = new FormData()
      // formData.append('data', JSON.stringify(obj))
      // api.patch(`/api/experiment/${data.id}`, formData, keycloak.token).then(resp => {
      //   console.log(resp.status);
      // })
    }
  }

  return (
    <>
      {/* <pre>{JSON.stringify(memoDataList, null, 2)}</pre> */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <SearchInput onInput={(val) => handleSearchInput(val)} />
          </div>
          <div>
            <Button className={'bg-green-400 text-md'} name={`Create ${listName || ''}`} onEmit={() => navigate('create', { relative: "path" })} />
          </div>
        </div>
        <TableList
          thead={thead}
          tbody={
            memoDataList.map((res, memoIndex) => {
              return res.tbody.map((field, fieldIndex) => {
                return Array.isArray(field)
                  ? <div className="flex gap-2 items-center">{field.map((f, index) => (<div key={`${index}-tools`} className="cursor-pointer" onClick={() => handleTools(index, res)}>{f}</div>))}</div>
                  : field
              })
            })
          }
        />
        <Modal id={'modal-delete'} isOpen={modalActive} isClose={(evt) => setModalActive(evt)} onEmit={() => handleDelete(delData)} content={<>Are you sure you want to delete <p className="font-medium">{delData.name}</p></>} title={'Confirm Delete'} />
        {/* <button type="button" onClick={() => handleFetch()}>Rename</button> */}
      </div>
    </>
  )
}
