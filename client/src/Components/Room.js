import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import Video from './Video'

let run = 0
const Room = () => {
	const params = useParams()

	const [peers, setPeers] = useState([])
	const socketRef = useRef()
	const userVideo = useRef()
	const peersRef = useRef([])
	const roomID = params.room

	const arrayEquals = (a, b) => {
		return (
			Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index])
		)
	}

	useEffect(() => {
		if (run === 0) {
			socketRef.current = io.connect('http://localhost:5000')
			navigator.mediaDevices
				.getUserMedia({
					video: {
						width: 720,
						height: 720,
					},
					audio: true,
				})
				.then(stream => {
					userVideo.current.srcObject = stream
					socketRef.current.emit('join room', roomID)
					socketRef.current.on('all users', users => {
						const peers = []
						users.forEach(userID => {
							const peer = createPeer(userID, socketRef.current.id, stream)
							peersRef.current.push({
								peerID: userID,
								peer,
							})
							peers.push(peer)
						})
						setPeers(peers)
					})

					socketRef.current.on('user joined', payload => {
						const peer = addPeer(payload.signal, payload.callerID, stream)

						console.log(peer)
						peersRef.current.push({
							peerID: payload.callerID,
							peer,
						})

						setPeers(users => [...users, peer])
					})

					socketRef.current.on('receiving returned signal', payload => {
						const item = peersRef.current.find(p => p.peerID === payload.id)
						item.peer.signal(payload.signal)
					})
				})
			run++
		}
	}, [])

	function createPeer(userToSignal, callerID, stream) {
		const peer = new window.SimplePeer({
			initiator: true,
			trickle: false,
			stream,
		})

		peer.on('signal', signal => {
			socketRef.current.emit('sending signal', { userToSignal, callerID, signal })
		})

		return peer
	}

	function addPeer(incomingSignal, callerID, stream) {
		const peer = new window.SimplePeer({
			initiator: false,
			trickle: false,
			stream,
		})

		peer.on('signal', signal => {
			socketRef.current.emit('returning signal', { signal, callerID })
		})

		peer.signal(incomingSignal)

		return peer
	}

	return (
		<div className='row m-0'>
			<div className='col-9 vh-100'>
				<div style={{ height: '90%' }}>
					<video
						className='border border-primary border-1'
						style={{ height: '50%', width: '50%', marginTop: '1%', marginLeft: '2%' }}
						playsInline
						ref={userVideo}
						muted
						autoPlay
					/>
					{peers.map((peer, index) => {
						return <Video key={index} peer={peer} />
					})}
				</div>
				<div
					style={{ height: '10%', width: '96%', marginLeft: '2%' }}
					className='border-top border-3 border-primary pt-2'>
					<button className='btn btn-primary rounded mx-2'>Video</button>
					<button className='btn btn-primary rounded mx-2'>Audio</button>
					<button
						className='btn btn-success rounded mx-2 position-relative'
						style={{ position: 'relative', left: '25%' }}>
						Share
					</button>
					<button className='btn btn-danger rounded mx-2' style={{ float: 'right' }}>
						Leave
					</button>
				</div>
			</div>
			<div className='col-3 vh-100 border-start border-3 p-0'>
				<div className='bg-secondary'>
					<h5 className='text-center text-white py-3'>Room: {params.room}</h5>
				</div>
			</div>
		</div>
	)
}

export default Room
