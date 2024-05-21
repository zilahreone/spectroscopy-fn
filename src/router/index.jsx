import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import MeasurementsPage from "../pages/MeasurementsPage";
import LoginPage from "../pages/LoginPage";
import AnalysisPage from "../pages/AnalysisPage";
import AboutPage from "../pages/AboutPage";
import SpectraPage from "../pages/SpectraPage";
import ExperimentListPage from "../pages/ExperimentListPage";

const parent = (children) => {
  return <>
  <div className="max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {children}
    {/* <div className="flex flex-row grow justify-center">
    </div> */}
  </div>
  </>
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'measurements',
        element: parent(<MeasurementsPage />)
      },
      {
        path: 'analysis',
        element: <AnalysisPage />
      },
      {
        path: 'spectra',
        element: parent(<SpectraPage />)
      },
      {
        path: 'list',
        element: parent(<ExperimentListPage />)
      },
      {
        path: 'about',
        element: <AboutPage />
      },
    ]
  },
  {
    path: '/login',
    element: <LoginPage />,
  }
])
export default router