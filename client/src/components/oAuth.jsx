import React from 'react'
import {GoogleAuthProvider,  getAuth, signInWithPopup} from "firebase/auth"
import { app } from '../firebase';
import  axios  from 'axios';
import {useDispatch} from "react-redux";
import { signInSuccess } from '../redux/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleAuth = async () =>{
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth,provider);
      const {displayName, email, photoURL} = result.user;
      const res = await axios.post('/api/auth/google',{
        name : displayName,
        email : email,
        avatar : photoURL
      },{
        header : "application/json"
      })
      navigate('/');
      console.log(res.data);
      dispatch(signInSuccess(res.data));
    } catch (error) {
      console.log('could not signin with google', error);
    }
  }
  return (
    <button type='button' className='uppercase bg-red-700 rounded-lg text-white p-3 hover:opacity-90' onClick={handleAuth}>Continue with google</button>
  )
}
 