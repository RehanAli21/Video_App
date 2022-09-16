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

module.exports = { addIdInRoom, getAllIdsInRoom }
