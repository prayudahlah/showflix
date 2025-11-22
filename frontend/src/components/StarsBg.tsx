import bg from '../assets/backgrounds/starry_night_bg.webp'
import Stars from '../components/Stars.tsx'

function StarsBg() {
  return (
    <>
      <img
        src={bg}
        className="absolute h-full w-auto object-top object-cover animate-gradient-bg"
      />
      <div className="absolute -inset-8 bg-linear-to-br from-primary1-2 via-primary2-3 to-primary3-3 animate-gradient opacity-80" />
      <div className="absolute -inset-8 bg-linear-to-tr from-primary1-1 via-transparent to-primary2-2 animate-gradient-slow opacity-20" />

      <Stars count={50} size={2} />
      <Stars count={30} size={4} />
      <Stars count={30} size={6} />
    </>

  )
}

export default StarsBg;
