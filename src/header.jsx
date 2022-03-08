import React from 'react'
import './App.css'
import {useUserContext} from './user'

function Header() {
	const {username, signout} = useUserContext()
	return (
		<div className='chat-header'>
			<button className='signout-button' type='button' onClick={signout}>Sign Out</button>
			<img className='header-image' src={`https://avatars.dicebear.com/api/initials/${username}.svg`} alt="avatar" width={40} height={40} />
		</div>
	)
}

export default Header