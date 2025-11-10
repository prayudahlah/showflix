import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth.tsx'
import Navbar from './components/Navbar.tsx'

function App() {
  return (
    <>
      <Navbar withAbout={true} />
      <Routes>
        <Route path="/auth/login" element={<Auth />}></Route>
      </Routes>
    </>
  )
}

export default App
