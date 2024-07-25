import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import baseUrl from '../baseUrl';


function Task({tasks,setTasks}) {
    const columns = ['To Do', 'In Progress', 'Done'];
    const navigate=useNavigate()


    const handleDelete= async (id)=>{
        const confirm=window.confirm('Are you sure you want to delete task')
        if(confirm){
        const token=localStorage.getItem('user')
        try {
            const res=await fetch(`${baseUrl}/api/tasks/${id}`,{
                   method:'DELETE',
                    headers:{ 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`}

            })
            const data=await res.json()
            console.log(res)
            if(res.ok){
                setTasks(tasks.filter(t => t._id !== id));
                toast.success(data.message)
                return
            }else{
                toast.error('some error')
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    }

  return (
    <div className=" md:grid md:grid-cols-2 lg:grid-cols-3 ">

        {columns.map((column) => (
                    <div key={column} className=" p-2">
                        <h2 className="text-xl mb-4 bg-blue-400 p-2">{column}</h2>
                        <div className="bg-gray-100 p-4 rounded ">
                            {tasks.filter((task) => task.column === column)
                                .map((task) => (
                                    <motion.div
                                        key={task._id}
                                        drag

                                        className="bg-blue-200 p-2 mb-2 rounded shadow"
                                    >
                                        <h3 className='font-bold'>{task.title}</h3>
                                        <p>{task.description}</p>
                                        <p>created at: {task.dueDate.split('T')[0]}</p>
                                        <div className='space-y-5 space-x-5'>
                                            <button className='bg-red-400 text-white px-2 py-1 rounded' onClick={()=>handleDelete(task._id)}>Delete</button>
                                            <button className='bg-blue-400 text-white px-2 py-1 rounded' onClick={()=>navigate(`/edit-task/${task._id}`)}>Edit</button>
                                            <button className='bg-blue-500 text-white px-2 py-1 rounded' onClick={()=>navigate(`/single-task/${task._id}`)}>View Details</button>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                ))}
    </div>
  )
}

export default Task