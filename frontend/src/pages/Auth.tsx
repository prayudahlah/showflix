import { Outlet } from "react-router"

function Auth() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen relative overflow-hidden">
        <div className="absolute inset-[-2rem] bg-gradient-to-br from-primary1-2 via-primary2-3 to-primary3-3 animate-gradient"></div>
        <div className="absolute inset-[-2rem] bg-gradient-to-tr from-primary1-1 via-transparent to-primary2-2 animate-gradient-slow"></div>

        {/* Small Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`star1-${i}`}
              className="absolute w-0.75 h-0.75 bg-white rounded-full animate-twinkle"
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
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        <Outlet />
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { opacity: 1; }
          50% {opacity: 0.9; }
        }

        @keyframes gradient-slow {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        .animate-gradient {
          animation: gradient 8s ease-in-out infinite;
        }

        .animate-gradient-slow {
          animation: gradient-slow 15s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}

export default Auth
