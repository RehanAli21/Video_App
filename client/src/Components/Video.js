import React, { useRef, useEffect } from 'react'

function Video(props) {
	const ref = useRef()

	useEffect(() => {
		props.peer.on('stream', stream => {
			ref.current.srcObject = stream
		})
	}, [])
	return (
		<video
			className='border border-primary border-1'
			style={{ height: '96%', width: '96%', marginTop: '1%', marginLeft: '2%' }}
			playsInline
			ref={ref}
			muted
			autoPlay
		/>
	)
}

export default Video
