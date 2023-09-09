import React, { useState, useEffect, useRef } from 'react';
import svg_wa from '../assets/svg-wa.png';
import './RigthMain.css';

const RighMain = ({ currUser, setCurrUser }) => {
  const [messages, setMessages] = useState([])
  const [textMessage, setMessage] = useState('');
  const conversationRef = useRef();

  document.addEventListener('keydown', function (event) {
    const searchInput = document.querySelector(".textArea input");
    var keyPressed = event.key.toLowerCase();

    if (
        keyPressed >= 'a' &&
        keyPressed <= 'z' &&
        keyPressed <= '9' ||
        keyPressed >= '0' &&
        keyPressed[0] != 'f' &&
        !event.ctrlKey &&
        keyPressed != 'enter' &&
        keyPressed != 'escape' &&
        !event.shiftKey &&
        !event.altKey &&
        event.keyCode !== 9 &&
        !searchInput.matches(':focus')
    ) {
        event.preventDefault(); // Prevent typing the letter in the document
        searchInput.value += keyPressed
        searchInput.focus(); // Focus on the search input
    } else if (event.key === '/') {
        event.preventDefault(); // Prevent typing the "/" character in the input
        searchInput.focus(); // Focus on the search input
    } else if (event.key === 'Escape') {
        searchInput.blur(); // Remove focus from the search input
    }
});
  
  function getCurrentDateTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    const formattedTime = `${hours}:${minutes} ${amOrPm}`;

    const month = now.toLocaleString('en-US', { month: 'short' });
    const day = now.getDate();
    const year = String(now.getFullYear()).substring(2, 4);

    const formattedDate = `${day}/${year}`;

    return {
      date: formattedDate,
      time: formattedTime,
    };
  }

  useEffect(()=>{
    setMessages(JSON.parse(localStorage.getItem('WhatsappUser')).chats);
  },[])

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
    console.log(messages);
  }, [messages, currUser]);
  
  const sendMessage = () => {
    if (textMessage.trim() !== '') {
      const dateTimeObj = getCurrentDateTime();
      setMessage('');
      setMessage('')
      let updatedMessages = messages.map((msg) => {
        if (msg.id === currUser.id) {
          return {
            ...msg,
            chats: msg.chats.concat({
              text: textMessage,
              time: dateTimeObj.time,
              date: dateTimeObj.date,
            }),
          };
        }
        return msg;
      });

      if (updatedMessages.length === 0) {
        updatedMessages = [
          {
            id: currUser.id,
            chats: [
              {
                text: textMessage,
                time: dateTimeObj.time,
                date: dateTimeObj.date,
              },
            ],
          },
        ];
      }

      setMessages(updatedMessages);
      let localStorage = JSON.parse(window.localStorage.getItem("WhatsappUser"));

      localStorage.chats=[...updatedMessages];
      window.localStorage.setItem("WhatsappUser",JSON.stringify(localStorage))
      console.log(localStorage);
    }
  };

  return (
    <div className={currUser === null ? 'default' : 'rigthMain'}>
      {currUser === null ? (
        <div className='default'>
          <img src={svg_wa} alt='' />
        </div>
      ) : (
        <>
          <div className='top'>
            <h2>{currUser.name}</h2>
            <span
              className='material-symbols-outlined'
              onClick={() => {
                setCurrUser(null);
              }}
            >
              close
            </span>
          </div>
          <div className='conversation'>
              { ( JSON.stringify(messages) != JSON.stringify([]) ) ? (
                messages.find((msg) => msg.id === currUser.id).chats.map((msg, index) => {
                  return (
                    <div className='message' key={index}>
                      <p>{msg.text}</p>
                      <p>
                        {msg.date}, {msg.time}
                      </p>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>

          <div className='textArea'>
            <input
              type='text'
              value={textMessage}
              placeholder='Type a message'
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                } else if (e.key=== 'Escape'){
                  e.target.blur()
                }
              }}
            ></input>
            <span
              className='material-symbols-outlined'
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
