import React, { useEffect } from 'react'
import Stat from '../components/Stat'
import Button from '../components/actions/Button'
import { Link } from 'react-router-dom'
import keycloak from '../service/keycloak'

export default function HomePage() {
  // useEffect(() => {
  //   console.log(keycloak.token);
  // }, [])
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
          <Link to={'list'}>
            <Button name={'View all Spectra'} color={'primary'} className={'w-full'} />
          </Link>
        </div>
      </div>
    </div>
  )
}
