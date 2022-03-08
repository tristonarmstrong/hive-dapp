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
	const [room, setRoom] = useState('devTeam')

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

		user.get('alias').on(v => setUserName(v))

		db.on('auth', async (event) => {
			const alias = await user.get('alias'); // username string
			setUserName(alias);

			console.log(`signed in as ${alias}`);
		});

	}, [user])

	function signout(){
		user && user.leave()
		username && setUserName('')
	}

	return (

		<UserContext.Provider value={{
			db, user, username, signout, room, setRoom
		}}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContextProvider


