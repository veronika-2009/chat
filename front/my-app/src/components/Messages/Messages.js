import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import './Messages.css';
import remove from '../../img/delete.png';
import edit from '../../img/edit.png';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}>
      <Message message={message} name={name} />
      <img src={edit} alt='edit' name='edit'/>
      <img src={remove} alt='remove' name='remove'/>
    </div>)}
  </ScrollToBottom>
);

export default Messages;