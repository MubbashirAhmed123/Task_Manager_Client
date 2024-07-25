import React, { useEffect, useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { GiCancel } from 'react-icons/gi'
import { toast } from 'react-toastify'
import baseUrl from '../baseUrl'

function UserProfile({setUserProfile}) {

    const[user,setUser]=useState()
    const token=localStorage.getItem('user')

    useEffect(()=>{

        const fetchTasks = async () => {
          try {
            const res = await fetch(`${baseUrl}/api/user`, {
                headers: { 'Authorization': `Bearer ${token}` },
              });
              const data = await res.json();
              setUser(data);
          } catch (error) {
            toast.error('some error')
          }
          };
          fetchTasks();
// eslint-disable-next-line
    },[])

  return (
    <div className=' w-[300px] bg-gray-300 h-screen fixed z-10 flex flex-col justify-center items-center gap-10'>

        <BiUserCircle size={35}/>
        <h1>Name : {user?.username}</h1>
        <h1>Email : {user?.email}</h1>

        <GiCancel className='absolute top-2 right-2 cursor-pointer' size={20} onClick={()=>setUserProfile(false)}/>
      
    </div>
  )
}

export default UserProfile