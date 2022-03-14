import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useUserContext} from '../hooks/user'

const Navbar = () => {
	const {username, signout, setTeam} = useUserContext()
	const navigate = useNavigate()

	return (
		<div className='main-navbar'>
			<div className='main-navbar-logo'>
				<img src={'/HIVE_inline.png'} alt="LOGO" />
			</div>
			<div className='main-navbar-user'>
				<button onClick={()=>{
					setTeam(undefined)
					navigate('/pickteam')
				}}>Change Swarm</button>
				<p className='signout-button' onClick={signout}>Sign Out</p>
			</div>
		</div>)
}

export default Navbar