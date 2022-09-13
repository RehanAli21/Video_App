import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Main = () => {
	let navigate = useNavigate()
	const [createRoom, setCreateRoom] = useState('')
	const [joinRoom, setJoinRoom] = useState('')
	const [createName, setCreateName] = useState('')
	const [joinName, setJoinName] = useState('')

	const roomChecker = () => {}

	return (
		<div className='text-center w-100'>
			<h1 className='my-5 text-white'>Conference App</h1>
			<div className='container mt-5 row text-center mx-auto'>
				<div className='col-md-6 col-sm-12 row p-5'>
					<input
						className='my-2'
						onChange={e => setCreateName(e.target.value)}
						type='text'
						placeholder='Enter Name'
					/>
					<input
						className='my-2'
						onChange={e => setCreateRoom(e.target.value)}
						type='text'
						placeholder='Enter Room Name'
					/>
					<button className='btn btn-primary my-2' onClick={() => roomChecker('create')}>
						Create
					</button>
				</div>
				<div className='col-md-6 col-sm-12 row p-5'>
					<input
						className='my-2'
						onChange={e => setJoinName(e.target.value)}
						type='text'
						placeholder='Enter Name'
					/>
					<input
						className='my-2'
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
