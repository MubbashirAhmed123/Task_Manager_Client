import React, { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { FaBackward } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserProfile from './UserProfile';

const Navbar = () => {

  const[userProfile,setUserProfile]=useState(false)

  const { pathname } = useLocation()
  const token = localStorage.getItem('user')
  const navigate = useNavigate()

  const handleLogout = () => {
    const confirm = window.confirm('Are you sure you want to logout?')
    if (confirm) {
      localStorage.removeItem('user')
      navigate('/')
      toast.info('Logout successfully.')
    }

  }

  return (
    <>
    {userProfile && <UserProfile setUserProfile={setUserProfile}/>}

    <nav className="bg-blue-500 p-4 sticky top-0">
      <div className="container mx-auto flex justify-center items-center gap-10">
        {pathname !== '/' && <FaBackward onClick={() => navigate(-1)} color='white' />}
        
          {!token ? (<> <Link to="/" className="text-white mx-2">Login</Link>
          <Link to="/signup" className="text-white mx-2">Signup</Link></>) : (<><button className='text-white' onClick={handleLogout}>Log out</button> <Link to="/tasks" className="text-white mx-2">Tasks</Link> <BiUserCircle size={25} color='white' className='cursor-pointer' onClick={()=>setUserProfile(!userProfile)}/></>)}

      </div>
    </nav>
    </>
  );
};

export default Navbar;
