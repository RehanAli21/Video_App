import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SocketContext from '../SocketContext'

const Main = () => {
	const navigate = useNavigate()
	const ENDPOINT = 'http://localhost:5000'

	const { myId } = useContext(SocketContext)

	const [createName, setCreateName] = useState('')
	const [createRoom, setCreateRoom] = useState('')
	const [joinRoom, setJoinRoom] = useState('')
	const [joinName, setJoinName] = useState('')

	const roomChecker = option => {
		if (option === 'create' && createName !== '' && createRoom !== '') {
			axios
				.get(`${ENDPOINT}/api/createRoom/${createRoom}`)
				.then(res => {
					if (res.data.msg === 'roomAvailable') {
						navigate(`/room/create/${createRoom}/${createName}`)
					} else if (res.data.msg === 'roomExist') {
						alert('Room Already Exists')
					}
				})
				.catch(e => console.log(e))
		} else if (option === 'join' && joinName !== '' && joinRoom !== '') {
			axios
				.get(`${ENDPOINT}/api/joinRoom/${joinRoom}`)
				.then(res => {
					if (res.data.msg === 'roomAvailable') {
						navigate(`/room/join/${joinRoom}/${joinName}`)
					} else if (res.data.msg === 'roomDoesNotExist') {
						alert('Room Does Not Exists')
					}
				})
				.catch(e => console.log(e))
		}
	}

	return (
		<div className='text-center w-50 mx-auto'>
			<h1 className='my-5 text-white'>Conference App</h1>
			<div className='container mt-5 row text-center mx-auto'>
				<div className='col-12 row px-5 pt-2 pb-4 border-bottom border-3'>
					<h2 className='text-white'>Create Room</h2>
					<input
						className='my-2 p-2'
						onChange={e => setCreateName(e.target.value)}
						type='text'
						placeholder='Enter Name'
					/>
					<input
						className='my-2 p-2'
						onChange={e => setCreateRoom(e.target.value)}
						type='text'
						placeholder='Enter Room Name'
					/>
					<button className='btn btn-primary my-2' onClick={() => roomChecker('create')}>
						Create
					</button>
				</div>
				<div className='col-12 row px-5 pt-4'>
					<h2 className='text-white'>Join Room</h2>
					<input
						className='my-2 p-2'
						onChange={e => setJoinName(e.target.value)}
						type='text'
						placeholder='Enter Name'
					/>
					<input
						className='my-2 p-2'
						onChange={e => setJoinRoom(e.target.value)}
						type='text'
						placeholder='Enter Room Name'
					/>
					<button className='btn btn-primary my-2' onClick={() => roomChecker('join')}>
						Join
					</button>
				</div>
			</div>
		</div>
	)
}

export default Main
