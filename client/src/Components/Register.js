import React from 'react'

const Register = () => {
	return (
		<React.Fragment>
			<div>
				<h1>Register</h1>
				<input type='text' placeholder='Name' />
				<input type='email' placeholder='Email' />
				<input type='password' placeholder='Password' />
				<input type='password' placeholder='Confirm Password' />
				<button>Register</button>
			</div>
			<div>
				<input type='text' placeholder='Enter Code' />
				<button>Submit</button>
			</div>
		</React.Fragment>
	)
}

export default Register
