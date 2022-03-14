import React, { useEffect } from 'react'
import { useUserContext } from '../hooks/user'
import '../styles/pick_team_styles.css'
import { useNavigate } from 'react-router-dom'

const PickTeam: () => JSX.Element = (): JSX.Element => {
	const { user, db, team } = useUserContext()
	const [name, setName] = React.useState('')
	const [teams, setTeams] = React.useState([])
	const navigate = useNavigate()

	useEffect((): void => {
		user?.get('alias').once((_: any): void => setName(_))
		user?.get('teams').map().once(
			(_: any): void => setTeams(
				(prev: any[]): any[] => [...new Set([...prev, _])]
			))
	}, [user])

	useEffect(() => {
		if (!team) return;
		navigate('../main')
	}, [team])

	return (
		<div style={{ flex: 1, overflowY: 'scroll' }}>
			<img src='HIVE_inline.png' width={200} style={{ margin: 50 }} />
			<h2 className='pick-welcome'>Welcome to the hive, {name}</h2>
			<p className='pick-welcome-sub'>Choose a team below to join its swarm</p>
			<div className='pick-container'>
				<p className='pick-title'>Swarms for {name}</p>
				<div className='pick-teams_list'>
					{teams.map((team: any): JSX.Element => <Team team={team} />)}
					{!teams.length && <h4>There are no swarms created yet - Try creating one!</h4>}
				</div>
			</div>

			<div className='pick-container pick-bottom'>
				<h4>Want to use Hive with a different Swarm?</h4>
				<button onClick={() => navigate('../createteam')}>Create new Swarm</button>
			</div>
		</div>
	)
}

const Team = ({ team }) => {
	const { db, setTeam } = useUserContext()
	const [users, setUsers] = React.useState(0)

	useEffect(() => {
		db.get(team.name).get('users').map().once(_ => setUsers(users + 1))
	}, [])

	const handlePress = () => {
		let check = db.get(team.name)
		if (check._?.ack){
			alert("There was an error getting the team info")
			return
		}
		setTeam(db.get(team.name))
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
			<button className='right' onClick={handlePress}>Swarm</button>
		</div>
	)
}

export default PickTeam