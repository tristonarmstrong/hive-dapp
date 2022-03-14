import React, { ChangeEvent, FormEvent } from 'react'
import { COLOR } from '../constants/index'
import SEA from 'gun/sea';
import { useUserContext } from '../hooks/user'
import { AiOutlineSend } from 'react-icons/ai'


function MessageInput(): JSX.Element {
	const { user, db, channel, team } = useUserContext()
	const [newMessage, setNewMessage] = React.useState<string>('')

	const sendMessage: () => Promise<void> = async (): Promise<void> => {
		const secret: any = await SEA.encrypt(newMessage, '#foo');
		const message: any = user.get('all').set({ what: secret });
		const index: string = new Date().toISOString();
		db.get(team._.soul).get('channels').get(channel).get('messages').set(message)
		setNewMessage('');
	}

	const handleSubmit: (e: any) => void = (e:any): void => {
		e.preventDefault()
		sendMessage()
	}

	return (
		<form className='main-body-input' onSubmit={(e:FormEvent<HTMLFormElement>): void => handleSubmit(e)}>
			<input placeholder='Type message ...' onChange={(e: ChangeEvent<HTMLInputElement>): void => setNewMessage(e.target.value)} value={newMessage} />
			<button><AiOutlineSend color={COLOR.primary} size={15} /></button>
		</form>
	)
}

export default MessageInput