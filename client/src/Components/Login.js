import React, { useState, useContext } from 'react'
import UserContext from '../UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	let navigate = useNavigate()

	const { setUser } = useContext(UserContext)

	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')

	const login = async () => {
		if (email && email !== '' && pass && pass !== '') {
			try {
				const res = await axios.get(`http://localhost:5000/api/user/login/${email}/${pass}`)

				if (res.data.msg === 'user found') {
					setUser({
						name: res.data.name,
						email: res.data.email,
					})
					navigate(`/main`)
				}
			} catch (err) {
				alert(err)
			}
		}
	}

	return (
		<div>
			<h1>Login</h1>
			<input onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' />
			<input onChange={e => setPass(e.target.value)} type='password' placeholder='Password' />
			<button onClick={login}>Login</button>
		</div>
	)
}

export default Login
