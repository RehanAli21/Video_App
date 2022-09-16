const express = require('express')
const http = require('http')
const cors = require('cors')
const socketio = require('socket.io')
const { addIdInRoom, getAllIdsInRoom } = require('./RoomData')
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

app.get('/api/createRoom/:room', (req, res) => {
	let r = getAllIdsInRoom(req.params.room)

	res.status(200).json({ msg: r === null ? 'roomAvailable' : 'roomExist' })
})

app.get('/api/joinRoom/:room', (req, res) => {
	let r = getAllIdsInRoom(req.params.room)

	res.status(200).json({ msg: r === null ? 'roomDoesNotExist' : 'roomAvailable' })
})

// run when client connects
io.on('connection', socket => {
	socket.on('createRoom', ({ room, id, name }) => {
		addIdInRoom(room, { id, name })

		socket.join(room)
	})

	socket.on('joinRoom', async ({ room, id, name }) => {
		addIdInRoom(room, { id, name })

		socket.join(room)

		let r = await getAllIdsInRoom(room)

		console.log(socket.emit('user join', r))
	})

	socket.emit('me', socket.id)

	socket.on('disconnect', () => {
		socket.leave(socket.id)
	})
})

////////////////////////////////////////
// Server listening
////////////////////////////////////////
const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log('Yes it is running'))
