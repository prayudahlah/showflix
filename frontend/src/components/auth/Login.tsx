import purpleStar from '../../assets/icons/purple_star.webp'
import Input from './Input.tsx'

function Login() {
  return (
    <div className="auth-card backdrop-blur-xl p-4 relative bg-white/75">
      <img
        className='absolute top-[-50px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.50)]'
        src={purpleStar}
      />
      <img
        className='absolute top-[-85px] right-[110px] scale-30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.50)]'
        src={purpleStar}
      />
      <h3 className='pt-12'>Welcome to our universe!</h3>
      <p>Please enter your information!</p>

      <div className='mt-10 flex flex-col gap-8 w-[95%] items-center'>
        <Input placeholder="Email" />
        <Input placeholder="Username" />
        <Input placeholder="Password" type="password" />
      </div>

      <div className='flex flex-row justify-between w-[95%] mt-10'>
        <button className="button-animation border border-primary2-1 py-1 rounded-4xl text-primary3-1 w-[45%] shadow-4xl">
          <span
            className="
              bg-linear-to-r from-primary3-2 to-primary3-1
              bg-clip-text text-transparent">
            BACK
          </span>
        </button>

        <button className="button-animation py-1 rounded-4xl w-[45%]
                           bg-linear-to-r from-primary3-2 to-primary3-1 text-white">
          LOG IN
        </button>
      </div>
    </div >
  )
}

export default Login
