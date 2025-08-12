import { useEffect, useState } from "react"
import { useAdminContext } from "../../context/AdminContext"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";


export default function Login() {

  const [credentials, setCredentials]=useState({
    email: 'adil@email.com',
    password: 'adil2025'
  })
  const {setAuthenticated,authenticate,setAdmin,login} = useAdminContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (authenticate === true) {
      navigate('/dashboard')
    }
  }, [authenticate,navigate]) 

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login(credentials).then(response => response);
      if (response?.status >=200 && response?.status <300 ) {
        setAuthenticated(true);
        setAdmin(response.data);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 2000,
          showConfirmButton: false
        });
        navigate('/dashboard');
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response.data.message,
        confirmButtonColor: "#d33",
      }); 
    }
    
  }
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col bg-slate-100 justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="font-bold text-3xl text-center text-indigo-800" style={{letterSpacing:'2px'}}>NMILI<span className="italic text-black ">Management</span></h1>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={e => setCredentials({...credentials,email:e.target.value})}
                  value={credentials.email}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={e => setCredentials({...credentials,password:e.target.value})}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          
        </div>
      </div>
    </>
  )
}
