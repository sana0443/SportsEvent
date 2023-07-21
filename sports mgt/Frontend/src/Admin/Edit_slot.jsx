import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TimePicker, DatePicker, Button } from 'antd';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-hot-toast";
import Sidebar from './Sidebar';
import BaseUrl from '../BaseUrl';

function Edit_slot() {
  const { id } = useParams(); 
  console.log(id,'ppp');// Fetch the slot ID from the URL parameter
  const navigate=useNavigate();
  const [turf, setTurf] = useState(null);
  const [price, setPrice] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [availableTurfs, setAvailableTurfs] = useState([]);

  const [selectedDate, setSelectedDate] = useState(moment());
  const [startTime, setStartTime] = useState(moment().startOf('day').add(8, 'hours'));
  const [endTime, setEndTime] = useState(moment().startOf('day').add(10, 'hours'));

  useEffect(() => {
 
    fetchSlotData();
  }, []);


  useEffect(() => {
    fetchAvailableTurfs();
  }, []);

  useEffect(() => {
    if (availableTurfs.length > 0) {
      fetchSlotData();
    }
  }, [availableTurfs]);
  const fetchAvailableTurfs = () => {
    axios
      .get(BaseUrl+'slots/turfs/')
      .then((response) => {
        setAvailableTurfs(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch available turfs:', error);
      });
  };

  const fetchSlotData = () => {
    axios
      .get(BaseUrl+`AdminSide/slot/${id}/`)
      .then((response) => {
        const slotData = response.data;
        console.log(slotData,'slotrrrrrr');
        const selectedTurf = availableTurfs.find((turf) => turf.id === slotData.turf);

      // Set the initial "turf" state to the selected turf object
      setTurf(selectedTurf);

        setSelectedDate(moment(slotData.start_time));
        setStartTime(moment(slotData.start_time));
        setEndTime(moment(slotData.end_time));
        setPrice(slotData.price);
        setIsAvailable(slotData.is_available);
      })
      .catch((error) => {
        console.error('Error fetching slot data:', error);
      });
  };

  const disabledDate = (current) => {
    // Disable all dates before the current date (including the current date)
    return current && current < moment().startOf('day');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedStartTime = startTime && selectedDate ? selectedDate.format('YYYY-MM-DD') + ' ' + startTime.format('HH:mm') : null;
    const formattedEndTime = endTime && selectedDate ? selectedDate.format('YYYY-MM-DD') + ' ' + endTime.format('HH:mm') : null;

    axios
      .put(BaseUrl+`AdminSide/slot/${id}/`, {
        turf: turf.id,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        price: price,
        is_available: isAvailable,
      })
      .then((response) => {
        console.log('Slot updated successfully:', response.data);
        toast.success('updated successfully')
        navigate('/slotz')
      })
      .catch((error) => {
        console.error('Error updating slot:', error);
      });
  };

  return (
    <div>
        <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://media.istockphoto.com/id/1217377601/photo/concrete-floor-and-smoke-background.webp?b=1&s=170667a&w=0&k=20&c=ajtSlLyL-T2cFmBQWzbfvw-E25hfFCLt-aFnRlKOWvY=')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <Sidebar />
            {/* change */}
            <div className='flex flex-col lg:ml-60 pt-6'>
<h2 className="text-2xl font-bold mb-4">Edit Slot</h2>
<form onSubmit={handleSubmit} className="w-96 bg-white rounded-lg shadow-md p-4">
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="turf">
      Turf:
    </label>
    <select
      id="turf"
      value={turf ? turf.id : ''}
      onChange={(e) => {
        const selectedTurf = availableTurfs.find((t) => t.id === parseInt(e.target.value));
        setTurf(selectedTurf);
      }}
      className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    >
      <option value="">Select Turf</option>
      {availableTurfs.map((turf) => (
        <option key={turf.id} value={turf.id}>
          {turf.name}
        </option>
      ))}
    </select>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectedDate">
      Date:
    </label>
    <DatePicker
      id="selectedDate"
      value={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      disabledDate={disabledDate} 
      className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
      Start Time:
    </label>
    <TimePicker
      id="startTime"
      value={startTime}
      onChange={(time) => setStartTime(time)}
      className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      placeholder="Select Start Time"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
      End Time:
    </label>
    <TimePicker
      id="endTime"
      value={endTime}
      onChange={(time) => setEndTime(time)}
      className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      placeholder="Select End Time"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
      Price:
    </label>
    <input
      type="text"
      id="price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      placeholder="Enter Price"
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isAvailable">
      Is Available:
    </label>
    <input
      type="checkbox"
      id="isAvailable"
      checked={isAvailable}
      onChange={(e) => setIsAvailable(e.target.checked)}
      className="w-4 h-4 border rounded focus:outline-none focus:ring focus:border-blue-300"
    />
  </div>
  <Button
    type="primary"
    htmlType="submit"
    className="w-full"
    style={{ backgroundColor: '#1890ff', color: '#ffffff' }}
  >
    Update Slot
  </Button>
</form>
</div>

            {/* change */}
          </div>
        </div>
    </section>
     
    </div>
  );
}

export default Edit_slot;




