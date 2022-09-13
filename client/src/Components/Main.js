import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserContext'

const Main = () => {
	let navigate = useNavigate()
	const [createRoom, setCreateRoom] = useState('')
	const [joinRoom, setJoinRoom] = useState('')
	const [createName, setCreateName] = useState('')
	const [joinName, setJoinName] = useState('')

	const { setUser, setRoom } = useContext(UserContext)

	const roomChecker = () => {}

	return (
		<div>
			<div>
				<input onChange={e => setCreateName(e.target.value)} type='text' placeholder='Enter Name' />
				<input onChange={e => setCreateRoom(e.target.value)} type='text' placeholder='Enter Room Name' />
				<button onClick={() => roomChecker('create')}>Create</button>
			</div>
			<div>
				<input onChange={e => setJoinName(e.target.value)} type='text' placeholder='Enter Name' />
				<input onChange={e => setJoinRoom(e.target.value)} type='text' placeholder='Enter Room Name' />
				<button onClick={() => roomChecker('join')}>Join</button>
			</div>
		</div>
	)
}

export default Main
