import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

import LoginForm from './pages/LoginForm';
import Main from './pages/Main';

import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('pulkit')
  const [password, setPassword] = useState('pulkit123') 
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(`Bearer ${user.token}`)
    }
  }, [])

  const setErrorMessage = (error) => console.log(error)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setToken(`Bearer ${user.token}`)
      setUser(user)
      // console.log(user);
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(exception)
    }
  }
  const logout = () =>{
    if (window.localStorage.length) {
      window.localStorage.removeItem('loggedNoteappUser')
    }
    window.location.reload();
  }
  const handleBogSubmit = async (e) =>{
    e.preventDefault();

    try {
      // console.log("token",token);
      const newObject = {
        title, author, url, likes: 10
      }
      const bog = await blogService.create(
        { newObject: newObject , token: token})
        // console.log(bog);
      setBlogs(blogs.concat(bog));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      setErrorMessage(exception)
    }
  }
  const blogForm = ({blogs}) =>{
    
    return (
        <>
          <h1>blogs</h1>
          <p>{user.name} logged in <button onClick={logout} >logout</button> </p>

        <form onSubmit={handleBogSubmit}>
          
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Username"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Username"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Username"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
         
          <button type="submit">Submit</button>
        </form>


          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )
          }
        </>
    )
  }

  return (
    <div className='container' >
      <div className="green"></div>
      {user ? 
      <Main logout={logout} /> 
      : 
      <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />}
    </div>
  )
}

export default App