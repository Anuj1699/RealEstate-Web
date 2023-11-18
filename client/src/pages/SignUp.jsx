import { useState } from "react"
import { Link,useNavigate} from "react-router-dom"
import axios from "axios"
import {useDispatch,useSelector} from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice/userSlice"

export default function SignUp() {
  const dispatch = useDispatch();
  const [formData,setFormData] = useState({})
  const {loading,error} = useSelector((state) => state.user)
  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {value,name} = e.target;
    setFormData({
      ...formData,
      [name] : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const response = await axios.post("/api/auth/signup", formData, {
        headers: {
          'Content-Type': "application/json",
        },
      });
      dispatch(signInSuccess(response.data));
      navigate('/sign-in');
    } catch (error) {
      setLoading(false)
      if (error.response.data.success === false) {
        dispatch(signInFailure(error.response.data.message))
      } 
    }
  };
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-2xl font-semibold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' name="username" className='border p-3 rounded-lg' id="username" onChange={handleChange}/>
        <input type="text" placeholder='email' name="email" className='border p-3 rounded-lg' id="email" onChange={handleChange}/>
        <input type="text" placeholder='password' name="password" className='border p-3 rounded-lg' id="password" onChange={handleChange}/>
        <button disabled={loading} className=' bg-slate-600 rounded-lg p-3 uppercase text-white hover:opacity-95 disabled:opacity-80'>{loading ? "loading..." : "Sign Up"}</button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
           <span className=" text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
