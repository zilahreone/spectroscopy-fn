// import { GoogleLogin, googleLogout, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import useBearStore from '../store'

export default function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  // const googleLogin = useGoogleLogin({
  //   // onSuccess: (tokenResponse) => {
  //   //   console.log(tokenResponse)
  //   //   // setToken(tokenResponse)
  //   //   // isAuthenWithGoogle()
  //   // },
  //   onSuccess: async tokenResponse => {
  //     console.log(tokenResponse);
  //     // fetching userinfo can be done on the client or the server "tokeninfo"
  //     const userInfo = await axios
  //       .get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
  //         headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
  //       })
  //       .then(res => res.data);

  //     console.log(userInfo);
  //   },
  //   onError: (err) => {
  //     console.error(err)
  //   },
  //   flow: 'implicit',
  //   prompt: 'consent'
  // })
  // const googleLogin = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  //   onError: err => console.error(err),
  // })
  // const bears = useBearStore(b => b.bears)
  // const addBears = useBearStore(b => b.addABear)
  const { setCredential, credential, setAuthenthicated } = useBearStore()
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1615421559287-5e6eecec3b80?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
            }}>
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">Terahertz Technology Research Team (TRT)</h2>

                <p className="max-w-xl mt-3 text-gray-300">A research team focused on Terahertz basic research, efficient development and excellent technology having impact on economy, society, and security in country and provincial region for sustainable development.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Spectroscopy</h2>

                <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
              </div>

              <div className="mt-8">
                <form>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                    <input type="email" name="email" id="email" placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                      <a href="#"
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot
                        password?</a>
                    </div>

                    <input type="password" name="password" id="password" placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                  </div>

                  <div className="mt-6">
                    <button
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>
                  <p className="my-8 text-sm text-gray-400 text-center">or continue with</p>
                  <div className="space-x-8 flex justify-center">
                    <button onClick={() => googleLogin()} type="button" className="border-none outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512">
                        <path fill="#fbbd00"
                          d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                          data-original="#fbbd00" />
                        <path fill="#0f9d58"
                          d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                          data-original="#0f9d58" />
                        <path fill="#31aa52"
                          d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                          data-original="#31aa52" />
                        <path fill="#3c79e6"
                          d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                          data-original="#3c79e6" />
                        <path fill="#cf2d48"
                          d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                          data-original="#cf2d48" />
                        <path fill="#eb4132"
                          d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                          data-original="#eb4132" />
                      </svg>
                    </button>
                    {/* <GoogleLogin
                      useOneTap
                      ux_mode='popup'
                      size='large'
                      shape='pill'
                      onSuccess={credentialResponse => {
                        setCredential(credentialResponse)
                        setAuthenthicated(true)
                        // Cookies.set('isAuthenticatedWithGoogle', true, { expires: 1 })
                        // navigate(location.state)
                        console.log(credentialResponse);
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    /> */}
                    {/* <button type="button" className="border-none outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#000" viewBox="0 0 22.773 22.773">
                        <path
                          d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                          data-original="#000000"></path>
                      </svg>
                    </button>
                    <button type="button" className="border-none outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#007bff" viewBox="0 0 167.657 167.657">
                        <path
                          d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                          data-original="#010002"></path>
                      </svg>
                    </button> */}
                  </div>

                </form>
                {/* {data.map((item, index) => (
                  <div
                    key={index}
                    className={`todo-item ${item.completed ? 'completed' : ''}`}>
                    <input
                      type="checkbox"
                      onClick={() => {
                        update(item.id, {
                          ...item,
                          completed: !item.completed
                        })
                      }}
                      id={`checkbox-${index}`}
                    />
                    <label className="todo-item-text" htmlFor={`checkbox-${index}`}>
                      {item.text}
                    </label>
                    <button onClick={() => remove(item.id)}>Remove</button>
                  </div>
                ))} */}
                {/* <span>{bears}</span> */}
                {/* <span>{test}</span> */}
                {/* <button onClick={increment}>เพิ่ม</button>
                <button onClick={decrement}>ลบ</button> */}
                {/* <button type="button" onClick={() => googleLogout()}>Logout</button> */}
                <p className="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="#"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}