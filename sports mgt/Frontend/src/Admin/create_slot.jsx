import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TimePicker, DatePicker, Button } from 'antd';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import BaseUrl from '../BaseUrl';

function CreateSlotForm() {
  const [turf, setTurf] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [price, setPrice] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [availableTurfs, setAvailableTurfs] = useState([]);
  const [existingSlots, setExistingSlots] = useState([]);
  const navigate=useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const slot_id = queryParams.get('id');

  useEffect(() => {
    fetchAvailableTurfs();
  }, []);

  useEffect(() => {
    if (turf && selectedDate) {
      fetchExistingSlots();
    }
  }, [turf, selectedDate,slot_id ]);

  const fetchAvailableTurfs = () => {
    axios
      .get(BaseUrl+'/slots/turfs/')
      .then((response) => {
        console.log(response.data,"cpomiiiii");
        setAvailableTurfs(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch available turfs:', error);
      });
  };

  const fetchExistingSlots = () => {
    if (!turf || !selectedDate) {
      // No turf or date selected, so clear the existingSlots
      setExistingSlots([]);
      return;
    }
  
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    const turfId = turf.id;
    const params = new URLSearchParams({
      turf: turfId,
      date: formattedDate,
    });


  
    axios
      .get(BaseUrl+`/AdminSide/existingSlots/?${params}`)
      .then((response) => {
        console.log('Fetched existing slots:', response.data);
        setExistingSlots(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch existing slots:', error);
      });
  };
  
  
  
const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Convert the selectedDate, startTime, and endTime to the proper format
    const formattedStartTime = startTime && selectedDate ? selectedDate.format('YYYY-MM-DD') + 'T' + startTime.format('HH:mm:ss') + 'Z' : null;
    const formattedEndTime = endTime && selectedDate ? selectedDate.format('YYYY-MM-DD') + 'T' + endTime.format('HH:mm:ss') + 'Z' : null;
  
    // Send the data to the backend API
    axios
      .post(BaseUrl+'/AdminSide/createSlot/', {
        turf: turf.id,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        price: price,
        is_available: isAvailable,
      })
      .then((response) => {
        console.log('Slot created successfully:', response.data);
        navigate('/slotz')
        // You can show a success message or redirect the user to another page after successful creation.
      })
      .catch((error) => {
        console.error('Error creating slot:', error);
        // You can show an error message to the user in case of failure.
      });
  };
  const disabledTimes = existingSlots.map((slot) => ({
    startTime: moment(slot.start_time, 'HH:mm', true),
    endTime: moment(slot.end_time, 'HH:mm', true),
  }));
  
  
  
const disabledStartTimes = (time) => {
  if (!selectedDate || !turf) {
    return null; // Return null when no date or turf is selected
  }

  const formattedDate = selectedDate.format('YYYY-MM-DD');
  const matchingSlots = existingSlots.filter(
    (slot) =>
      turf.id === slot.turf &&
      formattedDate === moment(slot.start_time).format('YYYY-MM-DD') &&
      time.isSameOrBefore(moment(slot.end_time))
  );

  const disabledTimes = matchingSlots.map((slot) => {
    return {
      hour: moment(slot.start_time).hour(),
      minute: moment(slot.start_time).minute(),
    };
  });

  return {
    disabledHours: () => disabledTimes.map((time) => time.hour),
    disabledMinutes: (hour) =>
      disabledTimes
        .filter((time) => time.hour === hour)
        .map((time) => time.minute),
  };
};

  
const disabledEndTimes = (time) => {
  if (!selectedDate || !turf) {
    return null; // Return null when no date or turf is selected
  }

  const formattedDate = selectedDate.format('YYYY-MM-DD');
  const matchingSlots = existingSlots.filter(
    (slot) =>
      turf.id === slot.turf &&
      formattedDate === moment(slot.end_time).format('YYYY-MM-DD') &&
      time.isSameOrAfter(moment(slot.start_time))
  );

  const disabledTimes = matchingSlots.map((slot) => {
    return {
      hour: moment(slot.end_time).hour(),
      minute: moment(slot.end_time).minute(),
    };
  });

  return {
    disabledHours: () => disabledTimes.map((time) => time.hour),
    disabledMinutes: (hour) =>
      disabledTimes
        .filter((time) => time.hour === hour)
        .map((time) => time.minute),
  };
};

  
  
const slotExists = (startTime, endTime) => {
  if (!startTime || !endTime) {
    // Return false if either startTime or endTime is null
    return false;
  }

  return existingSlots.some((slot) => {
    const slotStartTime = moment(slot.start_time);
    const slotEndTime = moment(slot.end_time);

    return (
      startTime.isBefore(slotEndTime) && // Selected start time is before the existing slot's end time
      endTime.isAfter(slotStartTime)    // Selected end time is after the existing slot's start time
    );
  });
};

  
  
  const handleDateChange = (date) => {
    if (date) {
      // Convert the date to a moment object before setting the state
      setSelectedDate(moment(date));
    }
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
            <h2 className="text-2xl text-center font-bold mb-4">Create Slot</h2>
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
      disabledDate={ disabledDate }
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
disabled={existingSlots.length > 0 && slotExists(startTime, endTime)}
disabledTime={(time) => {
if (selectedDate) {
const selectedEndTime = moment(selectedDate).set('hour', time.hour).set('minute', time.minute);
const matchingSlot = disabledTimes.find(
  (slot) =>
    selectedEndTime.isSame(slot.startTime) ||
    (selectedEndTime.isAfter(slot.startTime) && selectedEndTime.isBefore(slot.endTime))
);
if (matchingSlot) {
  return {
    disabledHours: () => [time.hour],
    disabledMinutes: () => [time.minute],
  };
} else {
  return {}; // Return empty object to enable all hours and minutes
}
} else {
return {}; // Return empty object when no date is selected
}
}}
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
disabled={existingSlots.length > 0 && slotExists(startTime, endTime)}
disabledTime={(time) => {
if (selectedDate) {
const selectedEndTime = moment(selectedDate).set('hour', time.hour).set('minute', time.minute);
const matchingSlot = disabledTimes.find(
  (slot) =>
    selectedEndTime.isSame(slot.endTime) ||
    (selectedEndTime.isAfter(slot.endTime) && selectedEndTime.isBefore(slot.endTime))
);
if (matchingSlot) {
  return {
    disabledHours: () => [time.hour],
    disabledMinutes: () => [time.minute],
  };
} else {
  return {}; // Return empty object to enable all hours and minutes
}
} else {
return {}; // Return empty object when no date is selected
}
}}
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
    Create Slot
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

export default CreateSlotForm;





