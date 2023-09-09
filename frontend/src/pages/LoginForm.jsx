import { useState } from "react";
import loginService from "../services/login";

import "./login.css";

const LoginForm = ({ setToken, setUser }) => {
  const [name, setName] = useState("Pulkit");
  const [username, setUsername] = useState("pulkit");
  const [password, setPassword] = useState("pulkit123");
  const [repassword, setRePassword] = useState("pulkit123");
  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [repassword, setRePassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState("login");

  const setErrorMessage = (error) => console.log(error);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (username && password) {
      setLoading(true);
      try {
        const xyz = await loginService.getUsers();
        if (xyz.some((user) => user.username === username) == true) {
          const user = await loginService.login({
            username,
            password,
          });
          user.chats=[];
          window.localStorage.setItem(
            "WhatsappUser",
            JSON.stringify(user)
          );
          console.log(user);
          setToken(`Bearer ${user.token}`);
          setUser(user);
          setUsername("");
          setPassword("");
        } else {
          if ( window.confirm("User do not exists , would you like to sign up ?")){
            setpage('signup');
          }
        }
      } catch (exception) {
        setErrorMessage(exception);
        // alert("Incorrect Password")
        setPassword('')
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (repassword != password) {
      alert("Passwords don't match");
      setPassword("");
      setRePassword("");
    } else {
      const users = await loginService.getUsers();
      if (users.some((user) => user.username === username) == false) {
        try {
          await loginService.signup({
            name,
            username,
            password,
          });
          setpage('login')
        } catch (exception) {
          setErrorMessage(exception);
        } finally {
          setLoading(false);
        }
      } else{
        if (window.confirm("User Already Exists , Would you like to log in ?")){
          handleLogin(event);
        } else{
          setLoading(false)
        }
      }
    }
  };

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
