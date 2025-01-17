import React from 'react'
import './Login.css'
export default function Login() {
  return (
    <div className='bk'>
    <div class="wrapper">
    <form action="#">
      <h2>Register</h2>
        <div class="input-field">
        <input type="text" required/>
        <label>Enter your name</label>
      </div>

      <div class="input-field">
        <input type="text" required/>
        <label>Enter your email</label>
      </div>
      <div class="input-field">
        <input type="password" required/>
        <label>Enter your password</label>
      </div>


      <div class="input-field">
        <input type="url" required/>
        <label>Enter your image</label>
      </div>

      <div className="input-field ">
            <select required>
              <option value="" disabled selected>
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
      
      <button type="submit">Register</button>
      <div class="register">
        <p>Don't have an account? <a href="#">Register</a></p>
      </div>
    </form>
  </div>
  </div>
  )
}
