import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './contexts/user'
import {NewsContextProvider} from './contexts/news'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <NewsContextProvider>
        <App />
        </NewsContextProvider>
    </UserContextProvider>
    </BrowserRouter>

  </React.StrictMode>,
)
