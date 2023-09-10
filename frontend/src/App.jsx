import { useState, useEffect } from 'react';

import LoginForm from './pages/LoginForm';
import Main from './pages/Main';
import loginService from "./services/login";
import chatsService from "./services/chat";
import './App.css';

const App = () => {
  // const [blogs, setBlogs] = useState([])
  // const [title, setTitle] = useState('') 
  // const [author, setAuthor] = useState('') 
  // const [url, setUrl] = useState('') 
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')  
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currUser, setCurrUser] = useState(null)
  const [page, setpage] = useState("login");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
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
          let chats;
          await chatsService.fetchAll().then(res=>{
            chats=res;
          });
          let  msgs = [];
          user.chats=chats?chats.filter(i=>{
            if (i.senderId==user.id || i.receiverId==user.id){
              msgs.push(i);
              return true;
            };
          })
          :[];
          setMessages(msgs);
          window.localStorage.setItem(
            "WhatsappUser",
            JSON.stringify(user)
          );
          setToken(`Bearer ${user.token}`);
          setUser(user);
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
  const setErrorMessage = (error) => console.log(error);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('WhatsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(`Bearer ${user.token}`)
      setMessages(user.chats);
      if (window.localStorage.getItem('CurrWhatsappUser')) {
        setCurrUser(JSON.parse(window.localStorage.getItem('WhatsappUser')))
        window.localStorage.removeItem('CurrWhatsappUser')
      };
    }
  }, [])

  return (
    <div className='container' >
      <div className="green"></div>
      {user ? 
      <Main   setToken={setToken} setUser={setUser} setpage={setpage} currUser={currUser} username={username} password={password} handleLogin={handleLogin} setCurrUser={setCurrUser} user={user} messages={messages} setMessages={setMessages} /> 
      : 
      <LoginForm name={name} setName={setName} repassword={repassword} setRePassword={setRePassword} username={username} setUsername={setUsername} password={password} setPassword={setPassword} loading={loading} handleLogin={handleLogin} page={page} setpage={setpage} handleSignUp={handleSignUp} setToken={setToken} setUser={setUser} token={token} messages={messages} setMessages={setMessages} />}
    </div>
  )
}

export default App