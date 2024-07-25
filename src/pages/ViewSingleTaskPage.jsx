import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import baseUrl from '../baseUrl';

function ViewSingleTaskPage() {

    const {id}=useParams()
    const navigate=useNavigate()

    const[taskDetails,setTasdDetails]=useState({
        title:'',
        description:''
    })

    useEffect(()=>{
        const fetchTask=async ()=>{
            const token = localStorage.getItem('user');

            try {
                const response = await fetch(`${baseUrl}/api/tasks/${id}`, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${token}`
                  },
                });
                 const data=await response.json()
                if (response.ok) {
                setTasdDetails(data)
                } else {
                  const data = await response.json();
                  throw new Error(data.error);
                }
              } catch (error) {
                toast.error('Failed to fetch task.', error);
              }
        }
        fetchTask()
    },[id])
  return (
   <div className=' flex justify-center items-center h-[500px]'>
     <div className='relative bg-gray-200 rounded h-[400px] w-[350px]  p-5 space-y-7'>
        <h1 className='font-bold text-center'>Task Details</h1>
         <p><span className='font-bold'>Title</span>: {taskDetails.title}</p>
         <p><span className='font-bold'>Description</span>:{taskDetails.description}</p>
         <p><span className='font-bold'>Created at</span>: {taskDetails.dueDate?.split('T')[0]}</p>
         <button className=' bg-gray-400 px-2 py-2 rounded' onClick={()=>navigate(-1)}>Back</button>
    </div>
   </div>
  )
}

export default ViewSingleTaskPage