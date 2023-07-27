import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List } from 'antd'; // Import List component
import Sidebar from './Sidebar';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import BaseUrl from '../BaseUrl';

const SlotsList = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [startTime, setStartTime]=useState('');
  const [endTime, setEndTime]=useState('');

  const location = useLocation();

  useEffect(() => {
    // Access the updated start time and end time from the location state
    const { startTime, endTime } = location.state || {};
    if (startTime && endTime) {
      // Set the initial start time and end time in the state
      setStartTime(startTime);
      setEndTime(endTime);
    }

    // Fetch slots whenever the currentPage or searchTerm changes
    fetchSlots();
  }, [currentPage, searchTerm, location.state]); 

  const fetchSlots = async () => {
    try {
      const response = await axios.get(BaseUrl + '/AdminSide/allslots/', {
        params: {
          page: currentPage, // Send the current page number as a query parameter
          search: searchTerm, // Send the search term as a query parameter
        },
      });
      // Ensure the API response is an array of objects
      console.log(response.data, 'ttttttttttttttttttttttttt');
      setSlots(response.data); // Assuming the API response contains a property called "slots"
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      await axios.delete(BaseUrl+`/AdminSide/slotdelete/${slotId}`);
      // After successful deletion, fetch the updated slots
      toast.success('Successfully Deleted')
      fetchSlots();
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  

  const handleEditSlot = (slotId) => {
    navigate (`/editslot/${slotId}`);
    console.log(`Edit slot with ID ${slotId}`);
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
            <div className="flex-grow bg-gray-100 p-8">
        <h2 className="text-2xl text-center font-bold mb-8">All Slots</h2>
        
        <div className="rounded-lg overflow-hidden">
  <List
    dataSource={slots}
    renderItem={(slotItem) => ( // Renamed slots to slotItem here
      <List.Item className="border-b border-gray-200 p-4 flex flex-row justify-between items-center">
        <div>
          <p className="text-lg font-semibold">
            {slotItem.start_time
              ? moment(slotItem.start_time).format('YYYY-MM-DD')
              : '-'}{' '}
            - {slotItem.start_time
              ? moment(slotItem.start_time).format('HH:mm')
              : '-'}{' '}
            - {slotItem.end_time
              ? moment(slotItem.end_time).format('HH:mm')
              : '-'}{' '}
          </p>
          <p className="text-sm text-gray-500">Turf: {slotItem.turf.name}</p>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => handleEditSlot(slotItem.id)}
            className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteSlot(slotItem.id)}
            className="px-3 py-1 text-white bg-red-500 rounded-lg"
          >
            Delete
          </button>
        </div>
      </List.Item>
    )}
  />
</div>

      </div>
            {/* change */}
          </div>
        </div>
    </section>
    </div>
  );
};

export default SlotsList;






