import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Main = () => {
	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [room, setRoom] = useState('')

	const roomChecker = () => {
		if (name !== '' && room !== '') {
			navigate(`/room/create/${room}/${name}`)
		} else {
			alert('Fill all fields')
		}
	}

	return (
		<div className='text-center w-50 mx-auto'>
			<h1 className='my-5 text-white'>Conference App</h1>
			<div className='container mt-5 row text-center mx-auto'>
				<div className='col-12 row px-5 pt-5'>
					<input
						className='my-2 p-2'
						onChange={e => setName(e.target.value)}
						type='text'
						placeholder='Enter Name'
					/>
					<input
						className='my-2 p-2'
						onChange={e => setRoom(e.target.value)}
						type='text'
						placeholder='Enter Room Name'
					/>
					<button className='btn btn-primary my-2' onClick={roomChecker}>
						Create
					</button>
				</div>
			</div>
		</div>
	)
}

export default Main
