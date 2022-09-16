import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import SocketContext from '../SocketContext'

const Room = () => {
	const params = useParams()
	const { myId, ids, names } = useContext(SocketContext)

	console.log(ids, names)

	const [video, setVideo] = useState(false)
	const [audio, setAudio] = useState(false)
	const [share, setShare] = useState(false)

	const VideoFunc = () => setVideo(!video)

	const AudioFunc = () => setAudio(!audio)

	const ShareFunc = () => setShare(!share)

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
						style={{ height: '96%', width: '96%', marginTop: '1%', marginLeft: '2%' }}
						className='border border-primary border-1'></video>
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
						onClick={ShareFunc}>
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
