import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth.tsx'
import Navbar from './components/Navbar.tsx'
import UrlNotFound from './pages/UrlNotFound.tsx'
import AboutLink from './components/AboutLink.tsx'
import Executive from './components/dashboard/Executive.tsx'
import Marketing from './components/dashboard/Marketing.tsx'
import DashboardLayout from './pages/DashboardLayout.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<AboutLink />} />
        <Route path="/auth/login" element={<Auth />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            path='executive'
            element={
              // <ProtectedRoute allowedRoles={["Executive"]}>
              <Executive />
              // </ProtectedRoute>
            }
          />

          <Route
            path='marketing'
            element={
              <ProtectedRoute allowedRoles={["Marketing"]}>
                <Marketing />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<UrlNotFound />} />
      </Routes>
    </>
  )
}

export default App
