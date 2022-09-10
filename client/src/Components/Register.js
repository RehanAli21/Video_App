import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [pass, setPass] = useState()
	const [confirmPass, setConfirmPass] = useState()

	const register = async () => {
		if (name && email && pass && confirmPass) {
			if (pass === confirmPass) {
				try {
					const res = await axios.post('http://localhost:5000/api/register', {
						name: name,
						email: email,
						password: pass,
					})

					console.log(res)
				} catch (e) {
					alert(e)
				}
			} else {
				alert('Password and Confirm password are not same')
			}
		} else {
			alert('Fill all fields')
		}
	}

	return (
		<React.Fragment>
			<div>
				<h1>Register</h1>
				<input onChange={e => setName(e.target.value)} type='text' placeholder='Name' />
				<input onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' />
				<input onChange={e => setPass(e.target.value)} type='password' placeholder='Password' />
				<input onChange={e => setConfirmPass(e.target.value)} type='password' placeholder='Confirm Password' />
				<button onClick={register}>Register</button>
			</div>
			<div>
				<input type='text' placeholder='Enter Code' />
				<button>Submit</button>
			</div>
		</React.Fragment>
	)
}

export default Register
