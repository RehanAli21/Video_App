import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './UserContext'
import Main from './Components/Main'
import Room from './Components/Room'

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/room/:option' element={<Room />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	)
}

export default App
