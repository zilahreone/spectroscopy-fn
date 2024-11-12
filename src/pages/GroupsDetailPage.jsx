import { useEffect, useState } from "react";
import Tab from "../components/Tab";
import groups from "../utils/groups";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Table from "../components/Table";
import SearchInput from "../components/SearchInput";
import CardData from "../components/CardData";
import api from "../service/api";
import keycloak from "../service/keycloak";

export default function GroupsDetailPage() {
  const navigator = useNavigate()
  const [groupDetail, setGroupDetail] = useState({})
  const [tabIndex, setTabIndex] = useState(0)
  const categoryDataId = useLoaderData()

  return (
    <div className="flex flex-col gap-4">
      {/* <div>GroupsDetailPage</div> */}
      <p className="">{categoryDataId.description}</p>
      <div className="flex gap-8">
        <div className="basis-1/4">
          <img
            className='p-4'
            src={categoryDataId.src}
            alt={groupDetail.title}
          />
          <Table header={['Oganization']} body={[['dfsfd'], ['sdfsdf']]} />
          <Table header={['Equipment Type']} body={[['Portable'], ['Bench Hook'], ['Handheal']]} />
          <Table header={['Measurement Technique']} body={[['Raman'], ['FTIR'], ['TDS']]} />
          <Table header={['State']} body={[['Solid'], ['Liquid'], ['Gas']]} />
        </div>
        <div className="basis-3/4 flex flex-col gap-4">
          <CardData href={'1235'} />
          <CardData />
          <CardData />
          <CardData />
        </div>
      </div>
    </div>
  )
}
