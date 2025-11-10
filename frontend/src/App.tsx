import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth.tsx'
import Landing from './pages/Landing.tsx'
import Navbar from './components/Navbar.tsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path="/auth/login" element={<Auth />}></Route>
      </Routes>
    </>
  )
}

export default App
