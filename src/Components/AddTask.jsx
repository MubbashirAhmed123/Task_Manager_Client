import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseUrl from '../baseUrl'
import useAuth from '../utils/useAuth'

function AddTask({ setAddTask }) {

    const [task, setTask] = useState({
        title: '',
        description: '',
        column: 'To Do',
        dueDate: ''
    })

    const isAuth=useAuth()
  

    const navigate=useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setTask({ ...task, [name]: value })

    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const token = localStorage.getItem('user');


    try {
        const response = await fetch(`${baseUrl}/api/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(task)
        });
          
        if (response.ok) {
         toast.success('Task added.')
         navigate('/tasks')
        } else {
          const data = await response.json();
          throw new Error(data.error);
        }
      } catch (error) {
        toast.error('Failed to add task', error);
      }

    }
    return (
        <div className='flex justify-center items-center mx-auto  '>
            <form onSubmit={handleSubmit} className=" bg-white p-6 rounded shadow-md w-4/6 md:w-1/2">
                <h2 className="text-2xl mb-4">Add Task</h2>
                <div className="mb-4">
                    <label className="block mb-1">Title</label>
                    <input
                        type="text"
                        name='title'
                        value={task.title}
                        onChange={handleChange}
                        className="w-full border-2 p-2 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Description</label>
                    <textarea
                        name='description'
                        value={task.description}
                        onChange={handleChange}
                        className="w-full border-2 p-2 rounded"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Column</label>
                    <select
                        name='column'
                        value={task.column}
                        onChange={handleChange}
                        className="w-full border-2 p-2 rounded"
                        required
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Due Date</label>
                    <input
                        name='dueDate'
                        type="date"
                        value={task.dueDate}
                        onChange={handleChange}
                        className="w-full border-2 p-2 rounded"
                    />
                </div>
               <div className='flex justify-between gap-5'>
               <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Add Task
                </button>
                <button type="submit" className="w-full  text-black border-2 border-blue-400 p-2 rounded" onClick={()=>navigate(-1)}>
                    Cancel
                </button>
               </div>

                
            </form>
        </div>
    )
}

export default AddTask