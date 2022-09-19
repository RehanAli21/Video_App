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

const users = {}

const socketToRoom = {}

// run when client connects
io.on('connection', socket => {
	socket.on('join room', roomID => {
		if (users[roomID]) {
			const length = users[roomID].length
			if (length === 4) {
				socket.emit('room full')
				return
			}

			if (users[roomID].find(id => id === socket.id)) return
			users[roomID].push(socket.id)
		} else {
			users[roomID] = [socket.id]
		}
		socketToRoom[socket.id] = roomID
		const usersInThisRoom = users[roomID].filter(id => id !== socket.id)

		socket.emit('all users', usersInThisRoom)
	})

	socket.on('sending signal', payload => {
		io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID })
	})

	socket.on('returning signal', payload => {
		io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id })
	})

	socket.on('disconnect', () => {
		const roomID = socketToRoom[socket.id]
		let room = users[roomID]
		if (room) {
			room = room.filter(id => id !== socket.id)
			users[roomID] = room
		}
	})
})

////////////////////////////////////////
// Server listening
////////////////////////////////////////
const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log('Yes it is running'))
