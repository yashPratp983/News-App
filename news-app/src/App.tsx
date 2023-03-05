import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './components/login'
import {Routes,Route} from 'react-router-dom'
import Signup from './components/signup'
import { useEffect } from 'react'
import { useUserContext } from './contexts/user'
import axios from 'axios'
import Home from './components/Home/home'
import Loading from './components/Loading'
import { useNewsContext } from './contexts/news'
import {FilterContextProvider} from './contexts/filter'
import React from 'react'

function App() {
  const { user, setUser } = useUserContext()
  const {news,setNews}=useNewsContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const getUser = async (token: string) => {
      try {
       
        let user1 = await axios.get('https://beautiful-rolypoly-1da010.netlify.app/.netlify/functions/user/getuser', {
          headers: {
            authorisation: `Bearer ${token}`
          }
        })
      
        console.log(user1)
        setUser(user1.data.user)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    }

    const getNews=async()=>{
      try{
        const news=await axios.get('https://beautiful-rolypoly-1da010.netlify.app/.netlify/functions/fetchnews');
        console.log(news)
        let newsvalid=news.data.news.map((item:any)=>{
          return {
            id:item.id,
            by:item.by,
            title:item.title,
            url:item.url,
            time:item.time,
            score:item.score,
            type:item.type,
          }
        })
        setNews(newsvalid)
        setLoading(false)
      }catch(err){
        setLoading(false)
        console.log(err)
      }
    }
    
    
      getNews()
    

    if (token) {
      getUser(token)
    }
  }, [])


  return (
    <FilterContextProvider>
    <div className="App">
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       <Route path="/" element={ loading?<Loading />:<Home />} />
      </Routes>
    </div>
    
    </FilterContextProvider>
  )
}

export default App
