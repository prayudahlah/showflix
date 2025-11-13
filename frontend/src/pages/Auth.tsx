import Login from '../components/auth/Login.tsx'
import StarsBg from '../components/StarsBg.tsx'

function Auth() {
  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-[#010109]">
      <StarsBg />
      <Login />
    </div>
  )
}

export default Auth
