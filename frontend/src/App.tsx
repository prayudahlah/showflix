import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth.tsx'
import Navbar from './components/Navbar.tsx'
import UrlNotFound from './pages/UrlNotFound.tsx'
import AboutLink from './components/AboutLink.tsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<AboutLink />}></Route>
        <Route path="/auth/login" element={<Auth />}></Route>
        <Route path="*" element={<UrlNotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
