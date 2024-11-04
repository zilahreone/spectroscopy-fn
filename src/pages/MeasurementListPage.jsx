import { useLoaderData, useNavigate } from "react-router-dom";
import TableList from "../components/TableList";
import IconButton from "../components/actions/IconButton";
import Button from "../components/actions/Button";
import SearchInput from "../components/SearchInput";
import Modal from "../components/actions/Modal";
import { useState } from "react";

export default function MeasurementListPage() {
  const measurementData = useLoaderData()
  const navigate = useNavigate()
  const [modalActive, setModalActive] = useState(false)
  const [id, setId] = useState(-1)

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
          <Button className={'bg-green-400 text-md'} name={'Create measurement'} onEmit={() => navigate('create', { relative: "path" })} />
        </div>
      </div>
      <TableList
        thead={[
          'No.',
          'Chemical name',
          'Measurement Technique',
          'Equipment Type',
          'Collect By',
          ''
        ]}
        tbody={measurementData.map(md => (
          md.map((field, f_index) => (
            md.length - 1 === f_index
              ? <div className="flex gap-2 items-center">{ field.map((f, index) => (<div key={`${index}-tools`} className="cursor-pointer" onClick={() => handleTools(index, md[0])}>{ f }</div>)) }</div>
              : field
          ))
        )
        )}
      />
      <Modal id={'modal-delete'} isOpen={modalActive} isClose={(evt) => setModalActive(evt)} onEmit={() => handleDelete()} content={'sdfsfsdf'} title={'sfdsdfsfds'} />
    </div>
  )
}
