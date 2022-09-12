import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserContext'

const Main = () => {
	let navigate = useNavigate()
	const [createRoom, setCreateRoom] = useState('')
	const [joinRoom, setJoinRoom] = useState('')

	const { user, setRoom } = useContext(UserContext)

	const roomChecker = async e => {
		if (e == 'create' && createRoom && createRoom !== '') {
			try {
				let res = await axios.get(`http://localhost:5000/api/rooms/${createRoom}`)

				if (res.data.msg === 'noRoom') {
					setRoom(createRoom)
					navigate('/room/create')
				} else if (res.data.msg === 'Room') {
					console.log('Room already exist')
				}
			} catch (e) {
				console.log(e)
			}
		} else if (e == 'join' && joinRoom && joinRoom !== '') {
			try {
				let res = await axios.get(`http://localhost:5000/api/rooms/${joinRoom}`)

				if (res.data.msg === 'noRoom') {
					console.log('This Room does not exist')
				} else if (res.data.msg === 'Room') {
					setRoom(joinRoom)
					navigate('/room/join')
				}
			} catch (e) {
				console.log(e)
			}
		}
	}

	return (
		<div>
			<div>
				<input onChange={e => setCreateRoom(e.target.value)} type='text' placeholder='Enter Room Name' />
				<button onClick={() => roomChecker('create')}>Create</button>
			</div>
			<div>
				<input onChange={e => setJoinRoom(e.target.value)} type='text' placeholder='Enter Room Name' />
				<button onClick={() => roomChecker('join')}>Join</button>
			</div>
		</div>
	)
}

export default Main
