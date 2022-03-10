
import GUN from 'gun';
import { useEffect, useState, useRef } from 'react';
import { useUserContext } from './user'
import SEA from 'gun/sea'
import Login from './login.tsx'
import './App.css'
import Header from './header'
import ChatBox from './chat_box'

const db = GUN({
  // peers: ['http://localhost:8000/gun'] // Put the relay node that you want here
  peers: ['https://hive-relay.herokuapp.com/gun'] // Put the relay node that you want here
})

function Chat() {
  const { user, username, room, setRoom } = useUserContext()
  const [newMessage, setNewMessage] = useState()
  const [messages, setMessages] = useState([])
  const [canAutoScroll, setCanAutoScroll] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(false);
  const scrollBottom = useRef()
  const lastScrollTop = useRef()

  useEffect(() => {
    canAutoScroll && autoScroll()
  }, [canAutoScroll])

  function autoScroll() {
    setTimeout(() => scrollBottom.current?.scrollIntoView({ behavior: 'auto' }), 50);
    setUnreadMessages(false)
  }


  useEffect(() => {
    getMessages()
  }, [room]);

  function getMessages() {
    var match = {
      '.': {
        '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
      },
      '-': 1, // filter in reverse
    };


    // Get Messages
    db.get(room)
      .map(match)
      .once(parseMessage);
  }

  async function parseMessage(data, id) {
    if (!data) return;


    // Key for end-to-end encryption
    const key = '#foo';

    var message = {
      // transform the data
      who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
      what: (await SEA.decrypt(data.what, key)) + '', // force decrypt as text.
      when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
    };

    if (!message.what) return;

    setMessages(prevMessages => [...prevMessages.slice(-100), message].sort((a, b) => a.when - b.when))
        
    if (canAutoScroll) {
      autoScroll();
    } else {
      setUnreadMessages(true)
    }
  }

  async function sendMessage() {
    const secret = await SEA.encrypt(newMessage, '#foo');
    const message = user.get('all').set({ what: secret });
    const index = new Date().toISOString();
    db.get(room).get(index).put(message);
    setNewMessage('');
    setCanAutoScroll(true);
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage()
  }

  function changeRoom(room) {
    setMessages([])
    setRoom(room)
  }

  return (
    <div className='chat-container'>
      
      {username && (
        <>
          <div className='sidebar-container'>
            <div className='sidebar-head'>
              <div>
                <image />
                <div>
                  <h6>Welcome</h6>
                  <p>{username}</p>
                </div>
              </div>
            </div>

            <div className='sidebar-channels'>
              <details open>
                <summary>Channels</summary>
                <div>
                  <p>DevTeam</p>
                  <p>General</p>
                  <p>Random</p>
                  <p>SalesTeam</p>
                  <p>GamerTalk</p>
                </div>
              </details>
            </div>

            <div className='sidebar-dms'>
            <details open>
              <summary>Direct Messages</summary>
              <div className='sidebar-dms-list'>

                <div className='dm-card'>
                  <image />
                  <h6>Lisa F. Bogar</h6>
                </div>
                <div className='dm-card'>
                  <image />
                  <h6>Lisa F. Bogar</h6>
                </div>
                <div className='dm-card'>
                  <image />
                  <h6>Lisa F. Bogar</h6>
                </div>
                <div className='dm-card'>
                  <image />
                  <h6>Lisa F. Bogar</h6>
                </div>

              </div>
            </details>
            </div>
          </div>

          <div className='main-container'>
            <div className='main-navbar'>
              <div className='main-navbar-logo'>
                <image/>
                <p>HIVE</p>
              </div>
              <div className='main-navbar-user'>
                <image/>
              </div>
            </div>

            <div className='main-body'>
              <div className='main-body-left'>
                <div className='main-body-chat'>
                  
                </div>
                <div className='main-body-input'>
                  <input placeholder='Type message ...'/>
                  <button onClick={()=>{}}>></button>
                </div>
              </div>
              <div className='main-body-right'>
                <div className='main-body-user-info'>
                  
                </div>
                <div className='main-body-interaction-timeline'>
                  
                </div>
                <div className='main-body-contact-info'>
                  
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!username && <Login />}
    </div >
  )
}

export default Chat