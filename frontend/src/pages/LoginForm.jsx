import React from 'react'

import './login.css'

const LoginForm = ({handleLogin,username,password,setUsername,setPassword}) =>{
  return(
    <div className='login'>
      <form onSubmit={handleLogin}>
        <h1>WhatsApp</h1>
        <div>
            <label htmlFor="username">Username</label>
          <br/>
          <input
            type="text"
            value={username}
            name="Username"
            id='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            value={password}
            name="Password"
            id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm