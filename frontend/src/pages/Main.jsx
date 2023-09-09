import { useState } from 'react';
import LeftSidebar from '../components/LeftSidebar'
import RightMain from '../components/RighMain'
import './Main.css'

const Main = ({currUser,setCurrUser}) =>{
  const [Users, setUsers] = useState()
  const logout = () =>{
    if (window.localStorage.length) {
      window.localStorage.removeItem('WhatsappUser')
    }
    window.location.reload();
  }
  return (
      <div className='main' >
        <LeftSidebar logout={logout} Users={Users} setUsers={setUsers} currUser={currUser} setCurrUser={setCurrUser} />
        <RightMain currUser={currUser} setCurrUser={setCurrUser} />
      </div>
  )
}

export default Main