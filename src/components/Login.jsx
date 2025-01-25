import React, { useContext, useEffect } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { ContextProvider } from './AuthProviders/AuthProvider';
export default function Login() {
  const navigate = useNavigate();
  const {handleSubmit2, loading,setLoading} = useContext(ContextProvider);


  useEffect(() => {
    setLoading(false);
  },[])
  const handleformSubmit = (e) => {
    handleSubmit2(e, navigate); // Pass navigate to the context's method
  };
  return (
    <div className='bk'>
    <div class="wrapper">
    <form action="#" onSubmit={handleformSubmit}>
      <h2>Login</h2>
        <div class="input-field">
        <input type="text" name="email"  required/>
        <label>Enter your email</label>
      </div>
      <div class="input-field">
        <input type="password" name="password" required/>
        <label>Enter your password</label>
      </div>
      
      {loading ? (
                <div className="flex items-center justify-center ">
                  <span className="loading loading-spinner text-error loading-lg"></span>
                </div>
              ) : (
                <>
                <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
                </> // or null
              )}

      <div class="register">
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </form>
  </div>
  </div>
  )
}
