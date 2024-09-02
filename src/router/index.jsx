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
import background from "../assets/scott-graham.jpg"
import GroupsPage from "../pages/GroupsPage";
import GroupsDetailPage from "../pages/GroupsDetailPage";
import Breadcrumbs from "../components/Breadcrumbs";
import GroupsDataDetailPage from "../pages/GroupsDataDetailPage";

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

const router = createBrowserRouter([
  {
    path: '/',
    id: 'Home',
    errorElement: <ErrorPage />,
    children: [
      {
        id: 'Home:index',
        index: true,
        element: template(<HomePage />, true),
      },
      {
        path: 'measurements',
        id: 'Measurements',
        children: [
          {
            id: ':measurements',
            index: true,
            element: template(parent(<MeasurementsPage />)),
          },
          {
            path: ':measurementId',
            id: ':measurementId',
            element: template(parent(<MeasurementsDetailPage />)),
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
        element: template(parent(<ExperimentListPage />))
      },
      {
        path: 'groups',
        id: 'Groups',
        children: [
          {
            id: 'Groups:index',
            index: true,
            element: template(<div className="custom-container py-6 bg-white"><GroupsPage /></div>)
          },
          {
            path: ':id',
            id: 'Groups:id',
            children: [
              {
                id: 'Groups:id:index',
                index: true,
                element: template(<div className="custom-container py-6 bg-white"><GroupsDetailPage /></div>),
              },
              {
                path: ':idId',
                id: 'Groups:idId',
                element: template(<div className="custom-container py-6 bg-white"><GroupsDataDetailPage /></div>),
              }
            ],
          }
        ]
      },
      {
        path: 'about',
        id: 'About',
        element: template(<AboutPage />)
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