const express = require('express')
const http = require('http')
const cors = require('cors')
const socketio = require('socket.io')
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

////////////////////////////////////////
// Route for checking if server is running or not
////////////////////////////////////////
app.get('/', (req, res) => {
	res.status(200).send('Yes! it is running')
})

app.get('/api/rooms/:room', (req, res) => {
	const reqRoom = req.params.room

	res.status(200).json({ msg: IsRoomPresent(reqRoom) ? 'Room' : 'noRoom' })
})

// run when client connects
io.on('connection', socket => {})

////////////////////////////////////////
// Server listening
////////////////////////////////////////
const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log('Yes it is running'))
