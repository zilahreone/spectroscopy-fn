import { useLoaderData, useNavigate } from "react-router-dom";
import TableList from "../components/TableList";
import IconButton from "../components/actions/IconButton";
import Button from "../components/actions/Button";
import SearchInput from "../components/SearchInput";
import Modal from "../components/actions/Modal";
import { useEffect, useMemo, useState } from "react";
import keycloak from "../service/keycloak";
import api from "../service/api";

export default function ExperimentsPage() {
  // const measurementData = useLoaderData()
  const [experiments, setExperiments] = useState([])
  const navigate = useNavigate()
  const [modalActive, setModalActive] = useState(false)
  const [id, setId] = useState(-1)

  useEffect(() => {
    api.get(`/api/experiment`, keycloak.token).then(resp => {
      resp.json().then(json => {
        resp.status === 200 ? setExperiments(json) : setExperiments([])
      })
    })
  }, [])

  const memoExperiments = useMemo(() => {
  }, [experiments])

  const handleDelete = () => {
    console.log('delete', id);
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
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <SearchInput />
        </div>
        <div>
          <Button className={'bg-green-400 text-md'} name={'Create experiment'} onEmit={() => navigate('create', { relative: "path" })} />
        </div>
      </div>
      <pre>{JSON.stringify(memoExperiments, null, 2)}</pre>
      <TableList
        thead={[
          'No.',
          'Sample name',
          'Measurement Technique',
          'Instrument',
          'Equipment Type',
          'Collect By',
          'Tools',
        ]}
      // tbody={memoExperiments.map(md => (
      //   md.map((field, f_index) => (
      //     md.length - 1 === f_index
      //       ? <div className="flex gap-2 items-center">{ field.map((f, index) => (<div key={`${index}-tools`} className="cursor-pointer" onClick={() => handleTools(index, md[0])}>{ f }</div>)) }</div>
      //       : field
      //   ))
      // )
      // )}
      />
      <Modal id={'modal-delete'} isOpen={modalActive} isClose={(evt) => setModalActive(evt)} onEmit={() => handleDelete()} content={`Are you sure you want to delete ${id}`} title={'Confirm Delete'} />
    </div>
  )
}
