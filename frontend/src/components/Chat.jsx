import './chat.css'
const Chat = ({msg,setCurrUser,CurrUser,Users,user}) => {
  const prs = Users.find(i=>i.id==msg.receiverId)?Users.find(i=>i.id==msg.receiverId):'';
  return (
    <div className="chatBox" onClick={()=>{
      setCurrUser(Users.find(i=>i.id==msg.receiverId)?Users.find(i=>i.id==msg.receiverId):null)
    }}>
        <h2>{prs.name}</h2>
    </div>
  )
}

export default Chat