import Input from './Input.tsx'
import { useState } from 'react'

function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);
  }

  return (
    <form className='flex flex-col items-center w-full' onSubmit={handleSubmit}>
      <div className='mt-10 flex flex-col gap-8 w-[95%] items-center'>
        <Input
          placeholder="Username"
          id="username"
          value={username}
          onChange={e => {
            setUsername(e.target.value)
          }}
        />

        <Input
          placeholder="Username"
          type="password"
          id="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
      </div>

      <div className='flex flex-row justify-between w-[95%] mt-10 mb-6'>
        <button className="hover-scale border border-primary2-1 py-1 rounded-4xl text-primary3-1 w-[45%] shadow-4xl">
          <span
            className="
              bg-linear-to-r from-primary3-2 to-primary3-1
              bg-clip-text text-transparent">
            BACK
          </span>
        </button>

        <button type="submit" className="hover-scale py-1 rounded-4xl w-[45%]
                           bg-linear-to-r from-primary3-2 to-primary3-1 text-white">
          LOG IN
        </button>
      </div>

      {error && <p className='text-red'>{error}</p>}
      {success && <p className='text-green'>{success}</p>}
    </form>
  )
}

export default LoginForm;
