import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleLoginButton from './GoogleLoginButton';
import baseUrl from '../baseUrl';

const Login = () => {
  const [login, setLogin] = useState({
    email:'',
    password:''
  });

  const navigate=useNavigate()

  const handleChange=(e)=>{
    const{name,value}=e.target

    setLogin({...login,[name]:value})


  }

  const handleLogin =async (e) => {
    e.preventDefault();
    setLogin({email:'',password:''})
        try {
          const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
          });
          const data = await response.json();
          if (response.ok) {
            toast.success('logged in successfully.')
            navigate('/tasks')
            localStorage.setItem('user', data.token);
          } else {
            toast.error(data.error)
            throw new Error(data.error);
          }
        } catch (error) {
          toast.error(error.message);
        }
    
  
};

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl mb-4">Login</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={login.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Login
      </button>
      <GoogleLoginButton/>
      <p className='p-2 text-center'>Don't have account ? <Link to='/signup' className='font-bold'>Register</Link></p>
    </form>
  );
}

export default Login;
