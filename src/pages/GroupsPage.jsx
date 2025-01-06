import { useEffect, useMemo, useState } from 'react'
import groupsTemplate from '../utils/groups'
import SearchInput from '../components/SearchInput';
import { useLoaderData, useNavigate } from 'react-router-dom';
import api from '../service/api';
import keycloak from '../service/keycloak';

export default function GroupsPage() {
  const [categories, setcategories] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const navigator = useNavigate()
  // const categoryData = useLoaderData()

  useEffect(() => {
    api.get(`/api/category/all`, keycloak.token).then(resp => {
      resp.json().then(json => {
        const jsonMap = json.map(j => ({ 
          id: j.id, 
          name: j.name,
          description: j.description,
          title: j.name.charAt(0).toUpperCase() + j.name.slice(1), 
          icon: `./categories/${j.name}.png`,
          experimentCount: j.samples.reduce((prev, curr) => prev + curr.experiments.length, 0)
        }))
        setcategories(jsonMap)
      })
    })
    return () => {
    }
  }, [])

  // const handleSearchInput = (value) => {
  //   if (value && value.trim()) {
  //     setcategories(categories.filter(group => group.name.toLocaleLowerCase().includes(value.trim().toLocaleLowerCase())))
  //   } else {
  //     setcategories()
  //   }
  // }

  const categoriesMemo = useMemo(() => {
    if (!searchInput) return categories
    return categories.filter(category => category.name.toLocaleLowerCase().includes(searchInput.trim().toLocaleLowerCase()))
  }, [categories, searchInput])

  return (
    <div className='flex flex-col gap-4'>
      {/* <pre> { JSON.stringify(categoryData, null, 2) } </pre> */}
      <SearchInput onInput={(value) => setSearchInput(value)} />
      <div className='flex justify-between'>
        <div className='text-xl font-medium text-gray-600'>{ categoriesMemo.length || 0 } category found</div>
      </div>
      <div className="flex flex-wrap mt-2 -mx-2 -my-3">
        {
          categoriesMemo.map((category, index) => (
            <div key={index} className='px-2 py-3 min-w-[230px] basis-1/5'>
              <div className={`card bg-base-100 border shadow-xl button-hover-animation`}>
                <figure>
                  <img
                    className='w-32 mt-4'
                    src={category.icon}
                    alt={category.name} />
                </figure>
                <div className="card-body -mt-4">
                  <h2 className="card-title">{ category.title }</h2>
                  <p className='text-sm line-clamp-3'>{ category.description }</p>
                  <div className="card-actions mt-4">
                    <button onClick={() => navigator(category.name)} className="btn btn-primary text-gray-800 w-full">{ category.experimentCount } Datasets</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
