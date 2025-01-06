import { useEffect, useMemo, useState } from "react";
import Tab from "../components/Tab";
import groups from "../utils/groups";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Table from "../components/Table";
import SearchInput from "../components/SearchInput";
import CardData from "../components/CardData";
import api from "../service/api";
import keycloak from "../service/keycloak";
import { data } from "autoprefixer";

export default function GroupsDetailPage() {
  const navigator = useNavigate()
  const [groupDetail, setGroupDetail] = useState({})
  const [tabIndex, setTabIndex] = useState(0)
  const categoryDataList = useLoaderData([])

  const [filterMenus, setfiltersMenu] = useState([])
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const arrReduce = categoryDataList.reduce((prev, curr) => {
      prev.forEach(p => {
        const keyObj = p.key === 'sample' ? curr[p.key].form : curr[p.key]
        if (!p.data.some(d => d.id === keyObj.id)) {
          p.data.push({ id: keyObj.id, name: keyObj.name, checked: false })
        }
      })
      return prev
    }, [
      {
        key: 'organization',
        title: 'Organization',
        data: []
      },
      {
        key: 'equipmentType',
        title: 'Equipment Type',
        data: []
      },
      {
        key: 'technique',
        title: 'Measurement Technique',
        data: []
      },
      {
        key: 'sample',
        title: 'Form',
        data: []
      }
    ])
    // console.log(arrReduce);
    setfiltersMenu(arrReduce)
  }, [categoryDataList])

  const handleChecked = (titleIndex, dataIndex) => {
    const arr = [...filterMenus]
    arr[titleIndex].data[dataIndex].checked = !arr[titleIndex].data[dataIndex].checked
    setfiltersMenu(arr)
  }

  const memoCategoryDataList = useMemo(() => {
    let arrCategory = [...categoryDataList]
    if (filterMenus.every(menu => menu.data.every(d => !d.checked))) {
      arrCategory = categoryDataList
    } else {
      filterMenus.forEach(menu => {
        // console.log(menu.data.filter(d => d.checked).map(d => d.id))
        const arrId = menu.data.filter(d => d.checked).map(d => d.id)
        if (arrId.length > 0) {
          arrCategory = arrCategory.filter(cate => {
            const id = menu.key === 'sample' ? cate[menu.key].form.id : cate[menu.key].id
            return menu.data.filter(d => d.checked).map(d => d.id).includes(id)
          })
        }
      })
    }
    return searchInput ? arrCategory.filter(cate => cate.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())) : arrCategory
  }, [filterMenus, searchInput])

  const handleSearchInput = (value) => {
    setSearchInput(value)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* <pre> { JSON.stringify(memoMenus, null ,2) } </pre> */}
      {/* <div>GroupsDetailPage</div> */}
      {/* <p className="">{categoryDataId.description}</p> */}
      <div className="flex gap-x-4">
        <div className="basis-1/4">
          {/* <pre>{ JSON.stringify(filterMenus, null, 2) }</pre> */}
          {/* <img
            className='p-4'
            src={categoryDataId.src}
            alt={groupDetail.title}
          /> */}
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col gap-4">
              {
                filterMenus.map((filterMenu, filterMenuIndex) => (
                  <div key={`filter-${filterMenuIndex}`}>
                    <p className="font-medium rounded-t-xl pl-4 p-2 bg-lime-300">{filterMenu.title}</p>
                    <div className="border-b border-x rounded-b-xl pl-2 pt-1 pb-2">
                      {
                        filterMenu.data.map((data, dataIndex) => (
                          <label key={`org-${dataIndex}`} className="label gap-x-2 justify-start cursor-pointer">
                            <input type="checkbox" onChange={() => handleChecked(filterMenuIndex, dataIndex)} checked={data.checked} className="checkbox checkbox-primary" />
                            <span className="label-text">{data.name}</span>
                          </label>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="basis-3/4 flex flex-col gap-4">
          {/* <pre>{JSON.stringify(categoryDataList, null, 2)}</pre> */}
          <SearchInput onInput={(value) => handleSearchInput(value)} />
          {
            memoCategoryDataList.map((dl, index) => (
              <CardData
                key={`dl-${index}`} href={dl.name}
                title={dl.name}
                tags={[
                  <p>{dl.technique.name}</p>,
                  <p>{dl.organization.name}</p>,
                  <p>{dl.equipmentType.name}</p>,
                  <p>{dl.sample.form.name}</p>,
                ]}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
