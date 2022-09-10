const router = require('express').Router()
const User = require('../models/UserSchema')

// for registering user
router.post('/register', async (req, res) => {
	const name = req.body.name
	const email = req.body.email
	const pass = req.body.password

	if (name && email && pass) {
		const user = new User({
			name: name,
			email: email,
			password: pass,
		})

		try {
			await user.save()
			res.send(user)
		} catch (error) {
			res.status(500).send(error)
		}
	}
})

router.get('/login/:email/:password', async (req, res) => {
	const email = req.params.email
	const password = req.params.password

	try {
		const user = await User.findOne({
			email: email,
			password: password,
		}).exec()

		if (user == null) return res.json({ msg: 'user not found' })

		res.json({ msg: 'user found' })

		// res.send(user)
	} catch (err) {
		res.status(500).send(err)
	}
})

module.exports = router
