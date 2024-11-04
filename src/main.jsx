import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
// import { GoogleOAuthProvider } from '@react-oauth/google'
import keycloak from './service/keycloak.js'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import App from './App.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'
import { jwtDecode } from 'jwt-decode'
// console.log(process.env.GOOGLE_CLIENT_ID)
const eventLogger = (event, error) => {
  // console.log('onKeycloakEvent', event, error)
}
const tokenLogger = (tokens) => {
  // console.log(tokens.token)
  // if (tokens) {
  //   for (const key in tokens) {
  //     // console.log(key);
  //     console.log(jwtDecode(tokens[key]))
  //   }
  // }
}

ReactDOM.createRoot(document.getElementById('root')).render(

  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={{
      onLoad: 'login-required', // check-sso || login-required
      checkLoginIframe: false,
    }}
    LoadingComponent={<>Loading...</>}
    onEvent={eventLogger}
    onTokens={tokenLogger}
  >
    {/* <>
        <div>The user is {!keycloak.authenticated ? '' : 'NOT'} authenticated</div>
        {!keycloak.authenticated && (
          <button type="button" onClick={() => keycloak.logout()}>
            Logout
          </button>
        )}
      </> */}
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
    {/* <RequireAuth>
      </RequireAuth> */}
  </ReactKeycloakProvider>
  // <React.StrictMode>
  //   {/* <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
  //     <RouterProvider router={router} />
  //     </GoogleOAuthProvider> */}
  //   {/* <App /> */}
  //   <ReactKeycloakProvider
  //     authClient={keycloak}
  //     onEvent={eventLogger}
  //     onTokens={tokenLogger}
  //   >
  //     <RouterProvider router={router} />
  //   </ReactKeycloakProvider>
  // </React.StrictMode>,
)
