import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import posed from 'react-pose';

import { getUser } from '../helpers/getUser';
import { deleteUser } from '../helpers/deleteUser';

import Logo from '../assets/tabchat-logo.png';

const user = getUser();

const Chat = posed.div({
  open: {
    x: '0%',
    delayChildren: 200,
    staggerChildren: 50
  }
});

const Message = posed.div({
  open: { 
    y: 0, 
    opacity: 1 
  },
  closed: { 
    y: 20, 
    opacity: 0
    }
});


const Chatroom = () => {
  const [msg, setMsg] = useState('');
  let [theChat, setChat] = useState(JSON.parse(localStorage.getItem("chat")));
  let [isOpen, setisOpen] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    let entry = {
      user,
      msg: e.target[0].value,
      timeStamp: new Date()
    };

    theChat.push(entry);
    localStorage.setItem('chat', JSON.stringify(theChat));
    setMsg('');
  };

  const handleStorageEvent = () => {
    setChat(JSON.parse(localStorage.getItem("chat")));
  }

  if(theChat == null) {
    // Setting an empty array using setChat doesn't seem to be working, that's why...
    theChat = [];
    localStorage.setItem('chat', JSON.stringify(theChat));
    handleStorageEvent();
  }

	if (!user) return (
		<Redirect to={"/login"} />
	);

  useEffect(
    () => {
      window.addEventListener('storage', handleStorageEvent)
      setTimeout(function() {
        setisOpen(true);
      }, 500)
      return () => {
        window.removeEventListener('storage', handleStorageEvent)
      }
    }
  )

	return (
    <div className="chatroom">
      <div className="topbar">
        <img src={Logo} alt="logo"/>
        <div className="menu">
          <div className="user-img" style={{backgroundImage: 'url(' + user.img + ')'}}/>
          <div>
            <p>{user.displayName}</p>
            <span onClick={() => deleteUser()}>Log out</span>
          </div>
        </div>
      </div>
      <div className="chat-container">
        <Chat className="chat" pose={isOpen ? 'open' : 'closed'}>
          {theChat.map((msg, index) => {
            return (
              <Message className={"msg " + (user.id === msg.user.id ? 'cur' : '')} key={index}>
                <div className="userimg">
                  <img alt="userimg" src={msg.user.img}/>
                </div>
                <div className="content">
                  {msg.msg}
                </div>
              </Message>
            )
          })}

          { theChat.length === 0 ? (
            <Message className="nomsg">No messages</Message>
          ) : null }


        </Chat>
      </div>
      <div className="submitform">
        <form onSubmit={handleForm}>
          <input value={msg}
                  type='text'
                  onChange={e => setMsg(e.target.value)} />
          <input disabled={msg.length === 0} type="submit" value="Submit" />
        </form>
      </div>
    </div>
	);
}

export default Chatroom;
