import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
	const [myId, setMyId] = useState('')

	const socket = io('http://localhost:5000')

	useEffect(() => {
		socket.on('me', id => setMyId(id))
	}, [])

	return <SocketContext.Provider value={{ myId }}>{children}</SocketContext.Provider>
}

export default SocketContext
