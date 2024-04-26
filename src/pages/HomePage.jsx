import React from 'react'
import Stat from '../components/Stat'

export default function HomePage() {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://www.nectec.or.th/sectionImage/10439)' }}>
      <div className="hero-overlay bg-opacity-20"></div>
      <div className="absolute right-1/4 bottom-16 text-center">
        <div className='flex gap-2'>
          <Stat title={'Spectra'} value={20} />
          <Stat title={'Chemical types'} value={2} />
          <Stat title={'Organizations'} value={4} />
        </div>
        <div className='pt-2'>
          <label className="input input-bordered flex items-center gap-2 text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            <input type="text" className="grow" placeholder="Search spectral data..." />
          </label>
        </div>
      </div>
    </div>
  )
}
