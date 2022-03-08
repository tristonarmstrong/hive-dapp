import React, { useState } from 'react'
import { useUserContext } from './user';
import './App.css'


function Login() {
  const { user } = useUserContext()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const login = () => {
    user.auth(username, password, ({ err }) => {
      err && alert(err)
    });
  }

  const signup = () => {
    user.create(username, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        login();
      }
    });
  }

  return (
    <div className='login-container'>
    <div className='login-title-container'>
      <h1 className='login-title'>HIVE</h1>
    </div>
      <div className='login-box'>
        <label className='login-label'>Username
          <input className='login-input' name="username" onChange={e => setUsername(e.target.value)} value={username} minLength="3" maxLength="16" />
        </label>

        <label className='login-label'>Password
          <input className='login-input' name="password" onChange={e => setPassword(e.target.value)} value={password} type="password" />
        </label>

        <button className='login-button' onClick={login}>Login</button>
        <button className='login-button' onClick={signup}>Sign Up</button>
      </div>
    </div>
  )

}

export default Login