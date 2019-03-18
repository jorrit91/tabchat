import React, { useState } from 'react';


const NewMsg = (updateChat) => {
  const [msg, setMsg] = useState('');
  let [theChat] = useState(JSON.parse(localStorage.getItem("chat")));
  if(theChat == null) theChat = [];

  const handleForm = (e) => {
    e.preventDefault();
    let entry = {
      user: {
        id: 1,
        name: 'John Doe',
        img: 'https://d3iw72m71ie81c.cloudfront.net/male-44.jpg'
      },
      msg: e.target[0].value,
      timeStamp: new Date()
    };
    theChat.push(entry);
    updateChat(theChat);
    setMsg('');
  };

  return (
    <form onSubmit={handleForm}>
			<label>
				Msg:
        <textarea value={msg} 
                  onChange={e => setMsg(e.target.value)} />
			</label>
			<input disabled={msg.length === 0} type="submit" value="Submit" />
		</form>
  )
}

export default NewMsg;