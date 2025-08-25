'use client'
import React , {useState}from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import {useEffect} from 'react'
import Link  from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [user,setUSer] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [buttonDisabled, setButtonDiasbled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async ()=>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup" , user)
      console.log("Success", response.data);
      router.push('/login')
    } catch (error:any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length> 0){
      setButtonDiasbled(false)
    }
    else{
      setButtonDiasbled(true)
    }
  } ,[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className='text-3xl font-bold italic underline m-1'>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username" className='text-2xl text-blue-500'>username</label>
      <input type="text" id = 'username' value={user.username} onChange={(e) =>setUSer({...user,username: e.target.value})}
      placeholder='username' className='text-2xl border rounded-full p-2 m-3 bg-gray-900' />

      <label htmlFor="email" className='text-2xl text-blue-500'>email</label>
      <input type="text" id = 'email' value={user.email} onChange={(e) =>setUSer({...user,email: e.target.value})}
      placeholder='email' className='text-2xl border rounded-full p-2 m-3 bg-gray-900' />


      <label htmlFor="password" className='text-2xl text-blue-500'>password</label>
      <input type="text" id = 'password' value={user.password} onChange={(e) =>setUSer({...user,password: e.target.value})}
      placeholder='password' className='text-2xl border rounded-full p-2 m-3 bg-gray-900' />
      <button onClick={onSignup} className='m-2 border p-4 bg-slate-700 rounded-full'> 
        {buttonDisabled ? "Please Fill The Form" : "Signup"}
      </button>
      <Link href="/login">Visit login Page</Link>
    </div>
  )
}
