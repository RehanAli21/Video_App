let rooms = []

const IsRoomPresent = e => {
	for (let i = 0; i < rooms.length; i++) {
		if (rooms[i] == e) return true
	}

	return false
}

const AddRooms = e => {
	rooms.push(e)
}

const DeleteRooms = e => {
	const index = rooms.indexOf(e)
	console.log(index)
}

const GetRooms = () => {
	return rooms
}

module.exports = { GetRooms, AddRooms, DeleteRooms, IsRoomPresent }
