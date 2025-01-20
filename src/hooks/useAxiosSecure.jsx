import axios from 'axios'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContextProvider } from '../components/AuthProviders/AuthProvider'
import { toast } from 'react-toastify'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
    const { user, signOutUser} = useContext(ContextProvider);
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        return res
      },
      async error => {
        console.log('Error caught from axios interceptor-->', error.response)
        if (error.response.status === 401 || error.response.status === 403 ) {
          await signOutUser()
          .then(() => {
            toast.error('unauthorized access');
            navigate('/login');

          })
          .catch((error) => {
            console.log(error);
          });
          // navigate to login
         
        }
        return Promise.reject(error)
      }
    )
  }, [signOutUser, navigate])
  return axiosSecure
}

export default useAxiosSecure