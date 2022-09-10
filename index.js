const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/UserSchema')
const { v4: uuidv4 } = require('uuid')

require('dotenv').config()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
	res.status(200).send('Yes! it is running')
})

// for registering user
app.post('/api/register', async (req, res) => {
	const name = req.body.name
	const email = req.body.email
	const pass = req.body.password
	const code = uuidv4().split('-')[0]

	if (name && email && pass) {
		const user = new User({
			name: name,
			email: email,
			password: pass,
			verificationCode: code,
			verified: false,
		})

		try {
			await user.save()
			res.send(user)
		} catch (error) {
			res.status(500).send(error)
		}
	}
})

const dbUsername = process.env.dbusername
const dbUserpass = process.env.dbuserpass
const cluster = process.env.cluster
const uri = `mongodb+srv://${dbUsername}:${dbUserpass}@${cluster}.aq7mjld.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
	console.log('Connected successfully')
})

app.listen(5000, () => console.log('Yes it is running'))
