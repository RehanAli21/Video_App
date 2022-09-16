import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './Components/Main'
import Room from './Components/Room'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/room/:option/:room/:name' element={<Room />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
