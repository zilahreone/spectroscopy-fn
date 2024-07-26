import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import keycloak from '../service/keycloak'
// import Cookies from 'js-cookie'
// import { googleLogout } from '@react-oauth/google'

export default function Navbar() {
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
      name: 'About',
      path: '/about'
    }
  ]
  const handleLogout = () => {
    keycloak.logout()
  }

  return (
    <div className="navbar bg-red-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            menus.map((menu, index) => (
              <li key={index}>
                <Link to={menu.path}>
                  <div>{menu.name}</div>
                  {/* <a>{ menu.name }</a> */}
                </Link>
              </li>
            ))
          }
          {/* <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li> */}
        </ul>
      </div>
      <div className="navbar-end">
        <div tabIndex={0} role="button" className="dropdown dropdown-end">
          <div className="avatar placeholder btn btn-ghost btn-circle">
            <div className="bg-neutral text-neutral-content rounded-full w-10">
              <span className="text-l">{ keycloak.tokenParsed.name.split(/\s+/g).map(n => n.charAt(0)).join('') }</span>
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><button onClick={() => handleLogout()}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
