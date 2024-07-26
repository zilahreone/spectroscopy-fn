// import './App.css'
import Navbar from './core/Navbar'
import Footer from './core/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import useBearStore from './store'
// import { hasGrantedAllScopesGoogle, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'

function App() {
  const location = useLocation()
  const { credential, clearBearStore, setPath } = useBearStore()
  const [count, setCount] = useState(0);

  // const login = useGoogleLogin({
  //   onSuccess: codeResponse => console.log(codeResponse),
  //   flow: 'auth-code',
  // })

  // useEffect(() => {
  // execute on location change
  // if (credential) {
  //   const decoded = jwtDecode(credential.credential);
  //   try {
  //     // console.log(decoded);
  //     // setCount(count + 1);
  //     // console.log(new Date());
  //     // console.log(new Date(+decoded.exp * 1000));
  //     console.log(((new Date(+decoded.exp * 1000).getTime() - new Date().getTime()) / 1000) / 60);
  //     const expireIn = ((new Date(+decoded.exp * 1000).getTime() - new Date().getTime()) / 1000) / 60
  //     // if (expireIn < 0) {
  //     //   console.log('clear');
  //     //   clearBearStore()
  //     // } else if (expireIn < 11) {
  //     //   console.log('extend expire')
  //     // }
  //     if (location.pathname !== '/login') {
  //       setPath(location.pathname)
  //       // console.log('Location changed!', location.pathname)
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // }, [location])
  return (
    <>
        <Outlet />
      {/* <div className='flex min-h-screen flex-col'> */}
        {/* <header className="sticky top-0 z-50">
          <Navbar />
        </header> */}
        {/* <main className="grow">
          <Outlet />
        </main> */}
        {/* <footer>
          <Footer />
        </footer> */}
      {/* </div> */}
    </>
  )
}

export default App
