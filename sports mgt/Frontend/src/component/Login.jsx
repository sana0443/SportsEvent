import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import {useDispatch} from 'react-redux'
import { setUserDetails } from '../Redux/userSlice';
import { toast} from "react-hot-toast";
import BaseUrl from '../BaseUrl';



// import{auth} from "../Config/Config"





const Login = () => {
  
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };



  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const user = {
      email: email,
      password: password,
    };

    try {
      const { data } = await axios.post(BaseUrl+'/account/signin/', user);
      console.log('axios return data--------------------',data);
      Cookies.set('access-token', data.access_token);
      Cookies.set('refresh-token', data.refresh_token);


      localStorage.setItem("token", data.id)
    
      dispatch(
        setUserDetails({
          id:data.id,
          full_name:data.full_name,
          phone_number:data.phone_number,
          // image:response.data.user?.image,
          email:data.email,
          age:data.age
          
        })
      )
      console.log(data.full_name);
      toast.success("successfully logged");
      navigate('/'); 
      console.log(data.full_name);// Redirect to dashboard page after successful login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error(error);
    }
  };
  
 

  return (
  
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-15 mx-auto md:h-screen lg:py-0">
        <div className="w-full max-w-md bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
              Login to your account
            </h1>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form className="space-y-4" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                onClick={submitForm}
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;