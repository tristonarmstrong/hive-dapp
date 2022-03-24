import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';
import React, { useContext, useEffect, useState } from 'react';

const UserContext = React.createContext({});
export const useUserContext = () => useContext(UserContext)

const UserContextProvider = (props) => {
	const [db, setDb] = useState()
	const [user, setUser] = useState()
	const [username, setUserName] = useState('')
	const [channel, _setChannel] = useState()
	const [team, setTeam] = useState()
	const [chan_subs, setChan_subs] = useState([])


	useEffect(() => {
		!db && setDb(GUN({
			// peers: ['http://localhost:8000/gun'] // Put the relay node that you want here
			peers: ['https://hive-relay.herokuapp.com/gun'] // Put the relay node that you want here
		}))
		setUserName('')
	}, [])

	useEffect(() => {
		if (!db) return;
		setUser(db.user().recall({ sessionStorage: true }))
	}, [db])

	useEffect(() => {
		if (!user) return;

		console.log("USER: ", user)
		user.get('alias').on(v => setUserName(v));

		db.on('auth', async (event) => setUserName(await user.get('alias')));
	}, [user])

	const login = (username, password) => {
		if (!username || !password) {
			alert("Complete all fields")
			return
		}

		user.auth(username, password, ({ err }) => {
			err && alert(err)
		});
	}

	function signout() {
		user && user.leave()
		username && setUserName('')
		setTeam(undefined)
		setChannel(undefined)
	}

	const signup = (username, password) => {
		if (!username || !password) {
			alert("Complete all fields")
			return
		}
		user.create(username, password, ({ err }) => {
			if (err) {
				alert(err);
			} else {
				login(username, password);
			}
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


