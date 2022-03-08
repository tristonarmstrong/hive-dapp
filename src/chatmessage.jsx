import React, { useEffect, useState } from 'react'


function ChatMessage({ message, sender }) {
  // const [messageClass, setMessageClass] = useState()
  const [avatar, setAvatar] = useState()
  const [ts, setTs] = useState()

  useEffect(() => {
    if (!message || !sender) return;

    // const messageClass = message.who === sender ? 'sent' : 'received';
    // setMessageClass(messageClass)

    const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;
    setAvatar(avatar)

    const ts = new Date(message.when);
    setTs(ts)
  }, [message, sender])

  return (
    <div className='message-container'>
      <img className='message-image' src={avatar} alt="avatar" width={20} height={20} />
      <div className='message-text-container' >
        <div className='message-owner-container'>
          <p className='message-owner'>{message.who}</p>
          <time className='message-time'>{ts?.toLocaleTimeString()}</time>
        </div>
        <p className='message-text'>{message?.what}</p>

      </div>
    </div>
  )
}

export default ChatMessage