import { Route, Routes } from 'react-router'
import Auth from './pages/Auth.tsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<Auth />}></Route>
      </Routes>
    </>
  )
}

export default App
