import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'

const Auth = lazy(() => import('./pages/Auth.tsx'))
const Landing = lazy(() => import('./pages/Landing.tsx'))
const UrlNotFound = lazy(() => import('./pages/UrlNotFound.tsx'))
const AboutLink = lazy(() => import('./components/AboutLink.tsx'))
const Executive = lazy(() => import('./components/dashboard/Executive.tsx'))
const Marketing = lazy(() => import('./components/dashboard/Marketing.tsx'))
const DashboardLayout = lazy(() => import('./pages/DashboardLayout.tsx'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute.tsx'))

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-screen bg-primary1-2">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary3-3"></div>
  </div>
)

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path="/about" element={<AboutLink />} />
          <Route path="/auth/login" element={<Auth />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route
              path='executive'
              element={
                <ProtectedRoute allowedRoles={["Executive"]}>
                  <Executive />
                </ProtectedRoute>
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
      </Suspense>
    </>
  )
}

export default App
