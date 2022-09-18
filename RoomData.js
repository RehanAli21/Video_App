let rooms = {}

const addIdInRoom = (room, obj) => {
	if (rooms.hasOwnProperty(room)) {
		rooms[room].push(obj)
	} else {
		rooms[room] = [obj]
	}
}

const getAllIdsInRoom = room => {
	if (rooms.hasOwnProperty(room)) {
		return rooms[room]
	} else {
		return null
	}
}

const getRoomById = id => {
	let r = null
	for (const room in rooms) {
		for (let i = 0; i < rooms[room].length; i++) {
			if (rooms[room][i].id === id) r = room
		}
	}

	return r
}

module.exports = { addIdInRoom, getAllIdsInRoom, getRoomById }
