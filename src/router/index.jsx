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
// const navbar = () => {
//   return <header className="sticky top-0 z-50">
//     <Navbar />
//   </header>
// }
// const footer = () => {
//   return <footer>
//     <Footer />
//   </footer>
// }
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

const homeTemplate = (children, isNav = true, isFoot = true) => {
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

const LoginGuard = () => {
  const { authenthicated, path } = useBearStore()
  if (!authenthicated) {
    return <LoginPage />
  }
  return <Navigate to={path || '/'} />
}

const handleLoadCategory = async () => {
  const resp = await api.get(`/api/category`, keycloak.token).then(resp => resp.json())
  const respMap = resp.map(res => ({ ...res, title: res.name, src: `/category/${res.name}.png` }))
  return await respMap
}

const handleLoadCategoryId = async (params) => {
  const resp = await api.get(`/api/experiment/category/${params.id}`, keycloak.token).then(resp => resp.json())
  return await resp
}

const handleLoadCategoryDetail = async ({id, detail} = param) => {
  console.log(id, detail);
  const resp = await api.get(`/api/experiment/${detail}`, keycloak.token).then(resp => resp.json())
  return await resp
}

const handleLoadSamples = async () => {
  // const upRight = <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg>
  // const deleteIcon = <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="red"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
  const resp = await api.get(`/api/sample`, keycloak.token).then(resp => resp.json())
  // let samples = {
  //   head: ['No.', 'Name.', 'Organization', 'Update at', 'Tools'],
  //   body: resp.map((res, index) => ([index + 1, res.name, res.organizationId, res.updateAt, [upRight, deleteIcon] ]))
  // }
  return resp
}

const handleLoadMeasurement = async () => {
  const upRight = <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" /></svg>
  const deleteIcon = <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="red"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" /></svg>
  return [
    [1, 'asdads', 'asdadasd', 'adadasdasd', 'wissut', [upRight, deleteIcon]],
    [2, 'asdads', 'asdadasd', 'adadasdasd', 'wissut', [upRight, deleteIcon]],
    [3, 'asdads', 'asdadasd', 'adadasdasd', 'wissut', [upRight, deleteIcon]],
    [4, 'asdads', 'asdadasd', 'adadasdasd', 'wissut', [upRight, deleteIcon]],
    [5, 'asdads', 'asdadasd', 'adadasdasd', 'wissut', [upRight, deleteIcon]]
  ]
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
        loader: handleLoadCategory,
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
      {
        path: 'analysis',
        id: 'Analysis',
        element: <AnalysisPage>
          <header className="sticky top-0 z-50">
            <Navbar />
          </header>
        </AnalysisPage>
      },
      {
        path: 'spectra',
        id: 'Spectra',
        element: template(parent(<SpectraPage />))
      },
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
        path: 'categorys',
        id: 'Category',
        children: [
          {
            id: 'Groups:index',
            index: true,
            loader: handleLoadCategory,
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
  // {
  //   path: 'groups',
  //   id: 'Groups',
  //   children: [
  //     {
  //       id: ':Groups_Index',
  //       index: true,
  //       element: template(<div className="custom-container py-6 bg-white"><GroupsPage /></div>),
  //     },
  //     {
  //       path: ':id',
  //       id: ':groupId',
  //       element: template(<div className="custom-container py-6 bg-white"><GroupsDetailPage /></div>),
  //     }
  //   ]
  // },
  // {
  //   path: '/login',
  //   element: <LoginGuard />
  // }
])
export default router