
import GUN from 'gun';
import { useEffect, useState, useRef } from 'react';
import { useUserContext } from './user'
import SEA from 'gun/sea'
import Login from './login.tsx'
import './App.css'
import Header from './header'
import ChatBox from './chat_box'
import generate_image_url from './utils/generate_image_url'
import {COLOR} from './constants/index.ts'
import MessageInput from './components/MessageInput.tsx'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import MainBody from './components/MainBody'


function Chat() {
  const { user, username, room, setRoom, signout } = useUserContext()
  const [canAutoScroll, setCanAutoScroll] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(false);
  const scrollBottom = useRef()
  const lastScrollTop = useRef()


  return (
    <div className='chat-container'>
      
      {username && (
        <>
          <Sidebar/>

          <div className='main-container'>
            <Navbar/>
            <MainBody/>
          </div>
        </>
      )}

      {!username && <Login />}
    </div >
  )
}

export default Chat