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
import api from './service/api.js'
// console.log(process.env.GOOGLE_CLIENT_ID)
const eventLogger = (event, error) => {
  // 'onReady' | 'onInitError' | 'onAuthSuccess' | 'onAuthError' | 'onAuthRefreshSuccess' | 'onAuthRefreshError' | 'onAuthLogout' | 'onTokenExpired'
  // console.log('onKeycloakEvent', event, error)
  // console.log(event, error)
  const { name, email, given_name, family_name, preferred_username, sub } = keycloak.tokenParsed
  const user = {
    id: sub,
    name,
    preferredUsername: preferred_username,
    givenName: given_name,
    familyName: family_name,
    email,
    user: keycloak.tokenParsed
  }
  switch (event) {
    case 'onAuthSuccess':
      console.log('onAuthSuccess');
      // console.log(keycloak.token);
      // api.postJSON(`/api/user`, user, keycloak.token).then(resp => {
      //   // console.log(resp.status);
      //   if (resp.status === 201) {
      //     // resp.json().then(json => {
      //     //   console.log(json);
      //     //   // resp.status === 200 ? setSamplesData(json) : setSamplesData([])
      //     // })
      //   }
      // })
      break;
    case 'onAuthLogout':
      console.log('logout');
      break;
    case 'onAuthRefreshSuccess':
      console.log('refresh');
      // console.log(keycloak.token);
      break;
    case 'onTokenExpired':
      console.log('expire');
      break;
    case 'onReady':
      console.log('ready');
      break;
    default:
      break;
  }
}
const tokenLogger = (tokens) => {
  // console.log('token', tokens.token)
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
    autoRefreshToken
    // isLoadingCheck={() => !keycloak.authenticated}
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
