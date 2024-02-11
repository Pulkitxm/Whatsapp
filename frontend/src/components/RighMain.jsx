import React, { useState, useEffect, useRef } from 'react';
import svg_wa from '../assets/svg-wa.png';
import './RigthMain.css';
import chatService from '../services/chat';
import loginService from '../services/login';
import { io } from 'socket.io-client';

const RighMain = ({ user, currUser, setCurrUser,messages,setMessages,username,password,logout,setToken,setUser,setpage }) => {
  const [textMessage, setTextMessage] = useState('');
  const conversationRef = useRef();
  const handleLogin = async () => {
    if (username && password) {
      try {
        const xyz = await loginService.getUsers();
        if (xyz.some((user) => user.username === username) == true) {
          const user = await loginService.login({
            username,
            password,
          });
          let chats;
          await chatService.fetchAll().then(res=>{
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
        console.log(exception);
      }
    }
  };

  // Function to get the current date and time
  function getCurrentDateTime() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const amOrPm = now.getHours() >= 12 ? 'PM' : 'AM';
    const month = now.toLocaleString('en-US', { month: 'short' });
    const day = now.getDate();
    const year = String(now.getFullYear()).substring(2, 4);

    return {
      date: `${day}/${year}`,
      time: `${hours}:${minutes} ${amOrPm}`,
    };
  }

  // Load messages from local storage on component mount
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('WhatsappUser'));
    if (storedMessages && storedMessages.chats) {
      setMessages(storedMessages.chats);
    }
  }, []);

  // Scroll to the bottom of the conversation when messages change
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages, currUser]);

  // Send a new message
  const sendMessage = async () => {
    if (textMessage.trim() !== '') {
      const dateTimeObj = getCurrentDateTime();
      let updatedMessages = [...messages];
      updatedMessages.map((msg) => {
        return (msg.receiverId === currUser.id && msg.senderId === user.id)
      });
      const userIndex = updatedMessages.findIndex((msg) => 
      (msg.receiverId === currUser.id || msg.senderId === currUser.id)&& (msg.receiverId === user.id || msg.senderId === user.id)
      );
      if (userIndex !== -1) {
        // The chat already exists, so update it
        updatedMessages[userIndex].chats.push({
          text: textMessage,
          time: dateTimeObj.time,
          date: dateTimeObj.date,
          senderId: user.id,
          receiverId: currUser.id,
        });
        const updatedChat = {
          id: updatedMessages[userIndex].id,
          senderId: user.id,
          receiverId: currUser.id,
          chats: updatedMessages[userIndex].chats,
        };
        setMessages([...updatedMessages]);
        await chatService.update(updatedChat.id, updatedChat,user.id,currUser.id,textMessage);
      } else {
        // The chat does not exist, so create a new chat
        const newChat = {
          senderId: user.id,
          receiverId: currUser.id,
          chats: [
            {
              text: textMessage,
              time: dateTimeObj.time,
              date: dateTimeObj.date,
              senderId: user.id,
              receiverId: currUser.id,
            },
          ],
        };

        // Create the new chat on the server
        const createdChat = await chatService.upload(newChat,user.id,currUser.id,textMessage);

        // Update the chatId for the new chat
        newChat.id = createdChat.id;
        
        // Update the state with the new chat
        setMessages([...updatedMessages, newChat]);
      }

      // Update the local storage
      const localStorageData = JSON.parse(window.localStorage.getItem('WhatsappUser')) || {};
      localStorageData.chats = updatedMessages;
      window.localStorage.setItem('WhatsappUser', JSON.stringify(localStorageData));

      // Clear the text input
      setTextMessage('');
    }
  };


  return (
    <div className={currUser === null ? 'default' : 'rigthMain'}>
      {currUser === null ? (
        <div className="default">
          <img src={svg_wa} alt="" draggable="false" />
        </div>
      ) : (
        <>
          <div className="top">
            <h2>{currUser.name}</h2>
            <span
              className="material-symbols-outlined"
              onClick={() => {
                setCurrUser(null);
              }}
            >
              close
            </span>
          </div>
          <div className="conversation" ref={conversationRef}>
            {messages.length > 0 &&
              messages.filter((msg) => (msg.receiverId === currUser.id)||(msg.senderId===currUser.id)) ?
              messages.filter((msg) => (msg.receiverId === currUser.id)||(msg.senderId===currUser.id))[0].chats ?
              messages.filter((msg) => (msg.receiverId === currUser.id)||(msg.senderId===currUser.id))[0].chats.map((msg, index) => 
                  {
                    return(
                      (msg.senderId===user.id)?
                        <div className="message right" style={{alignSelf:"flex-end",backgroundColor:"#045c84",color:"#fff"}} key={index}>
                        <p>{msg.text}</p>
                        <p>
                          {msg.date} , {msg.time}
                          </p>
                        </div>
                    
                      :
                        <div className="message left"  style={{alignSelf:"flex-start",backgroundColor:"#282c34",color:"#fff"}} key={index}>
                        <p>{msg.text}</p>
                        <p>
                          {msg.date} , {msg.time}
                          </p>
                        </div>
                    )
                  }
                )
                :null
              : null}
          </div>

          <div className="textArea">
            <input
              type="text"
              value={textMessage}
              placeholder="Type a message"
              onChange={(e) => setTextMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                } else if (e.key === 'Escape') {
                  e.target.blur();
                }
              }}
            ></input>
            <span
              className="material-symbols-outlined"
              onClick={() => sendMessage()}
            >
              send
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default RighMain;
