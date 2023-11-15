import { Link } from "react-router-dom"

export default function SignUp() {
  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-2xl font-semibold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id="username"/>
        <input type="text" placeholder='email' className='border p-3 rounded-lg' id="email"/>
        <input type="text" placeholder='password' className='border p-3 rounded-lg' id="password"/>
        <button className=' bg-slate-600 rounded-lg p-3 uppercase text-white hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
           <span className=" text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  )
}
