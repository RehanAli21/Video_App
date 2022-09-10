import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './UserContext'
import Login from './Components/Login'
import Register from './Components/Register'
import Main from './Components/Main'
import Room from './Components/Room'

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/main' element={<Main />} />
					<Route path='/room' element={<Room />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	)
}

export default App
