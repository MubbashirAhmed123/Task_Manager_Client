import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import EditSingleTask from '../Components/EditSingleTask'
import baseUrl from '../baseUrl'
import useAuth from '../utils/useAuth'

function EditTaskPage() {
    const {id}=useParams()

    const navigate=useNavigate()
    const isAuth=useAuth()


    const [editTask,setEditTask]=useState({
        title: '',
        description: '',
        column: 'To Do',
        dueDate: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditTask({ ...editTask, [name]: value })

    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const token = localStorage.getItem('user');


    try {
        const response = await fetch(`${baseUrl}/api/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(editTask)
        });
  
        if (response.ok) {
         toast.success('Changes made successfully.')
         navigate('/tasks')
        } else {
          const data = await response.json();
          throw new Error(data.error);
        }
      } catch (error) {
        toast.error('Failed to edit task', error);
      }

    }

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
                 setEditTask(data)
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
    <div className='flex justify-center items-center mx-auto  '>
            <EditSingleTask editTask={editTask} handleChange={handleChange} handleSubmit={handleSubmit} navigate={navigate}/>
        </div>
  )
}

export default EditTaskPage