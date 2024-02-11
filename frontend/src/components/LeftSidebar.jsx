import './LeftSidebar.css'
import loginService from "../services/login";
import Chat from '../components/Chat'
import { useEffect, useState } from 'react'; // Import useEffect

const LeftSidebar = ({ logout, Users = [], setUsers,currUser,setCurrUser,messages,user }) => {
  const [content, setCotent] = useState("chats")
  const [query, setquery] = useState("")
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
  }, [Users, setUsers,messages]);

  const startConvo = () =>{
    if(query==="") return
    const user = Users.find((user)=>user.username===query)
    if(user){
      setCotent("chats")
      setCurrUser(user)
    }
    else{
      alert("User not found")
    }
  }

  return (
    <div className='leftSidebar'>
      <div className="top">
        <span className="material-symbols-outlined" onClick={()=>setCotent("account")} >
          account_circle
        </span>
        <p style={{ display: "inline" }}>
          <span className="material-symbols-outlined" onClick={()=>setCotent("new")} >
            add_circle
          </span>
          <span className="material-symbols-outlined" onClick={()=>setCotent("chats")} >
            chat
          </span>
          <span className="material-symbols-outlined" onClick={() => {
            if (window.confirm("Do you want to Log out ?")) {
              logout();
              window.location.reload();
            }
          }}>
            logout
          </span>
        </p>
      </div>
      {
        content=='chats'
        ?
        <div className="chats">
            {messages.map((msg, index) => (
              <Chat key={index} msg={msg} currUser={currUser} setCurrUser={setCurrUser} Users={Users} user={user} />
              ))}
          </div>
        :
        content=='account'?
        <div className='account'>
            <h1>Account Details</h1>
            <h3>Name - {user.name}</h3>
            <h3>Username - {user.username}</h3>
          </div>
        :
        content=='new'?
          <div className='new'>
            <input 
              type="text" 
              value={query}
              onChange={(e)=>setquery(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key=="Enter"){
                  setquery("")
                  startConvo()
                }
              }}
            />
            <button onClick={()=>startConvo()} >Start a new Conversation</button>
          </div>
        :
          <></>
      }
    </div>
  )
}

export default LeftSidebar;
