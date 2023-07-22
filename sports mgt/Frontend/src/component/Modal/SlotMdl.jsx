import React, { useState, useEffect } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import BaseUrl from '../../BaseUrl';

function SlotMdl({ isVisible, onClose, slot,user }) {
  const [fullname, setFullname] =useState(user?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || '');

  console.log(user,'===========');
  useEffect(() => {
    if (user) {
      setFullname(user.full_name || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phone_number || '');
    }
  }, [user]);
  

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') {
      onClose();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(BaseUrl+'/account/userdata', {
        user_id: user?.id,
        full_name: fullname,
        email: email,
        phone_number: phoneNumber,
      });

      console.log('Profile updated successfully:', response.data);
      toast.success('Profile Updated Successfully');
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!isVisible || !slot) return null;

  return (
    <div>
      <div
        id="wrapper"
        className="absolute inset-0 bg-black bg-opacity-25 z-10 backdrop-blur-sm w-full h-full flex justify-center items-center"
        onClick={handleClose}
      >
        <div className="w-[900px] flex flex-col overflow-y-auto h-[600px]">
          <button className="text-white text-xl place-self-end" onClick={onClose}>
            x
          </button>
          <div className="bg-white p-1 rounded-lg overflow-y-auto">
            <form onSubmit={handleFormSubmit}>
              <Input
                type="text"
                placeholder="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="tel"
                placeholder="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button type="submit">Register</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlotMdl;
