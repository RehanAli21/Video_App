import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')

	const login = async () => {
		if (email && email !== '' && pass && pass !== '') {
			try {
				const res = await axios.get(`http://localhost:5000/api/user/login/${email}/${pass}`)
				console.log(res.data.msg)
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
