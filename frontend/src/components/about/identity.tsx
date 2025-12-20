import purpleStar from '../../assets/icons/purple_star.webp'
import LiquidGlass from './LiquidGlass'

function Identity() {
  return (
    <LiquidGlass>
      <img
        className='absolute top-[-50px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.50)]'
        src={purpleStar}
      />
      <img
        className='absolute top-[-85px] right-[470px] scale-30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.50)]'
        src={purpleStar}
      />

      <div className="flex flex-col items-center gap-6">
  
      <h2 className="bg-linear-to-b from-[#89189C] to-[#56049C] bg-clip-text text-transparent">
        Sistem dan Manajemen Basis Data
      </h2>

      <button className="text-[#56049C] tracking-wide text-sm">
        SHOWFLIX INTEGRATED DATABASE
      </button>

      <div className="my-6 w-[920px] h-[2px] bg-gradient-to-r from-[#89189C] to-[#56049C]" />

      <div className="grid grid-cols-2 gap-20 text-center">
        {/* MEMBER 1 */}
        <div className="flex flex-col items-center gap-3">
          <h3>Prayuda Afifan Handoyo</h3>
          <h5 className="font-normal">L0224008</h5>
          <h5 className="font-normal">yudafihan@student.uns.ac.id</h5>
        </div>

        {/* MEMBER 2 */}
        <div className="flex flex-col items-center gap-3">
          <h3>Anindya Artanti Pambudi</h3>
          <h5 className="font-normal">L0224002</h5>
          <h5 className="font-normal">anindyaartanti@student.uns.ac.id</h5>
        </div>
      </div>
    </div>

    </LiquidGlass>
  )
}

export default Identity