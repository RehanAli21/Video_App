import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

let socket

export const SocketProvider = ({ children }) => {
	const [myId, setMyId] = useState('')
	const [ids, setIds] = useState([])
	const [names, setNames] = useState([])

	useEffect(() => {
		socket = io('http://localhost:5000')
		socket.on('me', id => setMyId(id))

		socket.on('create', data => console.log('room created=' + data))

		socket.on('user join', data => {
			let tempid = []
			let tempname = []

			data.forEach(e => {
				tempid.push(e['id'])
				tempname.push(e['name'])
			})

			setIds(tempid)
			setNames(tempname)
		})
	}, [])

	const createRoomFunc = (room, id, name) => socket.emit('createRoom', { room, id, name })

	const joinRoomFunc = (room, id, name) => socket.emit('joinRoom', { room, id, name })

	return <SocketContext.Provider value={{ myId, createRoomFunc, joinRoomFunc }}>{children}</SocketContext.Provider>
}

export default SocketContext
