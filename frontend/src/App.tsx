import { Route, Routes } from 'react-router'
import Auth from './pages/Auth.tsx'
import Login from './components/auth/Login.tsx'
import Register from './components/auth/Register.tsx'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Auth />}>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
