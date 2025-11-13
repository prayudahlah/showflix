import { useLogin } from '../../hooks/useLogin.ts'
import Input from './Input.tsx'
import { useState } from 'react'

function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate({
      username: username,
      password: password,
    })
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
          placeholder="Password"
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

      {loginMutation.isError && (
        <p className="text-red-500 mt-3">Login gagal. Coba lagi.</p>
      )}

      {loginMutation.isSuccess && (
        <p className="text-green-500 mt-3">Login sukses!</p>
      )}    </form>
  )
}

export default LoginForm;
