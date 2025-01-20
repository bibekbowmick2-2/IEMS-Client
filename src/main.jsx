
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import AuthProvider from './components/AuthProviders/AuthProvider'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
// import { HelmetProvider } from 'react-helmet-async'
createRoot(document.getElementById('root')).render(
  <StrictMode>

       <AuthProvider>
       <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      </QueryClientProvider>
      <ToastContainer
    autoClose={1300}
    theme="dark"
  />
    </AuthProvider>
  </StrictMode>,
)

