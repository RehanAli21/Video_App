import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const Room = () => {
	const [socket, setSocket] = useState(null)
	useEffect(() => {
		const socketio = io('http://localhost:5000')

		socketio.on('message', message => console.log(message))
	}, [setSocket])
}

export default Room
