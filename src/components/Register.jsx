import React, { useContext } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from './AuthProviders/AuthProvider';
export default function Login() {
  const navigate = useNavigate();
  const { handleSubmit,handleGoogle} = useContext(ContextProvider);

  const handleformSubmit = (e) => {
    
    handleSubmit(e, navigate);
  }
  return (
    <div className='bk'>
    <div class="wrapper">
    <form action="#" onSubmit={handleformSubmit}>
      <h2>Register</h2>
        <div class="input-field">
        <input type="text" name="name" required/>
        <label>Enter your name</label>
      </div>

      <div class="input-field">
        <input type="text" name="email" required/>
        <label>Enter your email</label>
      </div>
      <div class="input-field">
        <input type="password" name="password" required/>
        <label>Enter your password</label>
      </div>


      <div class="input-field">
        <input type="url" name="photo" required/>
        <label>Enter your image</label>
      </div>

      <div className="input-field ">
            <select name="role" required>
              <option  value="" disabled selected>
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
      
      <button type="submit">Register</button>
      <div class="register">
        <button onClick={handleGoogle} className='rounded-md'>Login with Google</button>
      </div>
    </form>
  </div>
  </div>
  )
}
