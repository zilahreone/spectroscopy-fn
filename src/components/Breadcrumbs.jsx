import React, { useEffect } from 'react'
import { useMatches } from 'react-router-dom';

export default function Breadcrumbs() {
  const matches = useMatches();

  useEffect(() => {
    console.log(matches);
  }, [matches])

  const crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));
  return (
    <div className="breadcrumbs custom-container text-sm bg-white">
      <ul>
        <li className=''>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-4 w-4 mr-2 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            dfgdfg
            {/* {JSON.stringify(matches)} */}
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            {/* {JSON.stringify(matches)} */}
          </a>
        </li>
      </ul>
    </div>
    // <div>{JSON.stringify(matches)}</div>
    // <ol>
    //   {crumbs.map((crumb, index) => (
    //     <li key={index}>{crumb}</li>
    //   ))}
    // </ol>
  )
}
