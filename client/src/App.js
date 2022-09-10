import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './UserContext'
import Login from './Components/Login'
import Register from './Components/Register'
import Main from './Components/Main'

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/main' element={<Main />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	)
}

export default App
