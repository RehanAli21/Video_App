const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./router')
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use(router)

app.get('/', (req, res) => {
	res.status(200).send('Yes! it is running')
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
