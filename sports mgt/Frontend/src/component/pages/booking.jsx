import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bookSlot } from '../../Redux/bookingSlice';
import BaseUrl from '../../BaseUrl';

function Booking() {
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const dispatch=useDispatch()

  const handleFormSubmit = async (e) => {

    navigate('/payment', {
      state: {
        name: fullname.toString(),
        phoneNumber: phoneNumber.toString(),
      },
    });

  

   


    // dispatch(bookSlot({name:fullname,phoneNumber:phoneNumber})),
    e.preventDefault();
   

    try {
      // Perform booking logic using the entered name and phone number
      console.log('Booking submitted:', fullname, phoneNumber);
      // ... (Make the API call or perform any other actions here)
    } catch (error) {
      console.error('Failed to submit booking:', error);
      setError('Failed to submit booking');
    }
  };

  const user = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(BaseUrl+'/account/userdata', {
          params: {
            user_id: user,
          },
        });
        setUserData(response.data);
        setFullname(response.data.full_name?.toString() || '');
        setPhoneNumber(response.data.phone_number?.toString() || '');
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setError('User not found');
      }
    };
  
    if (user) {
      fetchUserData();
    }
  }, [user]);
  

  const handleFullNameChange = (e) => {
    setFullname(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold mb-6">Booking Form</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="full_name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={fullname}
              onChange={handleFullNameChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
              Phone Number:
            </label>
            <input
              type="text"
              id="phone_number"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
