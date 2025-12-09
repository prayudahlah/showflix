import { useNavigate } from 'react-router'
import { useLogin } from '../../hooks/useLogin.ts'
import Input from './Input.tsx'
import { useEffect, useState } from 'react'

function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const login = useLogin()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login.mutate({ username, password })
  }

  useEffect(() => {
    if (login.isSuccess && login.data) {
      navigate(`/dashboard/${login.data.role}`)
    }
  }, [login.isSuccess, login.data])

  useEffect(() => {
    if (!login.isError || !login.error) return;

    const err = login.error;

    if (err.code === "ERR_NETWORK") {
      setErrorMessage("Unable to Connect to Server");
      return;
    }

    const message =
      err.response?.data?.message ??
      err.message ??
      "Unexpected Error Occurred";

    setErrorMessage(message);
  }, [login.isError, login.error])

  return (
    <form className='flex flex-col items-center w-full' onSubmit={handleSubmit}>
      <div className='mt-10 flex flex-col gap-8 w-[95%] items-center'>
        <Input
          placeholder="Username"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className='flex flex-row justify-between w-[95%] mt-10 mb-6'>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="hover-scale border border-primary2-1 py-1 rounded-4xl text-primary3-1 w-[45%] shadow-4xl"
        >
          <span className="bg-linear-to-r from-primary3-2 to-primary3-1 bg-clip-text text-transparent">
            BACK
          </span>
        </button>

        <button
          disabled={login.isPending}
          type="submit"
          className="hover-scale py-1 rounded-4xl w-[45%] bg-linear-to-r from-primary3-2 to-primary3-1 text-white"
        >
          {login.isPending ? "Loading..." : "LOG IN"}
        </button>
      </div>

      {login.isError && (
        <p className="text-red-500 mt-3">{errorMessage}</p>
      )}
    </form>
  )
}

export default LoginForm

