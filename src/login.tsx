import React, { useState } from 'react'
import { useUserContext } from './user';
import './App.css'


function Login(): JSX.Element {
  const { user } = useUserContext()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const login: () => void = (): void => {
    user.auth(username, password, ({ err }: { err: any }): void => {
      err && alert(err)
    });
  }

  const signup: () => void = (): void => {
    user.create(username, password, ({ err }: { err: any }): void => {
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

      <div className='login-box-container'>
        <div className='login-box'>
        <div className='login-header'>
          <h1>Sign in to HIVE</h1>
          <p>Please enter your credentials to proceed</p>
        </div>
        <div className='form-input'>
          <label className='login-label'>Username</label>
          <input className='login-input' name="username" onChange={e => setUsername(e.target.value)} value={username} minLength="3" maxLength="16" />
</div>

<div className='form-input'>
          <label className='login-label'>Password</label>
            <input className='login-input' name="password" onChange={e => setPassword(e.target.value)} value={password} type="password" />
</div>
          <button className='login-button' onClick={login}>Sign in</button>
          <button className='login-button' onClick={signup}>Create Account</button>
        </div>
      </div>
    </div>
  )

}

export default Login