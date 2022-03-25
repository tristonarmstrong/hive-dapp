import React from 'react'
import { useUserContext } from '../hooks/user'
import GUN from 'gun'
import SEA from 'gun/sea'
import generate_image_url from '../utils/generate_image_url'
import MessageInput from './MessageInput'
import getGunOnce from '../utils/getGunOnce'

function MainBody(): JSX.Element {
	const { channel, db, username, team, chan_subs, setChan_subs } = useUserContext();
	const [newMessage, setNewMessage] = React.useState()
	const [messages, setMessages] = React.useState([])
	const messagesEnd = React.useRef(null)



	React.useEffect(() => {
		setMessages([])
		getMessages();
	}, [channel]);

	React.useEffect(() => {
		messagesEnd.current && messagesEnd.current?.scrollIntoView();
	}, [messages])



	async function getMessages(): Promise<void> {
		let { data } = await getGunOnce(team.get('name'))

		if (!data){
			return alert("There was an error, reload the page and try again")
		}

		let soul = data
		let messages = db.get(soul).get('channels').get(channel).get('messages')

		if (chan_subs.includes(channel)) {
			messages.once().map().once(parseMessage)
			return
		}

		// Get Messages
		messages.map().once(parseMessage)
		setChan_subs([...chan_subs, channel])
	}

	async function parseMessage(data: { what: any; }, id: any, _msg: any, _ev: any): Promise<void> {
		if (!data)
			return;

		// Key for end-to-end encryption
		const key: string = `${channel}-${team}`; // to be update to something more realistic and dynamic

		var message: { who: any, what: string, when: string } = {
			// transform the data
			who: await db.user(data).get('alias'),
			what: (await SEA.decrypt(data.what, key)) + '',
			when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
		};

		if (!message.what || message.what == 'undefined')
			return;

		setMessages((prevMessages: any[]): any[] => [...new Set([...prevMessages.slice(-100), message])].sort((a: any, b: any): number => a.when - b.when));
	}

	return (
		<div className='main-body'>
			<div className='main-body-left'>
				<div className='main-body-chat'>
					{messages?.map((message, i) => {
						return (
							<div key={`msg-${i}`} className={`message-card ${message.who == username ? 'me' : ''}`}>
								{message.who != messages[i-1]?.who ? <img src={generate_image_url(message.who)} /> : <div className='no-image-placeholder'/>}
								<div>
									{message.who != messages[i-1]?.who && <h4>{message.who}</h4>}
									<p>{message.what}</p>
								</div>
							</div>
						);
					})}
					<div ref={messagesEnd}> </div>
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