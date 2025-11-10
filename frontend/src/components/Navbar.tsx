import UniversalLogo from '../assets/icons/universal_logo.svg'

function Navbar() {
  return (
    <nav className="bg-gray-600/50 h-10 flex justify-between items-center
                    p-10">
      <img
        src={UniversalLogo}
        className='w-[140.63px] h-[25.09px]'
      />
    </nav>
  )
}

export default Navbar;
