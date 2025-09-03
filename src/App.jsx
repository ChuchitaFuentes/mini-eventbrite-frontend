import { Routes, Route, useLocation, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import useAuth from './hooks/useAuth'
import useLastVisited from './hooks/useLastVisited'

function App() {
  const {isAuthenticated, user} = useAuth()
  const { pathname } = useLocation ()
  const navigate = useNavigate()
  const {setLastPath, getLastPath} = useLastVisited()

  useEffect(() => {setLastPath(pathname)}, [pathname,setLastPath])
    useEffect(() => {
    if (window.location.pathname === '/') {
      const last = getLastPath()
      if (last && isAuthenticated() && last !== '/') navigate(last, { replace: true })
    }
  }, [isAuthenticated, getLastPath, navigate])

  return (
    <div className='min-h-screen'>
      <Navbar />
      <main className="container-app py-8">
              <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path="*" element={<NotFound/>}/>
              </Routes>
      </main>
    </div>
  )
}

export default App
