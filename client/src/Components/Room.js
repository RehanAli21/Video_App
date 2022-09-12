import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../UserContext'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'

const Room = () => {
	const { room } = useContext(UserContext)
	const params = useParams()

	const [socket, setSocket] = useState(null)
	const [created, setCreated] = useState(false)
	const [joined, setJoined] = useState(false)

	useEffect(() => {
		const socketio = io('http://localhost:5000')

		if (params.option == 'create' && created === false) {
			socketio.emit('create', { room: room })

			setCreated(true)
		} else if (params.option == 'join' && joined === false) {
			socketio.emit('join', { room: room })
			setJoined(true)
		}
	}, [setSocket])
}

export default Room
