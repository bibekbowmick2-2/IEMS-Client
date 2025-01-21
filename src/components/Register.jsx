import React, { useContext } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from './AuthProviders/AuthProvider';
export default function Login() {
  const navigate = useNavigate();
  const { handleSubmit,handleGoogle,handleGithub} = useContext(ContextProvider);

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

      
            <select name="role" required defaultValue="" className='rounded-md'>
              <option  value="" disabled >
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin" disabled>Admin(❗Requires Permission)</option>
            </select>
          
      
      <button className='mt-4 p-1.5 text-gray-50' type="submit">Register</button>
      <div class="register">
        <button  onClick={() => handleGoogle(navigate)} className='btn btn-success rounded-md'>Login with Google</button>
      
        <button  onClick={() => handleGithub(navigate)} className='btn btn-primary rounded-md ml-2'>Login with Github</button>
      </div>

      
    </form>
  </div>
  </div>
  )
}
