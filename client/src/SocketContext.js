import React, { createContext, useState } from 'react'

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
	const [myId, setMyId] = useState('')
	return <SocketContext.Provider value={{ myId }}>{children}</SocketContext.Provider>
}

export default SocketContext
