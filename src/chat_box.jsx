import React from 'react'
import { useUserContext } from './user'
import ChatMessage from './chatmessage'
import './App.css'


function ChatBox({ messages, handleSubmit, newMessage, setNewMessage }) {	
	return (
		<main className='chat-box-main'>
			<div className='chat-box-messages-container'>
				{messages.map((message, i) => {
					if (!message?.who) return null;
					return <ChatMessage key={i} message={message} sender={message.who} />
				})}
			</div>

			<form className='chat-box-form' onSubmit={handleSubmit}>
				<input className='chat-box-input' type="text" placeholder="Type a message..." onChange={e => setNewMessage(e.target.value)} value={newMessage} maxLength="100" />
				<button className='chat-box-button' type="submit" disabled={!newMessage}>Send</button>
			</form>
		</main>
	)
}

export default ChatBox