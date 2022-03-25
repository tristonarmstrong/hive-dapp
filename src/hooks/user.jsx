import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import React, { useContext, useEffect, useState } from 'react';
import getGunOnce from '../utils/getGunOnce'

const UserContext = React.createContext({});
export const useUserContext = () => useContext(UserContext)

const UserContextProvider = (props) => {
	const [db, setDb] = useState()

	// user stuff
	const [user, setUser] = useState()
	const [username, setUserName] = useState('')

	// channels
	const [channel, _setChannel] = useState()
	const [channels, setChannels] = useState([])
	const [chan_subs, setChan_subs] = useState([])

	// team stuff
	const [team, setTeam] = useState()



	useEffect(() => {
		!db && setDb(GUN({
			web: 'web',
			file: 'db/data.json',
			// peers: ['http://localhost:8000/gun'] // Put the relay node that you want here
			peers: ['https://hive-relay.herokuapp.com/gun'] // Put the relay node that you want here
		}))
		setUserName('')
	}, [])

	useEffect(() => {
		db && setUser(db.user().recall({ sessionStorage: true }))
	}, [db])

	useEffect(() => {
		if (!user) return;
		user.get('alias').once(val => setUserName(val));
		db.on('auth', async (event) => user.get('alias').once(val => setUserName(val)));
	}, [user])

	const login = (username, password) => {
		if (!username || !password) return alert("Complete all fields");
		user.auth(username, password, ({ err }) => err && alert(err));
	}

	function signout() {
		user && user.leave()
		username && setUserName('')
		setTeam(undefined)
		setChannel(undefined)
	}

	const signup = (username, password) => {
		if (!username || !password) return alert("Complete all fields");

		user.create(username, password, ({ err }) => {
			if (err) return alert(err);
			login(username, password);
		});
	}

	const setChannel = (channel) => {
		db.get(team._.soul)
			.get('channels')
			.get(channel)
			.get('messages')
			.map()
			.off()
		_setChannel(channel)
	}

	return (

		<UserContext.Provider value={
			{
				db, 
				user, 
				username, 
				signout, 
				channel,
				team,
				setTeam,
				setChannel, 
				login, 
				signup,
				chan_subs, setChan_subs
			}
		}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContextProvider


