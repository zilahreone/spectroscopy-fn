import { Navigate, createBrowserRouter, json } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import MeasurementsPage from "../pages/MeasurementsPage";
import LoginPage from "../pages/LoginPage";
import AnalysisPage from "../pages/AnalysisPage";
import AboutPage from "../pages/AboutPage";
import SpectraPage from "../pages/SpectraPage";
import ExperimentListPage from "../pages/ExperimentListPage";
import RequireAuth from "../components/auth/RequireAuth";
import useBearStore from "../store";
import MeasurementsDetailPage from "../pages/MeasurementsDetailPage";
import api from "../service/api";
import Navbar from "../core/Navbar";
import Footer from "../core/Footer";

const parent = (children) => {
  return <>
    <div className="max-w-7xl px-0 py-0 sm:px-6 lg:px-8 lg:py-8 mx-auto">
      {children}
      {/* <div className="flex flex-row grow justify-center">
    </div> */}
    </div>
  </>
}
const navbar = () => {
  return <header className="sticky top-0 z-50">
    <Navbar />
  </header>
}
const footer = () => {
  return <footer>
    <Footer />
  </footer>
}
const template = (children) => {
  return <>
    <header className="sticky top-0 z-50">
      <Navbar />
    </header>
    {children}
    <footer>
      <Footer />
    </footer>
  </>

}

const LoginGuard = () => {
  const { authenthicated, path } = useBearStore()
  if (!authenthicated) {
    return <LoginPage />
  }
  return <Navigate to={path || '/'} />
}

const router = createBrowserRouter([
  {
    path: '/',
    // element: <>
    //   {navbar()}
    //   <App />
    //   {footer()}
    // </>,
    // element: <>
    //   <RequireAuth>
    //     <App />
    //   </RequireAuth>
    // </>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: template(<HomePage />),
      },
      {
        path: 'measurements',
        element: template(parent(<MeasurementsPage />))
      },
      {
        path: 'measurements/:measurementId',
        // loader: ({ params }) => {
        //   console.log(params.measurementId); // "hotspur"
        //   api.get(`/api/experiments/${measurementId}`).then(resp => {
        //     resp.json(json => {
        //       return json
        //     })
        //   })
        // },
        // action: ({ context }) => {
        //   console.log(context);
        //   // return updateFakeTeam(await request.formData());
        // },
        element: parent(<MeasurementsDetailPage />),
      },
      {
        path: 'analysis',
        element: <AnalysisPage>
          <header className="sticky top-0 z-50">
            <Navbar />
          </header>
        </AnalysisPage>
      },
      {
        path: 'spectra',
        element: template(parent(<SpectraPage />))
      },
      {
        path: 'list',
        element: template(parent(<ExperimentListPage />))
      },
      {
        path: 'about',
        element: template(<AboutPage />)
      },
    ]
  },
  // {
  //   path: '/login',
  //   element: <LoginGuard />
  // }
])
export default router