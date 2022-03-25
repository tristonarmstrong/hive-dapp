import React from "react"
import { useUserContext } from '../hooks/user'
import getGunOnce from '../utils/getGunOnce'

const TeamCard = ({ team }) => {
	const { db, setTeam, user } = useUserContext()
	const [users, setUsers] = React.useState(0)

	React.useEffect(() => {
		db.get(team.name).get('users').map().once(_ => setUsers(users + 1))

		return () => db.get(team.name).get('users').map().off()
	}, [])

	const handlePress = async () => {
		let {node, data} = await getGunOnce(db.get(team.name))
		if (!data){
			alert("There was an error getting the team info")
			return
		}
		setTeam(node)
	}

	return (
		<div className='team_item'>
			<div className='left'>
				<img src='/favicon.png' width={50} height={50} />
				<div>
					<h3>{team.name}</h3>
					<p>{users} Users</p>
				</div>
			</div>
			<div>
				<button className='right' onClick={handlePress}>Swarm</button>
			</div>
		</div>
	)
}

export default TeamCard
