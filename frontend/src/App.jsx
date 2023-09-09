import { useState, useEffect } from 'react';

import LoginForm from './pages/LoginForm';
import Main from './pages/Main';

import './App.css';

const App = () => {
  // const [blogs, setBlogs] = useState([])
  // const [title, setTitle] = useState('') 
  // const [author, setAuthor] = useState('') 
  // const [url, setUrl] = useState('') 
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')
  const [currUser, setCurrUser] = useState(null)

  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('WhatsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(`Bearer ${user.token}`)
    }
  }, [])

  // const handleBogSubmit = async (e) =>{
  //   e.preventDefault();

  //   try {
  //     // console.log("token",token);
  //     const newObject = {
  //       title, author, url, likes: 10
  //     }
  //     const bog = await blogService.create(
  //       { newObject: newObject , token: token})
  //       // console.log(bog);
  //     setBlogs(blogs.concat(bog));
  //     setTitle("");
  //     setAuthor("");
  //     setUrl("");
  //   } catch (exception) {
  //     setErrorMessage(exception)
  //   }
  // }
  // const blogForm = ({blogs}) =>{
    
  //   return (
  //       <>
  //         <h1>blogs</h1>
  //         <p>{user.name} logged in <button onClick={logout} >logout</button> </p>

  //       <form onSubmit={handleBogSubmit}>
          
  //         <div>
  //           title:
  //           <input
  //             type="text"
  //             value={title}
  //             name="Username"
  //             onChange={({ target }) => setTitle(target.value)}
  //           />
  //         </div>
          
  //         <div>
  //           author:
  //           <input
  //             type="text"
  //             value={author}
  //             name="Username"
  //             onChange={({ target }) => setAuthor(target.value)}
  //           />
  //         </div>
          
  //         <div>
  //           url:
  //           <input
  //             type="text"
  //             value={url}
  //             name="Username"
  //             onChange={({ target }) => setUrl(target.value)}
  //           />
  //         </div>
         
  //         <button type="submit">Submit</button>
  //       </form>


  //         {
  //           blogs.map(blog =>
  //             <Blog key={blog.id} blog={blog} />
  //           )
  //         }
  //       </>
  //   )
  // }

  return (
    <div className='container' >
      <div className="green"></div>
      {user ? 
      <Main currUser={currUser} setCurrUser={setCurrUser} /> 
      : 
      <LoginForm setToken={setToken} setUser={setUser} token={token} />}
    </div>
  )
}

export default App