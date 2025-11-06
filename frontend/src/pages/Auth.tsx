import bgAuth from '../assets/backgrounds/bg_auth.webp'
import Login from '../components/auth/Login.tsx'

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

        {/* Small Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`star1-${i}`}
              className="absolute w-[2px] h-[2px] bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        {/* Medium Stars */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={`star1-${i}`}
              className="absolute w-[4px] h-[4px] bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        {/* Large Stars */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={`star1-${i}`}
              className="absolute w-[6px] h-[6px] bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        <Login />
      </div>
    </>
  )
}

export default Auth
