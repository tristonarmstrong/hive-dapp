import React from 'react'
import '../App.css'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import MainBody from '../components/MainBody'
import { useUserContext } from '../hooks/user'
import { useNavigate } from 'react-router-dom'


function Main() {
  const { user, username, team, setTeam, channel, db, signout } = useUserContext()
  const navigate = useNavigate()


  if (!username || !team) {
    signout()
    navigate('/')
    return <></>
  }

  return (
    <div className='chat-container'>
      <Sidebar />
      <div className='main-container'>
        <Navbar />
        <MainBody />
      </div>
    </div >
  )
}

export default Main