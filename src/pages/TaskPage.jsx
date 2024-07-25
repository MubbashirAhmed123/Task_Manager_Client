import React, { useEffect, useState } from 'react';
import Tasks from '../Components/Tasks';
import useAuth from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../baseUrl';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    const token = localStorage.getItem('user');

    const fetchTasks = async () => {
      const res = await fetch(`${baseUrl}/api/tasks`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, [isAuth]);


  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  
  const today = new Date();

  const filterTasks = () => {
    switch (filter) {
      case 'recent':
        const recentDate = new Date();
        recentDate.setDate(today.getDate()-8);
        return filteredTasks.filter((task) => {
          const taskDate = new Date(task.dueDate);
          return taskDate >= recentDate && taskDate <= today;
        });
     
      case 'all':
      default:
        return filteredTasks;
    }
  };

  return (
    <div className='p-5'>
      <button
        className='bg-blue-500 px-5 py-2 rounded text-white mt-5 '
        onClick={() => navigate('/add-task')}
      >
        Add Task
      </button>

      <div className='flex flex-wrap justify-between items-center'>
        <div className='mt-3 w-full md:w-[500px]'>
          <label htmlFor='search' >Search</label>
          <input
            type='text'
            name='search'
            className='p-2 rounded border-2 border-gray-600 w-full'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='w-fit'>
          <label htmlFor='sort' className='px-5'>Sort By</label>
          <select
            name='sort'
            id='sort'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='border p-2 border-black'
          >
            <option value='all'>All</option>
            <option value='recent'>Recent</option>
          </select>
        </div>
      </div>

      <Tasks tasks={filterTasks()} setTasks={setTasks} />
    </div>
  );
};

export default TaskPage;
