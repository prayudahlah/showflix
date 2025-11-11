import UniversalLogo from '../assets/icons/universal_logo_navbar.svg'
import AboutLink from '../components/AboutLink.tsx'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-8 pt-2 pb-[3rem] flex justify-between items-center
                    bg-linear-to-b from-primary1-3/80 via-primary1-3/30 to-transparent">
      <img
        src={UniversalLogo}
        className='w-[140.63px] h-[25.09px] hover:shadow-none hover-scale'
        alt='Universal Television'
        onClick={() => navigate("/")}
      />

      <AboutLink />

      <button
        className='hover-scale w-[140.63px] rounded-4xl shadow-[inset_0_0_4px_rgba(0,0,0,0.4)]
                   bg-linear-to-r from-primary3-2 to-primary3-1 text-white'
        onClick={() => navigate("/auth/login")}
      >
        LOG IN
      </button>
    </nav>
  )
}

export default Navbar;
