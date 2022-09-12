import { createContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
	const [user, setUser] = useState()
	const [room, setRoom] = useState()

	return <UserContext.Provider value={{ user, setUser, room, setRoom }}>{children}</UserContext.Provider>
}

export default UserContext
