import React, { useContext } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from './AuthProviders/AuthProvider';
export default function Login() {
  const navigate = useNavigate();
  const {handleSubmit2, loading} = useContext(ContextProvider);

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
      {/* <div class="forget">
        <label for="remember">
          <input type="checkbox" id="remember"/>
          <p>Remember me</p>
        </label>
        <a href="#">Forgot password?</a>
      </div> */}
      <button type="submit">Log In</button>
      <div class="register">
        <p>Don't have an account? <a href="#">Register</a></p>
      </div>
    </form>
  </div>
  </div>
  )
}
