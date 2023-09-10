import { useState } from 'react';
import LeftSidebar from '../components/LeftSidebar'
import RightMain from '../components/RighMain'
import './Main.css'

const Main = ({currUser,setCurrUser,user,messages,setMessages,username,password,handleLogin,setToken,setUser,setpage}) =>{
  const [Users, setUsers] = useState()
  const logout = () =>{
    if (window.localStorage.length) {
      window.localStorage.removeItem('WhatsappUser')
    }
  }
  return (
      <div className='main' >
        <LeftSidebar logout={logout} Users={Users} setUsers={setUsers} user={user} currUser={currUser} setCurrUser={setCurrUser} messages={messages} />
        <RightMain logout={logout} username={username} password={password} handleLogin={handleLogin} user={user} currUser={currUser} setCurrUser={setCurrUser}  messages={messages} setMessages={setMessages}  setToken={setToken} setUser={setUser} setpage={setpage} />
      </div>
  )
}

export default Main