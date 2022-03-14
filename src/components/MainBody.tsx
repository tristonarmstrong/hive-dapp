import React from 'react'
import { useUserContext } from '../hooks/user'
import GUN from 'gun'
import SEA from 'gun/sea'
import generate_image_url from '../utils/generate_image_url'
import MessageInput from './MessageInput'

function MainBody(): JSX.Element {
	const { channel, db, username, team } = useUserContext();
	const [newMessage, setNewMessage] = React.useState()
	const [messages, setMessages] = React.useState([])



	React.useEffect(() => {
		setMessages([])
		getMessages();
	}, [channel]);


	function getMessages(): void {
		var match = {
			'.': {
				'>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
			},
			'-': 1, // filter in reverse
		};


		// Get Messages
		db.get(team._.soul)
			.get('channels')
			.get(channel)
			.get('messages')
			.map()
			.once(parseMessage);
	}

	async function parseMessage(data: { what: any; }, id: any, _msg: any, _ev: any): Promise<void> {
		if (!data)
			return;

		// Key for end-to-end encryption
		const key: "#foo" = '#foo'; // to be update to something more realistic and dynamic

		var message: { who: any, what: string, when: string } = {
			// transform the data
			who: await db.user(data).get('alias'),
			what: (await SEA.decrypt(data.what, key)) + '',
			when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
		};

		if (!message.what)
			return;

		setMessages((prevMessages: any[]): any[] => [...new Set([...prevMessages.slice(-100), message])].sort((a: any, b: any): number => a.when - b.when));
	}

	return (
		<div className='main-body'>
			<div className='main-body-left'>
				<div className='main-body-chat'>
					{messages?.map(message => {
						return (
							<div className={`message-card ${message.who == username ? 'me' : ''}`}>
								<img src={generate_image_url(message.who)} />
								<div>
									<h4>{message.who}</h4>
									<p>{message.what}</p>
								</div>
							</div>
						);
					})}
				</div>

				<MessageInput />

			</div>
			<div className='main-body-right'>
				<div className='main-body-user-info'>
					<p>Coming soon</p>
				</div>

				<div className='main-body-interaction-timeline'>

				</div>

				<div className='main-body-contact-info'>

				</div>
			</div>
		</div>
	);
}


export default MainBody