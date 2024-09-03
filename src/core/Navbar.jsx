import React, { useEffect } from 'react'
import { Link, useLocation, useMatches, useNavigate, useNavigation } from 'react-router-dom'
import keycloak from '../service/keycloak'
// import Cookies from 'js-cookie'
// import { googleLogout } from '@react-oauth/google'
import nectecLogo from '../assets/logo-nectec.png'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Navbar() {
  const { pathname } = useLocation()
  const location = useLocation()
  const matches = useMatches();
  const menus = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Measurements',
      path: '/measurements'
    },
    {
      name: 'Analysis',
      path: '/analysis'
    },
    // {
    //   name: 'Spectra',
    //   path: '/spectra'
    // },
    {
      name: 'List',
      path: '/list'
    },
    {
      name: 'Groups',
      path: '/groups'
    },
    {
      name: 'About',
      path: '/about'
    },
  ]
  const handleLogout = () => {
    keycloak.logout()
  }

  const isActiveClass = () => {
    return `/${pathname.split(/\//)[1]}`
  }

  return (
    <div>
      {/* <div className='custom-container flex justify-end'>
        <button type="button" className="px-3 py-2 text-sm font-medium text-center inline-flex items-center border-l-2 border-white text-white">
          <svg className="w-5 h-5 me-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
          </svg>
          SignIn
        </button>
      </div> */}
      <div className='custom-container navbar-gradient'>
        <div className='h-[80px] py-0 flex justify-between items-center'>
          <img className='h-16' src={nectecLogo} alt="nectec-logo" />
          {/* <div className='md:hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-5 h-6'>
              <path fill='#FFFFFF' d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
            </svg>
          </div> */}
          <div tabIndex={0} role="button" className="dropdown dropdown-end md:hidden">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-5 h-6'>
                <path fill='#FFFFFF' d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
              </svg>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <p className='font-normal'>{keycloak.tokenParsed.name}</p>
              </li>
              <hr className='my-1' />
              {
                menus.map(menu => (
                  <li>
                    <Link key={menu.name} to={menu.path}>
                      <a>
                        {menu.name}
                      </a>
                    </Link>
                  </li>
                ))
              }
              <hr className='my-1' />
              <li><button onClick={() => handleLogout()} className='font-normal'>Logout</button></li>
            </ul>
          </div>
          <div className='hidden md:flex md:gap-x-8 lg:gap-x-12 xl:gap-x-16'>
            {
              menus.map(menu => (
                <Link key={menu.name} to={menu.path}>
                  <button className={`text-md font-medium text-gray-100 ${isActiveClass() === menu.path && 'text-orange-600'} hover:text-orange-600 duration-500 outline-none`}>{menu.name}</button>
                </Link>
              ))
            }
            <div tabIndex={0} role="button" className="dropdown dropdown-end">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-6 h-6'>
                  <path fill='#FFFFFF' d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
              </div>
              {/* <div className="avatar placeholder btn btn-ghost btn-circle">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span className="text-l">{keycloak.tokenParsed.name.split(/\s+/g).map(n => n.charAt(0)).join('')}</span>
                  </div>
                </div> */}
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <p className='font-normal'>{keycloak.tokenParsed.name}</p>
                  {/* <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a> */}
                </li>
                <hr className='my-1' />
                {/* <li><a>Settings</a></li> */}
                <li><button onClick={() => handleLogout()}>Logout</button></li>
              </ul>
            </div>
            {/* <div className="navbar-end">
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
