import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { login, logout } from './appStore/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  //const auth = useSelector(store => store.auth)

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }

      }).catch((err) => {
        console.log("Error:", err)
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap bg-gray-400 text-center">
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />

      </div>
    </div>
  ) : null
}

export default App
