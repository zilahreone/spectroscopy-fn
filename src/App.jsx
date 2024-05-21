// import './App.css'
import Navbar from './core/Navbar'
import Footer from './core/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
function App() {
  const location = useLocation()
  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="grow">
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
}

export default App
