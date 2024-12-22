import { useLoaderData, useNavigate } from "react-router-dom";
import TableList from "../components/TableList";
import IconButton from "../components/actions/IconButton";
import Button from "../components/actions/Button";
import SearchInput from "../components/SearchInput";
import Modal from "../components/actions/Modal";
import { useState, useEffect, useMemo } from "react";
import api from "../service/api";
import keycloak from "../service/keycloak";

export default function SamplesPage() {
  // const samplesData = useLoaderData()
  const navigate = useNavigate()
  const [modalActive, setModalActive] = useState(false)
  const [id, setId] = useState(-1)
  const [samplesData, setSamplesData] = useState([])
  const [searchKeyword, setSearchKeyword] = useState(null)
  const [isFetching, setIsFetching] = useState(false);

  const upRight = <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg>
  const deleteIcon = <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="red"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>

  // useEffect(() => {
  //   // console.log('fetch');
  //   api.get(`/api/sample`, keycloak.token).then(resp => {
  //     resp.json().then(json => {
  //       resp.status === 200 ? setSamplesData(json) : setSamplesData([])
  //     })
  //   })
  // }, [])

  const memoSamplesData = useMemo(() => {
    // console.log('memo');
    if (!searchKeyword) {
      return samplesData
    } else {
      return samplesData.filter(sd => sd.name.includes(searchKeyword))
    }
  }, [samplesData, searchKeyword])
  
  const convertUTCDateToLocalDate = (date) => {
    const d = new Date(date)
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}
  const handleDelete = () => {
    // console.log('delete', {name: id});
    api.delete(`/api/sample/${id}`, keycloak.token).then(resp => {
      if (resp.status === 200) {
        setSamplesData(samplesData.filter(sd => sd.id !== id))
      }
    })
  }

  const handleTools = (index, id) => {
    switch (index) {
      case 0:
        navigate(`${id}`, { relative: "path" })
        break;
      case 1:
        setId(id)
        setModalActive(true)
        break;
      default:
        break;
    }
  }

  const handleSearchInput = (keyword) => {
    setSearchKeyword(keyword)
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <SearchInput onInput={(val) => handleSearchInput(val)} />
        </div>
        <div>
          <Button className={'bg-green-400 text-md'} name={'Create sample'} onEmit={() => navigate('create', { relative: "path" })} />
        </div>
      </div>
      {/* <pre className="text-xs">
      { JSON.stringify(samplesData, null, 2) }
      </pre> */}
      <TableList
        thead={['No.', 'Name.', 'Form', 'Chemical', 'Category', 'Organization', 'Update at', 'Tools']}
        tbody={memoSamplesData.map((res, index) => ([index + 1, res.name, res.form?.name, res.chemical?.name, res.category?.name, res.organization?.name, convertUTCDateToLocalDate(res.updateAt), [upRight, deleteIcon] ]))
          .map((sd, sd_index) => (
          sd.map((field, f_index) => (
            sd.length - 1 === f_index
              ? <div className="flex gap-2 items-center">{ field.map((f, index) => (<div key={`${index}-tools`} className="cursor-pointer" onClick={() => handleTools(index, sd[1])}>{ f }</div>)) }</div>
              : field
          ))
        )
        )}
      />
      <Modal id={'modal-delete'} isOpen={modalActive} isClose={(evt) => setModalActive(evt)} onEmit={() => handleDelete()} content={`Are you sure you want to delete ${id}`} title={'Confirm Delete'} />
    </div>
  )
}
