import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { bookSlot } from '../../Redux/bookingSlice';
import { useNavigate } from 'react-router-dom';
import PaymentSuccess from '../pages/Payment_success';


function TurfMdl({ onClose, slot, details,turfId ,bookedSlots }) {
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
        <PaymentSuccess slotTime={selectedTime} />
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
            <DatePicker disabledDate={disabledDate} value={selectedDate} onChange={handleDateChange} />
            {selectedDate && (
   <ul>
{times.map((startTime, index) => (
  <li
    key={startTime}
    className={`time-card ${selectedTime === startTime ? 'selected' : ''}`}
    style={{  backgroundColor: selectedTime === startTime ? '#f2f2f2' : 'transparent', }}
    onClick={() => !isSlotBooked(startTime) && handleTimeClick(startTime, end[index], prices[index])}
    disabled={isSlotBooked(startTime)} // Disable the slot if it's booked
  >
    {startTime}-{end[index]}--{prices[index]}
  </li>
))}

 </ul>
)}





<Button type="button" onClick={handleFormSubmit} disabled={!selectedTime}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurfMdl;
