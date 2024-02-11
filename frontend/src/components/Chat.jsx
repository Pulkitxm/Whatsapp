import './chat.css'
const Chat = ({msg,setCurrUser,CurrUser,Users,user}) => {
  const senserId = msg.senderId, receiverId = msg.receiverId;
  const id = user.id === senserId ? receiverId : senserId;
  const prs = Users.find(i=>i.id==id)?Users.find(i=>i.id==id):'';
  return (
    <div className="chatBox" onClick={()=>{
      setCurrUser(Users.find(i=>i.id==id)?Users.find(i=>i.id==id):null)
    }}>
        <h2>{prs.name}</h2>
    </div>
  )
}

export default Chat