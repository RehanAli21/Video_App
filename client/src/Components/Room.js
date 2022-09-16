import React, { useState, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import SocketContext from '../SocketContext'

const Room = () => {
	const params = useParams()
	const { ids, names } = useContext(SocketContext)

	const [video, setVideo] = useState(false)
	const [audio, setAudio] = useState(false)
	const [share, setShare] = useState(false)

	const [stream, setStream] = useState()

	const myVideo = useRef()

	const VideoFunc = () => {
		if (video) setShare(false)
		setVideo(!video)
	}

	const AudioFunc = () => setAudio(!audio)

	const ShareFunc = () => {
		if (!share && navigator.mediaDevices.getDisplayMedia) {
			navigator.mediaDevices
				.getDisplayMedia({ video: true, audio: audio })
				.then(stream => {
					setStream(stream)
					myVideo.current.srcObject = stream
				})
				.catch(error => console.log('Something went wrong!'))

			setShare(true)
		}
	}

	const StopShareFunc = () => {
		if (myVideo.current.srcObject) {
			let tracks = stream.getTracks()

			for (const track in tracks) {
				tracks[track].stop()
			}

			myVideo.src = ''
			myVideo.srcObject = null
		}
		setShare(false)
	}

	const showMembers = () => {
		let members = []
		for (let i = 0; i < ids.length; i++) {
			members.push(
				<div className='w-100 text-white text-center m-0 p-3 border-2 border-bottom border-danger' key={i}>
					<span className='mx-1'>{names[i]}</span>
					<span className='mx-1'>video</span>
					<span className='mx-1'>audio</span>
				</div>
			)
		}
		return members
	}

	return (
		<div className='row m-0'>
			<div className='col-9 vh-100'>
				<div style={{ height: '90%' }}>
					<video
						className='border border-primary border-1'
						style={{ height: '96%', width: '96%', marginTop: '1%', marginLeft: '2%' }}
						playsInline
						muted
						ref={myVideo}
						autoPlay
					/>
				</div>
				<div
					style={{ height: '10%', width: '96%', marginLeft: '2%' }}
					className='border-top border-3 border-primary pt-2'>
					<button className='btn btn-primary rounded mx-2' onClick={VideoFunc}>
						{video ? 'Stop' : 'Start'} Video
					</button>
					<button className='btn btn-primary rounded mx-2' onClick={AudioFunc}>
						{audio ? 'Stop' : 'Start'} Audio
					</button>
					<button
						className='btn btn-success rounded mx-2 position-relative'
						style={{ position: 'relative', left: '25%' }}
						disabled={video}
						onClick={share ? StopShareFunc : ShareFunc}>
						{share ? 'Stop' : 'Start'} Share
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
				<div>{showMembers()}</div>
			</div>
		</div>
	)
}

export default Room
