import React from 'react'
import {useUserContext} from '../user'

const Navbar = () => {
	const {username, signout} = useUserContext()
	return (
		<div className='main-navbar'>
			<div className='main-navbar-logo'>
				<img src={'/HIVE_inline.png'} alt="LOGO" />
			</div>
			<div className='main-navbar-user'>
				<p className='signout-button' onClick={signout}>Sign Out</p>
			</div>
		</div>)
}

export default Navbar