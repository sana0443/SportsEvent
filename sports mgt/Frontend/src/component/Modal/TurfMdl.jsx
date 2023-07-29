import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { bookSlot } from '../../Redux/bookingSlice';
import { useNavigate } from 'react-router-dom';
import PaymentSuccess from '../pages/Payment_success';



function TurfMdl({ onClose, slot, details,turfId ,bookedSlots }) {

  const [success, setSuccess] = useState(false); 
    const navigate=useNavigate()
    const dispatch=useDispatch()
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') {
      onClose();
    }
  };

  const handleSuccess = () => {
    setSuccess(true);
  };
  const isSlotBooked = (startTime) => {
    return bookedSlots.some((slot) => moment(slot.start_time).format('HH:mm') === startTime);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedDate,'dt+++++', selectedPrice,'pri+++', selectedTime,'tim++++', turfId,'hereeeeettttttttttttt');
    dispatch(bookSlot({date:selectedDate,price:selectedPrice,slot:selectedTime,turf_id:turfId,end_time: selectedEndTime, }))
    navigate("/booking");
  };


  console.log(turfId,'turfidyaaaaaaaaaaaaa');
  const handleDateChange = (date) => {
    console.log(date,"date---------");
    setSelectedDate(moment(date.$d));
    
    // const time= slot.filter(item=>{
    //     if (item.start_time===date){
    //         console.log(item.date)
    //     }
    // })
  };

  const disabledDate = (current) => {
    const startDates = slot.map((item) => moment(item.start_time).startOf('day'));

    if (current && current.isBefore(moment().startOf('day'))) {
      return true;
    }

    for (let startDate of startDates) {
      if (current && current.isSame(startDate, 'day')) {
        return false; // Enable the start date
      }
    }

    // const currentMoment = moment(current).startOf('day'); // Convert current to a moment object

    // for (let i = 0; i < startDates.length; i++) {
    //   if (currentMoment.isBetween(startTime[i], endTime[i], null, '[)')) {
    //     return true; // Disable the date if there is a slot already booked on that day
    //   }
    // }

    return true; // Disable all dates except the start dates
  };
  const handleTimeClick = (startTime, endTime, price) => {
    setSelectedTime(startTime);
    setSelectedEndTime(endTime);
    setSelectedPrice(price);
  };
  
const adjustTime = (time) => moment(time).subtract(5, 'hours').subtract(30, 'minutes').format('HH:mm');


const filteredSlots = slot.filter((slot) => {
    const slotDate = moment(slot?.start_time)?.startOf('day');
    const endDate=moment(slot?.end_time)?.startOf('day');
  const selectedDateObj = selectedDate ? moment(selectedDate)?.startOf('day') : null;

  // Compare the date parts of slotDate and selectedDateObj
  const isSameDate = slotDate?.isSame(selectedDateObj, 'day');
  const isSameEndDate=endDate?.isSame(selectedDateObj,'day');

  return isSameDate,isSameEndDate;
  });

  console.log(filteredSlots?.start_time ," " ,filteredSlots );
// let time =filteredSlots && moment(filteredSlots[0]?.start_time).format('HH:mm');
const times = filteredSlots.map((item) => moment(item.start_time).format('HH:mm'));
const end=filteredSlots.map((item)=>moment(item.end_time).format('HH:mm'));
const prices=filteredSlots.map((item)=>(item.price))

console.log(times,end,'timeeeeeeeeeeeee');

return (
  <div>
      {success && <PaymentSuccess slotTime={selectedTime} />}
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
          <DatePicker disabledDate={disabledDate} value={selectedDate} onChange={handleDateChange} />
          {selectedDate && (
  <ul className="mt-4">
    {times.map((startTime, index) => {
      const startMoment = moment(startTime, 'HH:mm'); // Convert startTime string to moment object
      const endMoment = moment(end[index], 'HH:mm'); // Convert endTime string to moment object
      const adjustedStartTime = adjustTime(startMoment); // Adjusted start time
      const adjustedEndTime = adjustTime(endMoment); // Adjusted end time
      const price = prices[index];

      return (
        <li
          key={startTime}
          className={`time-card ${
            selectedTime === startTime ? 'selected bg-blue-500 text-white' : 'bg-white text-gray-800'
          }`}
          onClick={() => !isSlotBooked(startTime) && handleTimeClick(startTime, end[index], price)}
          disabled={isSlotBooked(startTime)}
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold">{adjustedStartTime}</span> {/* Display adjusted start time */}
            {isSlotBooked(startTime) ? (
              <span className="text-red-500">Booked</span>
            ) : (
              <span className="text-green-500">Available</span>
            )}
          </div>
          <div>
            <span className="text-xs">{adjustedEndTime}</span> {/* Display adjusted end time */}
          </div>
          <div>
            <span className="text-xs">Price: {price}</span>
          </div>
        </li>
      );
    })}
  </ul>
)}
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            color="blue"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            icononly={false}
            onClick={handleFormSubmit}
            disabled={!selectedTime || isSlotBooked(selectedTime)}
          >
            Book Slot
          </Button>
        </div>
      </div>
    </div>
  </div>
);
}

export default TurfMdl;
