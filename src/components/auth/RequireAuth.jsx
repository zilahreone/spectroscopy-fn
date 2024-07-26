import React, { useEffect } from 'react'
// import { Navigate, useLocation } from 'react-router-dom'
import useBearStore from '../../store'
import { useKeycloak } from '@react-keycloak/web'

export default function RequireAuth({ children }) {
  // const location = useLocation()
  const { authenthicated } = useBearStore()
  let { keycloak, initialized  } = useKeycloak()


  useEffect(() => {
    console.log(keycloak.authenticated);
    // init()
  }, [])

  // if (!authenthicated) {
  //   return <Navigate to='/login' state={location.pathname} />
  // }
  return children
}
