import React from 'react'
import Stat from '../components/Stat'
import Button from '../components/actions/Button'

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
          <Button name={'View all Spectra'} color={'primary'} className={'w-full'}  />
        </div>
      </div>
    </div>
  )
}
