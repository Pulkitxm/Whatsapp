import './chat.css'
const Chat = ({user,setCurrUser,CurrUser}) => {
  return (
    <div className="chatBox" onClick={()=>{
      setCurrUser(user)
    }}>
        <h2>{user.name}</h2>
    </div>
  )
}

export default Chat