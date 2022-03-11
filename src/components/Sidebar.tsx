import React from 'react'
import generate_image_url from '../utils/generate_image_url'
import { useUserContext } from '../user'

const Sidebar: () => JSX.Element = (): JSX.Element => {
  const { username, setRoom, room } = useUserContext()

  function changeRoom(room) {
    setRoom(room)
  }

  return (
    <div className='sidebar-container'>
      <div className='sidebar-head'>
        <div>
          <img src={generate_image_url(username)} />
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
            <p onClick={() => changeRoom('devTeam')} className={`${room == 'devTeam' ? 'selected' : ''}`}>DevTeam</p>
            <p onClick={() => changeRoom('general')} className={`${room == 'general' ? 'selected' : ''}`}>General</p>
            <p onClick={() => changeRoom('random')} className={`${room == 'random' ? 'selected' : ''}`}>Random</p>
            <p onClick={() => changeRoom('salesTeam')} className={`${room == 'salesTeam' ? 'selected' : ''}`}>SalesTeam</p>
            <p onClick={() => changeRoom('gamerTalk')} className={`${room == 'gamerTalk' ? 'selected' : ''}`}>GamerTalk</p>
          </div>
        </details>
      </div>

      <div className='sidebar-dms'>
        <details open>
          <summary>Direct Messages</summary>
          <div className='sidebar-dms-list'>

            <div className='dm-card'>
              <img src={generate_image_url('Lisa F. Bogar')} />
              <h6>Lisa F. Bogar</h6>
            </div>
            <div className='dm-card'>
              <img src={generate_image_url('Francisco Rodriguez')} />
              <h6>Francisco Rodriguez</h6>
            </div>
            <div className='dm-card'>
              <img src={generate_image_url('Ezekiel Munez')} />
              <h6>Ezekiel Munez</h6>
            </div>
            <div className='dm-card'>
              <img src={generate_image_url('Milan Sachuetz')} />
              <h6>Milan Sachuetz</h6>
            </div>

          </div>
        </details>
      </div>
    </div>)
}

export default Sidebar

