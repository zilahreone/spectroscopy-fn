import React, { useEffect } from 'react'
import { Link, useLocation, useMatches, useNavigate, useNavigation } from 'react-router-dom'
import keycloak from '../service/keycloak'
// import Cookies from 'js-cookie'
// import { googleLogout } from '@react-oauth/google'
import nectecLogo from '../assets/logo-nectec.png'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Navbar() {
  const { pathname  } = useLocation()
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
    {
      name: 'Spectra',
      path: '/spectra'
    },
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
      <div className='custom-container flex justify-end'>
        <button type="button" className="px-3 py-2 text-sm font-medium text-center inline-flex items-center border-l-2 border-white text-white">
          <svg className="w-5 h-5 me-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
          </svg>
          SignIn
        </button>
      </div>
      <div className='custom-container navbar-gradient'>
        <div className='h-[80px] py-0 flex justify-between items-center'>
          <img className='h-16' src={nectecLogo} alt="nectec-logo" />
          <div className='flex gap-x-16'>
            {
              menus.map(menu => (
                <Link key={menu.name} to={menu.path}>
                  <button className={`text-md font-medium text-gray-100 ${isActiveClass() === menu.path && 'text-orange-600'} hover:text-orange-600 duration-500 outline-none`}>{ menu.name }</button>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
      {/* { JSON.stringify(matches) } */}
      {/* <Breadcrumbs /> */}
      {/* <div>{ JSON.stringify(menus.filter(menu => pathname === menu.path)[0].name) }</div> */}
    </div>
    // <div className="navbar bg-red-100">
    //   <div className="navbar-start">
    //     <div className="dropdown">
    //       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
    //         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
    //       </div>
    //       <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
    //         <li><a>Item 1</a></li>
    //         <li>
    //           <a>Parent</a>
    //           <ul className="p-2">
    //             <li><a>Submenu 1</a></li>
    //             <li><a>Submenu 2</a></li>
    //           </ul>
    //         </li>
    //         <li><a>Item 3</a></li>
    //       </ul>
    //     </div>
    //     {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
    //   </div>
    //   <div className="navbar-center hidden lg:flex">
    //     <ul className="menu menu-horizontal px-1">
    //       {
    //         menus.map((menu, index) => (
    //           <li key={index}>
    //             <Link to={menu.path}>
    //               <div>{menu.name}</div>
    //               {/* <a>{ menu.name }</a> */}
    //             </Link>
    //           </li>
    //         ))
    //       }
    //       {/* <li>
    //         <details>
    //           <summary>Parent</summary>
    //           <ul className="p-2">
    //             <li><a>Submenu 1</a></li>
    //             <li><a>Submenu 2</a></li>
    //           </ul>
    //         </details>
    //       </li>
    //       <li><a>Item 3</a></li> */}
    //     </ul>
    //   </div>
    //   <div className="navbar-end">
    //     <div tabIndex={0} role="button" className="dropdown dropdown-end">
    //       <div className="avatar placeholder btn btn-ghost btn-circle">
    //         <div className="bg-neutral text-neutral-content rounded-full w-10">
    //           <span className="text-l">{ keycloak.tokenParsed.name.split(/\s+/g).map(n => n.charAt(0)).join('') }</span>
    //         </div>
    //       </div>
    //       <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
    //         <li>
    //           <a className="justify-between">
    //             Profile
    //             <span className="badge">New</span>
    //           </a>
    //         </li>
    //         <li><a>Settings</a></li>
    //         <li><button onClick={() => handleLogout()}>Logout</button></li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  )
}
