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
	const [channel, setChannel] = useState()
	const [team, setTeam] = useState()

	useEffect(() => {
		setDb(GUN({
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
				signup
			}
		}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContextProvider


