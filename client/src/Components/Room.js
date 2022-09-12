import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../UserContext'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'

const Room = () => {
	const { user, room } = useContext(UserContext)
	const params = useParams()

	const [socket, setSocket] = useState(null)
	const [created, setCreated] = useState(false)
	const [joined, setJoined] = useState(false)
	const [mainScreen, setMainScreen] = useState()
	const [otherScreens, setOtherScreens] = useState()

	const socketio = io('http://localhost:5000')

	useEffect(() => {
		if (params.option == 'create' && created === false) {
			socketio.emit('create', { room: room })

			setCreated(true)
		} else if (params.option == 'join' && joined === false) {
			socketio.emit('join', { room: room })
			setJoined(true)
		}

		socketio.on('video', data => {
			console.log('data from video = ' + data)
		})
	}, [setSocket])

	useEffect(() => {
		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true }) // add more option like audio and restrictions
				.then(function (stream) {
					let videoElement = document.getElementById('videoElement')

					videoElement.srcObject = stream
					socketio.emit('my_webcam_video', { room: room, name: user.name, webcam: stream })
				})
				.catch(function (error) {
					console.log('Something went wrong!')
				})
		}
	})

	return (
		<div
			id='container'
			style={{
				margin: '0px auto',
				width: '500px',
				height: '375px',
				border: '10px black solid',
			}}>
			{mainScreen}
			<video
				autoPlay={true}
				id='videoElement'
				style={{
					width: '500px',
					height: '375px',
					backgroundColor: '#666',
				}}></video>
		</div>
	)
}

export default Room
