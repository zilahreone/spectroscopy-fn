import { useEffect, useState } from 'react'
import groupsTemplate from '../utils/groups'
import SearchInput from '../components/SearchInput';
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function GroupsPage() {
  const [category, setcategory] = useState([])
  const navigator = useNavigate()
  const categoryData = useLoaderData()

  useEffect(() => {
    setcategory(categoryData)
  }, [categoryData])

  const handleSearchInput = (value) => {
    if (value && value.trim()) {
      setcategory(category.filter(group => group.title.toLocaleLowerCase().includes(value.trim().toLocaleLowerCase())))
    } else {
      setcategory(categoryData)
    }
  }
  return (
    <div className='flex flex-col gap-4'>
      <SearchInput onInput={(value) => handleSearchInput(value)} />
      <div className='flex justify-between'>
        <div className='text-xl font-medium text-gray-600'>{ category.length || 0 } category found</div>
      </div>
      <div className="flex flex-wrap mt-2 -mx-2 -my-3">
        {
          category.map((group, index) => (
            <div key={index} className='px-2 py-3 min-w-[230px] basis-1/5'>
              <div className={`card bg-base-100 border shadow-xl button-hover-animation`}>
                <figure>
                  <img
                    className='w-32 mt-4'
                    src={group.src}
                    alt={group.title} />
                </figure>
                <div className="card-body -mt-4">
                  <h2 className="card-title">{group.title}</h2>
                  <p className='text-sm line-clamp-3'>{ group.description }</p>
                  <div className="card-actions mt-4">
                    <button onClick={() => navigator(group.name.toLocaleLowerCase())} className="btn btn-primary text-gray-800 w-full">12 Datasets</button>
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
