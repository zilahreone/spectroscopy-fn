import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import MeasurementsPage from "../pages/MeasurementsPage";
import LoginPage from "../pages/LoginPage";
import AnalysisPage from "../pages/AnalysisPage";
import AboutPage from "../pages/AboutPage";

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
        element: <MeasurementsPage />
      },
      {
        path: 'analysis',
        element: <AnalysisPage />
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