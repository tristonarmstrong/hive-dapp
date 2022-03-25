import React, { useEffect } from 'react'
import { useUserContext } from '../hooks/user'
import '../styles/create_team.css'
import { useNavigate } from 'react-router-dom'
import getGunOnce from '../utils/getGunOnce'

const JoinTeam: () => JSX.Element = (): JSX.Element => {
	const { user, db, setTeam } = useUserContext()
	const [name, setName] = React.useState('')
	const navigate = useNavigate()

	const handlePress = async () => {
		if (!name) {
			return alert("Please input a name")
		};

		let {node, data} = await getGunOnce(db.get(name))
		if (!data){
			return alert("There is no swarm with this name!")
		}
		
		node.get('users').set(user)
		user.get('teams').set(node)
		setTeam(node)
		navigate('../main')
	}

	return (
		<div style={{ flex: 1, marginTop: 20 }}>
			<img src='HIVE_inline.png' width={200} style={{ margin: 50 }} />
			<h2 className='create-welcome'>Join a new swarm</h2>
			<div className='create-container'>
				<p>Whats the name of the swarm you want to join?</p>
				<input value={name} onChange={((e) => setName(e.target.value))} />
			
				<button onClick={handlePress}>Submit</button>
			</div>
		</div>
	)
}

export default JoinTeam