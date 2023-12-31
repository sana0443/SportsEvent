import React, { useState, useEffect } from 'react';
import { Input, Button, Avatar } from '@material-tailwind/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import BaseUrl from '../../BaseUrl';

function ProfileUpdateMdl({ isVisible, onClose, profilee, onProfileUpdate }) {
  const [userData, setUserData] = useState({});
  const [fullname, setFullname] = useState(profilee?.full_name || '');
  const [email, setEmail] = useState(profilee?.email || '');
  const [age, setAge] = useState(profilee?.age || '');
  const [phoneNumber, setPhoneNumber] = useState(profilee?.phone_number || '');
  const [photo, setPhoto] = useState(profilee?.photo || null);
  const [newPhoto, setNewPhoto] = useState(null);

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
        setFullname(response.data.full_name || '');
        setPhoneNumber(response.data.phone_number || '');
        setEmail(response.data.email || '');
        setAge(response.data.age || '');
        setPhoto(response.data.photo || '');
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setError('User not found');
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('user_id', profilee);
      formData.append('full_name', fullname);
      formData.append('email', email);
      formData.append('phone_number', phoneNumber);
      formData.append('age', age);
      if (newPhoto) {
        formData.append('photo', newPhoto);
      }

      const response = await axios.put(BaseUrl+'/account/userdata', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile updated successfully:', response.data);
      onProfileUpdate();
      console.log(response.data);
      onClose();
      toast.success('Profile Updated Successfully');
        // if (response.data.photo) {
        //   localStorage.setItem('userProfileImage', response.data.photo);
        //   console.log(response.data.photo,user);
        // }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') {
      onClose();
    }
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setNewPhoto(selectedPhoto);
    setPhoto(URL.createObjectURL(selectedPhoto)); // Generate a temporary URL for the selected image file
  };

  if (!isVisible || !profilee) return null;

  if (age < 0) {
    toast.error("Enter a valid age");
  } else if (!/^\d+$/.test(age)) {
    toast.error("Age must be a valid number");
  }

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
          <div className="bg-white p-4 rounded-lg overflow-y-auto">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <Avatar src={photo} alt="Profile Picture" className="w-24 h-24 mb-4" />
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
              <Input
                type="text"
                placeholder="Fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
              type="text"
    placeholder="Phone Number"
    value={phoneNumber}
    onChange={(e) => {
      const inputValue = e.target.value;
      if (/^\d{0,10}$/.test(inputValue)) {
        setPhoneNumber(inputValue);
      }
    }}
  />
              <Button type="submit">Update</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdateMdl;
