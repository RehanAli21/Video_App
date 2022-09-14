import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Main = () => {
	let navigate = useNavigate()

	const [createName, setCreateName] = useState('')

	const [joinRoom, setJoinRoom] = useState('')
	const [joinName, setJoinName] = useState('')

	const roomChecker = option => {
		if (option === 'create' && createName !== '') {
			navigate('/room')
		} else if (option === 'join' && joinName !== '' && joinRoom !== '') {
			navigate('/room')
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
