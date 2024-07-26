import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../baseUrl';


const GoogleLoginButton = () => {

          const navigate=useNavigate()
          const handleGoogleLogin =async (credentail) => {
         const res=await fetch(`${baseUrl}/api/auth/google-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentail)
          })
          const data=await res.json()
          localStorage.setItem('user',data.token)
          if(res.ok){
          navigate('/tasks')
          }else{
            toast.error(data.error)
          }
        
      };
    return (
        <div className='p-2'>
            <span>Continue with google</span>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    handleGoogleLogin(credentialResponse);
                  }}
                onError={() => {
                    toast.error('Login Failed')
                }}
            />
        </div>
    )


};

export default GoogleLoginButton;
