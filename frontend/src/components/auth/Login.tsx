import purpleStar from '../../assets/icons/purple_star.webp'
import LoginForm from './LoginForm.tsx'

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

      <LoginForm />
    </div>
  )
}

export default Login
