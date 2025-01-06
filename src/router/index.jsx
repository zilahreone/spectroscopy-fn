import { Navigate, createBrowserRouter, json } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import ExperimentsPage from "../pages/ExperimentsPage";
import ExperimentFormPage from "../pages/ExperimentFormPage";
import LoginPage from "../pages/LoginPage";
import AnalysisPage from "../pages/AnalysisPage";
import AboutPage from "../pages/AboutPage";
import SpectraPage from "../pages/SpectraPage";
import RequireAuth from "../components/auth/RequireAuth";
import useBearStore from "../store";
import ExperimentDetailPage from "../pages/ExperimentDetailPage";
import api from "../service/api";
import Navbar from "../core/Navbar";
import Footer from "../core/Footer";
import background from "../assets/scott-graham.jpg"
import GroupsPage from "../pages/GroupsPage";
import GroupsDetailPage from "../pages/GroupsDetailPage";
import Breadcrumbs from "../components/Breadcrumbs";
import GroupsDataDetailPage from "../pages/GroupsDataDetailPage";
import keycloak from "../service/keycloak";
import ChemicalListPage from "../pages/ChemicalListPage";
import SamplesPage from "../pages/SamplesPage";
import SampleFormPage from "../pages/SampleFormPage";
import MeasurementsPage from "../pages/MeasurementsPage";
import MeasurementFormPage from "../pages/MeasurementFormPage";
import DataList from "../components/DataList";

const parent = (children) => {
  return <>
    <div className="max-w-7xl px-0 py-0 sm:px-6 lg:px-8 lg:py-8 mx-auto">
      {children}
      {/* <div className="flex flex-row grow justify-center">
    </div> */}
    </div>
  </>
}

const template = (children, isHome = false, isNav = true, isFoot = true) => {
  return <div className="flex flex-col min-h-screen"
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {
      isNav &&
      <header className="z-50">
        <Navbar />
        {
          !isHome && (
            <div className="bg-[#3e228a] bg-opacity-50">
              <Breadcrumbs />
            </div>
          )
        }
      </header>
    }
    <div className={`grow`}>
      {children}
    </div>
    {
      isFoot &&
      <footer>
        <Footer />
      </footer>
    }
  </div>

}

const handleLoadCategoryId = async (params) => {
  const resp = await api.get(`/api/experiment/category/${params.id}`, keycloak.token).then(resp => resp.json())
  return await resp
}

const handleLoadCategoryDetail = async ({ id, detail } = param) => {
  // console.log(id, detail);
  const resp = await api.get(`/api/experiment/${detail}`, keycloak.token).then(resp => resp.json())
  return await resp
}

const router = createBrowserRouter([
  {
    path: '/',
    id: 'Home',
    errorElement: <ErrorPage />,
    children: [
      {
        id: 'Home:index',
        index: true,
        // loader: handleLoadCategory,
        element: template(<HomePage />, true),
      },
      {
        path: 'samples',
        id: 'Samples',
        children: [
          {
            id: 'Samples:index',
            index: true,
            // loader: handleFetchDataListPage('sample'),
            // element: template(<div className="bg-white custom-container py-6"><MeasurementsPage /></div>
            element: template(<div className="bg-white custom-container py-6"><DataList listName='sample' /></div>
            ),
          },
          {
            path: 'create',
            id: 'Samples:create',
            element: template(<div className="bg-white custom-container py-6"><SampleFormPage /></div>
            ),
          },
          {
            path: ':sampleId',
            id: 'Samples:sampleId',
            element: template(<div className="bg-white custom-container py-6"><SampleFormPage /></div>),
          }
        ]
      },
      {
        path: 'experiments',
        id: 'Experiments',
        children: [
          {
            id: 'Experiments:index',
            index: true,
            // loader: handleLoadMeasurement,
            // element: template(<div className="bg-white custom-container py-6"><MeasurementsPage /></div>
            element: template(<div className="bg-white custom-container py-6"><DataList listName='experiment' /></div>
            ),
          },
          {
            path: 'create',
            id: 'Experiments:create',
            element: template(<div className="bg-white custom-container py-6"><ExperimentFormPage /></div>
            ),
          },
          {
            path: ':experimentId',
            id: 'Experiments:experimentId',
            element: template(<div className="bg-white custom-container py-6"><ExperimentFormPage /></div>),
          }
        ]
      },
      {
        path: 'measurements',
        id: 'Measurements',
        children: [
          {
            id: 'Measurements:index',
            index: true,
            // loader: handleLoadMeasurement,
            // element: template(<div className="bg-white custom-container py-6"><MeasurementsPage /></div>
            element: template(<div className="bg-white custom-container py-6"><DataList listName='measurement' /></div>
            ),
          },
          {
            path: 'create',
            id: 'Measurements:create',
            element: template(<div className="bg-white custom-container py-6"><MeasurementFormPage /></div>
            ),
          },
          {
            path: ':measurementId',
            id: 'Measurements:measurementId',
            element: template(<div className="bg-white custom-container py-6"><MeasurementFormPage /></div>),
          }
        ]
      },
      // {
      //   path: 'analysis',
      //   id: 'Analysis',
      //   element: <AnalysisPage>
      //     <header className="sticky top-0 z-50">
      //       <Navbar />
      //     </header>
      //   </AnalysisPage>
      // },
      // {
      //   path: 'spectra',
      //   id: 'Spectra',
      //   element: template(parent(<SpectraPage />))
      // },
      {
        path: 'list',
        id: 'List',
        // element: template(parent(<ExperimentPage />))
      },
      {
        path: 'chemicals',
        id: 'Chemicals',
        element: template(parent(<ChemicalListPage />))
      },
      {
        path: 'categories',
        id: 'Category',
        children: [
          {
            id: 'Groups:index',
            index: true,
            // loader: handleLoadCategory,
            element: template(<div className="custom-container py-6 bg-white"><GroupsPage /></div>)
          },
          {
            path: ':id',
            id: 'Groups:id',
            children: [
              {
                id: 'Groups:id:index',
                index: true,
                loader: ({ params, request }) => handleLoadCategoryId(params),
                element: template(<div className="custom-container py-6 bg-white"><GroupsDetailPage /></div>),
              },
              {
                path: ':detail',
                id: 'Groups:id:detail',
                loader: ({ params, request }) => handleLoadCategoryDetail(params),
                element: template(<div className="custom-container py-6 bg-white"><GroupsDataDetailPage /></div>),
              }
            ],
          }
        ]
      },
      {
        path: 'about',
        id: 'About',
        element: template(<div className="bg-white custom-container py-6"><AboutPage /></div>)
      },
    ]
  },
])
export default router