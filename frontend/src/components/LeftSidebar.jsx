import './LeftSidebar.css'
import loginService from "../services/login";
import Chat from '../components/Chat'
import { useEffect } from 'react'; // Import useEffect

const LeftSidebar = ({ logout, Users = [], setUsers,currUser,setCurrUser }) => {
  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await loginService.getUsers();
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    if (Users.length === 0) {
      fetchUsers();
    }
  }, [Users, setUsers]);

  return (
    <div className='leftSidebar'>
      <div className="top">
        <span className="material-symbols-outlined">
          account_circle
        </span>
        <p style={{ display: "inline" }}>
          <span className="material-symbols-outlined">
            chat
          </span>
          <span className="material-symbols-outlined" onClick={() => {
            if (window.confirm("Do you want to Log out ?")) logout();
          }}>
            logout
          </span>
        </p>
      </div>
      <div className="chats">
        {Users.map((user, index) => (
          <Chat key={index} user={user} currUser={currUser} setCurrUser={setCurrUser} />
        ))}
      </div>
    </div>
  )
}

export default LeftSidebar;
