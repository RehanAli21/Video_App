import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './Components/Main'

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Main />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	)
}

export default App
