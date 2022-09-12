const express = require('express')
const http = require('http')
const cors = require('cors')
const socketio = require('socket.io')
const { GetRooms, AddRooms, DeleteRooms, IsRoomPresent } = require('./RoomHelper')
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
io.on('connection', socket => {
	console.log('socket.io connection')

	socket.on('create', ({ room }) => {
		AddRooms(room)
		socket.join(room)
	})

	socket.on('join', ({ room }) => {
		socket.join(room)
	})

	socket.on('disconnect', () => {
		io.emit('message', 'A user left chat')
	})
})

////////////////////////////////////////
// Server listening
////////////////////////////////////////
const PORT = 5000 || process.env.PORT

server.listen(PORT, () => console.log('Yes it is running'))
