import { useEffect, useState } from 'react'
import groupsTemplate from '../utils/groups'
import SearchInput from '../components/SearchInput';
import { useNavigate } from 'react-router-dom';

export default function GroupsPage() {
  const [groups, setGroups] = useState(groupsTemplate)
  const navigator = useNavigate()

  useEffect(() => {
  }, [])
  const handleSearch = (value) => {
  }
  const handleSearchInput = (value) => {
    // setGroups(images)
    if (value && value.trim()) {
      setGroups(groups.filter(group => group.title.toLocaleLowerCase().includes(value.trim().toLocaleLowerCase())))
    } else {
      setGroups(groups)
    }
    // console.log(value);
  }
  return (
    <div className='flex flex-col gap-4'>
      <SearchInput onEmit={(value) => handleSearch(value)} onInput={(value) => handleSearchInput(value)} />
      <div className='flex justify-between'>
        <div className='text-xl font-medium text-gray-600'>{ groups.length || 0 } groups found</div>
      </div>
      <div className="flex gap-4 mt-4">
        {
          groups.map((group, index) => (
            <div key={index} className={`card bg-base-100 shadow-xl button-hover-animation flex-1`}>
              <figure>
                <img
                  className='w-28'
                  src={group.src}
                  alt={group.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{group.title}</h2>
                <p className='text-sm line-clamp-6'>{ group.description }</p>
                <div className="card-actions">
                  <button onClick={() => navigator(group.id)} className="btn btn-primary text-gray-800 w-full">12 Datasets</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
