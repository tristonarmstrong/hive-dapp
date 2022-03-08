
import GUN from 'gun';
import { useEffect, useReducer, useState, useRef } from 'react';
import { useUserContext } from './user'
import SEA from 'gun/sea'
import ChatMessage from './chatmessage'
import Login from './login'
import './App.css'
import Header from './header'
import ChatBox from './chat_box'

const db = GUN({
  // peers: ['http://localhost:8000/gun'] // Put the relay node that you want here
  peers: ['https://hive-relay.herokuapp.com/gun'] // Put the relay node that you want here
})

function Chat() {
  const { user, username, signout, room, setRoom } = useUserContext()
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

  function watchScroll(e) {
    setCanAutoScroll((e.target.scrollTop || Infinity) > lastScrollTop)
    lastScrollTop.current = e.target.scrollTop;
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
        <div className='chat-body-container'>

          <div className='sidebar-container'>
            <button className={`sidebar-link ${room == 'devTeam' ? 'sidebar-link-selected' : ''}`} onClick={() => changeRoom('devTeam')}>devTeam</button>
            <button className={`sidebar-link ${room == 'TestRoom1' ? 'sidebar-link-selected' : ''}`} onClick={() => changeRoom('TestRoom1')}>TestRoom</button>
            <button className={`sidebar-link ${room == 'TestRoom2' ? 'sidebar-link-selected' : ''}`} onClick={() => changeRoom('TestRoom2')}>TestRoom2</button>
            <button className={`sidebar-link ${room == 'TestRoom3' ? 'sidebar-link-selected' : ''}`} onClick={() => changeRoom('TestRoom3')}>TestRoom3</button>
            <button className={`sidebar-link ${room == 'TestRoom4' ? 'sidebar-link-selected' : ''}`} onClick={() => changeRoom('TestRoom4')}>TestRoom4</button>
            <button className={`sidebar-link ${room == 'TestRoom5' ? 'sidebar-link-selected' : ''}`} onClick={() => changeRoom('TestRoom5')}>TestRoom5</button>
          </div>

          <Header />
          <ChatBox 
            messages={messages} 
            handleSubmit={handleSubmit} 
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        </div>
      )}

      {!canAutoScroll && (
        <div class="scroll-button">
          <button onClick={autoScroll}>
            {unreadMessages ? "💬" : "👇"}
          </button>
        </div>
      )}

      {!username && <Login />}
    </div >
  )
}

export default Chat