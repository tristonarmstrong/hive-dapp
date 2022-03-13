import React, { useEffect, useState } from 'react'
import { useUserContext } from '../hooks/user';
import '../App.css'
import { Link, NavigateFunction, Outlet, useNavigate } from 'react-router-dom';


function Login(): JSX.Element {
  const { user, login, signup, username } = useUserContext()
  const [_username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate: NavigateFunction = useNavigate()

  useEffect(()=>{
    if (username) navigate('../pickteam')
  },[username])

  return (
    <div className='login-container'>

      {/* Image logo*/}
      <div className='login-title-container'>
        <img className='login-title' src='/HIVE_stack.png' />
      </div>

      {/* Login box*/}
      <div className='login-box-container'>
        <div className='login-box'>
          <div className='login-header'>
            <h1>Sign in to HIVE</h1>
            <p>Please enter your credentials to proceed</p>
          </div>
          <div className='form-input'>
            <label className='login-label'>Username</label>
            <input className='login-input' name="username" onChange={e => setUsername(e.target.value)} value={_username} minLength={3} maxLength={16} />
          </div>

          <div className='form-input'>
            <label className='login-label'>Password</label>
            <input className='login-input' name="password" onChange={e => setPassword(e.target.value)} value={password} type="password" />
          </div>
          <button className='login-button' onClick={() => login(_username, password)}>Sign in</button>
          <button className='login-button' onClick={() => signup(_username, password)}>Create Account</button>
          <Outlet />
        </div>
      </div>

    </div>
  )

}

export default Login