import { useEffect } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';

export default function Breadcrumbs() {
  const matches = useMatches();
  const navigator = useNavigate()
  let location = useLocation()

  useEffect(() => {
    // const crumbs = matches.filter(match => !match.id.includes(':index')).map(match => match.id.includes(':') ? { id: match.params[match.id.split(/\:/g)[1]], path: match.pathname } : { id: match.id, path: match.pathname })
    console.log(
      matches,location
    );
  }, [matches])

  const crumbs = matches.filter(match => !match.id.includes(':index')).map(match => match.id.includes(':') ? { id: match.params[match.id.split(/\:/g)[1]], path: match.pathname } : { id: match.id, path: match.pathname })
  return (
    <div className="flex flex-col justify-center py-4 gap-4 custom-container text-white">
      <div className="breadcrumbs font-medium text-md">
        <ul>
          {
            crumbs.map((crumb, index) => (
              <li key={index} className=''>
                <a onClick={() => navigator(crumb.path)} className=''>
                  {
                    index === 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-4 w-4 mr-2">
                        <path fill='#ffffff' d="M64 270.5c74.7-65.3 149.3-130.6 224-196L512.1 270.6l.4 201.3c0 22.1-17.9 40.1-40 40.1L392 512c-22.1 0-40-17.9-40-40l0-88.3c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 88.3c0 22.1-17.9 40-40 40l-79.9 0c-22.1 0-40-17.9-40-40L64 270.5z" />
                        <path fill='#ffffff' d="M266.9 7.9C279-2.6 297-2.6 309.1 7.9l256 224c13.3 11.6 14.6 31.9 3 45.2s-31.9 14.6-45.2 3L288 74.5 53.1 280.1c-13.3 11.6-33.5 10.3-45.2-3s-10.3-33.5 3-45.2l256-224z" />
                      </svg>
                    )
                  }
                  {crumb.id}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
      <p className='text-3xl font-medium'>{crumbs[crumbs.length - 1].id}</p>
    </div>
  )
}
