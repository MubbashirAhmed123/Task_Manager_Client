import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import baseUrl from '../baseUrl';

const useAuth = () => {
    const navigate = useNavigate();
    const [isAuth,setIsAuth]=useState(false)

    useEffect(() => {
        const isAuth = async () => {
            const token = localStorage.getItem('user');
            if (!token) {
                navigate('/');
                return;
            }
            try {
                const res = await fetch(`${baseUrl}/api/tasks`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIsAuth(true)

                if (!res.ok) {

                    const errorData = await res.json();
                    localStorage.removeItem('token');
                    toast.error(errorData.error);
                    setIsAuth(false)
                    navigate('/');
                }

            } catch (error) {
                toast.error(error.message);
                setIsAuth(false)
                localStorage.removeItem('token');
                navigate('/');
            }
        }
        isAuth();
        // eslint-disable-next-line
    }, []);

    return isAuth
};

export default useAuth;
