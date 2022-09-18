import React, { useState, useContext, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SocketContext from '../SocketContext'

const Room = () => {
	const params = useParams()
	const { myId } = useContext(SocketContext)

	return (
		<div className='row m-0'>
			<div className='col-9 vh-100'>
				<div style={{ height: '90%' }}>
					<video
						className='border border-primary border-1'
						style={{ height: '96%', width: '96%', marginTop: '1%', marginLeft: '2%' }}
						playsInline
						muted
						autoPlay
					/>
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
