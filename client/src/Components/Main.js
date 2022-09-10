import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserContext'

const Main = () => {
	let navigate = useNavigate()

	const { user } = useContext(UserContext)

	return (
		<div>
			<button onClick={() => navigate('/')}>Logout</button>

			<button>Create</button>
			<button>Join</button>
		</div>
	)
}

export default Main
