import { useState } from "react";
import "./login.css";

const LoginForm = ({ handleLogin,handleSignUp,username,setUsername,password,setPassword,loading,page,setpage,name,setName,repassword,setRePassword }) => {


  return page === "signup" ? (
    <div className="signup">
      <form onSubmit={handleSignUp}>
        <h1>WhatsApp</h1>
        <div>
          <label htmlFor="up-name">Name</label>
          <br />
          <input
            type="text"
            value={name}
            name="Name"
            id="up-name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor="up-username">Username</label>
          <br />
          <input
            type="text"
            value={username}
            name="Username"
            id="up-username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="up-password">Password</label>
          <br />
          <input
            type="password"
            value={password}
            name="Password"
            id="up-password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <label htmlFor="re-up-password">Re Enter Password</label>
          <br />
          <input
            type="password"
            value={repassword}
            name="Password"
            id="re-up-password"
            onChange={({ target }) => setRePassword(target.value)}
          />
        </div>
        {password === repassword && username && name  ? (
          <button type="submit" disabled={loading}>
            {loading ? <div className="loader"></div> : "Sign-Up"}
          </button>
        ) : (
          <button type="submit" style={{ opacity: ".5" }} disabled={true}>
            {loading ? <div className="loader"></div> : "Sign-Up"}
          </button>
        )}

        <p className="changeinup" onClick={() => setpage("signin")}>
          Already have an Account ?
        </p>
      </form>
    </div>
  ) : (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h1>WhatsApp</h1>
        <div>
          <label htmlFor="in-username">Username</label>
          <br />
          <input
            type="text"
            value={username}
            name="Username"
            id="in-username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="in-password">Password</label>
          <br />
          <input
            type="password"
            value={password}
            name="Password"
            id="in-password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        {username && password ? (
          <button type="submit" disabled={loading}>
            {loading ? <div className="loader"></div> : "login"}
          </button>
        ) : (
          <button type="submit" disabled={loading} style={{ opacity: ".5" }}>
            {loading ? <div className="loader"></div> : "login"}
          </button>
        )}
        <p className="changeinup" onClick={() => setpage("signup")}>
          {"Don't have an Account ?"}
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
