import React, { useEffect } from 'react'
import { useUserContext } from '../hooks/user'
import '../styles/pick_team_styles.css'
import { useNavigate } from 'react-router-dom'
import TeamCard from '../components/TeamCard'

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
					{teams.map((team: any, i: number): JSX.Element => <TeamCard key={`teamcard-${i}`} team={team} />)}
					{!teams.length && <h4>There are no swarms created yet - Try creating one!</h4>}
				</div>
			</div>

			<div className='pick-container pick-bottom'>
				<div>
					<h4>Want to use Hive with a different Swarm?</h4>
					<div>
						<button onClick={() => navigate('../createteam')}>Create new Swarm</button>
						<button onClick={() => navigate('../join')}>Join a Swarm</button>
					</div>
				</div>
			</div>
		</div>
	)
}



export default PickTeam