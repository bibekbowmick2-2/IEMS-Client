
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
// import AuthProvider from './components/AuthProviders/AuthProvider'
// import { ToastContainer } from 'react-toastify'
// import { HelmetProvider } from 'react-helmet-async'
createRoot(document.getElementById('root')).render(
  <StrictMode>

      <RouterProvider router={router}/>
  </StrictMode>,
)

