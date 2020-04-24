import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';
var jwt = require('jsonwebtoken');


let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:4000';
  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name)
    socket.emit('join', { name }, (error) => {
      if(error) {
        alert(error);
      }
    });
  
  }, [ENDPOINT, location.search]);
  // const socket = io.connect(ENDPOINT);
// socket.on('connect', () => {
//   socket
//     .emit('authenticate', { token: jwt }) 
//     .on('authenticated', () => {
//     })
//     .on('unauthorized', (msg) => {
//       console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
//       throw new Error(msg.data.type);
//     })
// });
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    // socket.emit('userMessages', messages, () => setMessage(''));
    
}, []);
  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar  name={name}/>
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;




