import React, { useEffect } from 'react'
import { useUserContext } from '../hooks/user'
import '../styles/create_team.css'
import { useNavigate } from 'react-router-dom'
import getGunOnce from '../utils/getGunOnce'

const CreateTeam: () => JSX.Element = (): JSX.Element => {
	const { user, db, setTeam } = useUserContext()
	const [name, setName] = React.useState('')
	const navigate = useNavigate()

	const handlePress = async () => {
		if (!name) return;

		let {node, data} = await getGunOnce(db.get(name).get('owner'))
		let check = db.get(name).get('owner')
		if (data){
			return alert("That swarm name is already taken!")
		}
		
		let team = db.get(name)
		team.put({name, owner: user})

		team.get('users').set(user)
		user.get('teams').set(team)
		setTeam(team)
		navigate('../main')
	}

	return (
		<div style={{ flex: 1, marginTop: 20 }}>
			<img src='HIVE_inline.png' width={200} style={{ margin: 50 }} />
			<h2 className='create-welcome'>Create a new Swarm</h2>
			<div className='create-container'>
				<p>Name your swarm</p>
				<input value={name} onChange={((e) => setName(e.target.value))} />
			
				<button onClick={handlePress}>Submit</button>
			</div>
		</div>
	)
}

export default CreateTeam