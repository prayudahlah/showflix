import bgAuth from '../assets/backgrounds/bg_auth.webp'
import Login from '../components/auth/Login.tsx'
import Stars from '../components/Stars.tsx'

function Auth() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-[#010109]">
        <img
          src={bgAuth}
          className="absolute inset[-2rem] h-full w-auto object-top object-cover animate-gradient-bg"
        />
        <div className="absolute inset-[-2rem] bg-gradient-to-br from-primary1-2 via-primary2-3 to-primary3-3 animate-gradient"></div>
        <div className="absolute inset-[-2rem] bg-gradient-to-tr from-primary1-1 via-transparent to-primary2-2 animate-gradient-slow opacity-20"></div>

        <Stars count={50} size={2} />
        <Stars count={30} size={4} />

        <Login />
      </div>
    </>
  )
}

export default Auth
