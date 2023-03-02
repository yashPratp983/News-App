import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './components/login'
import {Routes,Route} from 'react-router-dom'
import Signup from './components/signup'
import { useEffect } from 'react'
import { useUserContext } from './contexts/user'
import axios from 'axios'

function App() {
  const { user, setUser } = useUserContext()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const getUser = async (token: string) => {
      try {
        let user1 = await axios.get('http://localhost:8888/.netlify/functions/user/getUser', {
          headers: {
            authorisation: `Bearer ${token}`
          }
        })
        setUser(user1.data.user)

      } catch (err) {
        console.log(err)
      }
    }

    if (token) {
      getUser(token)
    }
  }, [])


  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
