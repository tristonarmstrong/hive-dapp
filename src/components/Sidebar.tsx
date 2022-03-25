import React, { useEffect, useState } from 'react'
import generate_image_url from '../utils/generate_image_url'
import { useUserContext } from '../hooks/user'

const Sidebar: () => JSX.Element = (): JSX.Element => {
  const { user, username, setChannel, channel, team, setTeam, db } = useUserContext()
  const [channels, setChannels] = useState([])
  const [dms, setDms] = useState([])
  const [teams, setTeams] = useState([])

  useEffect(() => {
    // populate channel sidebar
    team?.get('channels').map().once((c, i) => updateChannels(i))
    
    // populate teams sidebar
    user?.get('teams').once().map().once(team => {
      if (!team.name) return null;
      setTeams(_ => [..._, team])
    })
  }, [team])


  useEffect(() => {
    if (channel != channels[0]) setChannel(channels[0])
  }, [channels])

  const updateChannels = (new_channel: string) => {
    if (!new_channel) return;
    if (channels.includes(new_channel)) return;
    setChannels(prev => [...prev, new_channel])
  }

  function changeChannel(channel) {
    setChannel(channel)
  }

  const createChannel = () => {
    let chan: string = prompt("Name the channel")
    let ref = db.get(chan).put({ name: chan })
    team.get('channels').set(ref)
    setChannel(chan)
  }

  const createDm = () => {
    // future
  }

  return (
    <div className='sidebar-container'>
      <div className='sidebar-team-container'>
        {teams && teams.map(_team => {
          return (
            <img onClick={() => {
              alert(`Switching to team: ${_team.name}`)
              let t = db.get(_team.name)
              setTeam(t)
            }} className={`team-avatar ${_team.name == team.name ? 'team-selected' : ''}`} src={generate_image_url(_team.name)} />
          )
        })}
      </div>
      <div className='sidebar-channel-container'>
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
          <h2>{team._.get}</h2>
          <details open>
            <summary>Channels</summary>
            <div>
              {channels?.map((chan, i) => {
                if (typeof chan !== 'string') return null;
                return <p key={`channel:${i}`} onClick={() => changeChannel(chan)} className={`${channel == chan ? 'selected' : ''}`}>{chan}</p>
              })}

              <button onClick={createChannel} className='creator-button'>+ Create Channel</button>
            </div>
          </details>
        </div>

        <div className='sidebar-dms'>
          <details open>
            <summary>Direct Messages</summary>
            <div className='sidebar-dms-list'>

              {dms?.map((dm, i) => {
                return (
                  <div key={`dm:${i}`} className='dm-card'>
                    <img src={generate_image_url(dm)} />
                    <h6>{dm}</h6>
                  </div>
                )
              })}

              <button onClick={createDm} className='creator-button'>+ Compose Message</button>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

