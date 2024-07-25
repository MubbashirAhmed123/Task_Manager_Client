import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleLoginButton from './GoogleLoginButton';
import baseUrl from '../baseUrl';

const Signup = () => {
  const [register, setRegister] = useState({
    username:'',
    email:'',
    password:''
  });

  const handleChange=(e)=>{
    const{name,value}=e.target
    setRegister({...register,[name]:value})
  }


  const handleSignup = async(e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${baseUrl}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(register)
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('user', data.token);
          toast.success('registerd successfully.')
        } else {
        //   throw new Error(data.error);
          toast.error(data.error)

        }
      } catch (error) {
        console.error(error.message);
        toast.error(error.message)
      }
  

  };

  return (
    <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 className="text-2xl mb-4">Signup</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          name='username'
          value={register.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name='email'
          value={register.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name='password'
          value={register.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Signup
      </button>
      <GoogleLoginButton />
      <p className='p-2 text-center'>Have an account ? <Link to='/' className='font-bold'>Login</Link></p>

    </form>
  );
};

export default Signup;
