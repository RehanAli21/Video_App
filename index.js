const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const router = require('./router')
require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
})

// middlewares
app.use(express.json())
app.use(cors())
app.use(router)

////////////////////////////////////////
// Route for checking if server is running or not
////////////////////////////////////////
app.get('/', (req, res) => {
	res.status(200).send('Yes! it is running')
})

////////////////////////////////////////
// Database connectivity
////////////////////////////////////////
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

// run when client connects
io.on('connection', socket => {
	console.log('socket.io connection')

	socket.emit('message', 'Welcome to app')
})

////////////////////////////////////////
// Server listening
////////////////////////////////////////
const PORT = 5000 || process.env.PORT

server.listen(PORT, () => console.log('Yes it is running'))
