import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import BaseUrl from '../../BaseUrl';

function PaymentSuccess() {
  const location = useLocation();  // Use 'location' instead of 'state'
  const { order_id,  name,phoneNumber} = useSelector((state) => state.booking);


  const slot = location.state?.start;
  const end = location.state?.end;
  const price = location.state?.amount;
  const turf_id = location.state?.turf_id;
  const date=location.state?.date
  const user=localStorage.getItem('token')

  console.log(slot, 'slotttttuu');
  console.log(end, 'endddddddddd');
  console.log(turf_id, 'turfeeeee');
  console.log(price, 'priceeeeee');
  console.log(date,'dateeeee');
  console.log(name, phoneNumber);

  useEffect(() => {
    const storeBookingDetails = async () => {
      try {
        const slotData = {
          turf: turf_id,
          is_available:false,
          
          price: price,
          start_time: moment(slot, 'HH:mm').format(), // Convert to ISO 8601 format
          end_time: moment(end, 'HH:mm').format(),
        };
    
        const bookingData = {
          name: name,
          phone_number: phoneNumber,
          amount: price,
          is_paid: true,
          order_id: order_id,
          slot: slotData,
          user:user
        };
    
        const response = await axios.post(BaseUrl+'/slots/booking/', bookingData);
    
        console.log('Booking details stored successfully:', response.data);
      } catch (error) {
        console.error('Error storing booking details:', error);
      }
    };
    

    storeBookingDetails();
  }, [date, price, slot, turf_id, name, phoneNumber, order_id]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center rounded-full bg-green-500 w-16 h-16">
          <i className="text-white text-4xl">✓</i>
        </div>
        <h1 className="text-3xl font-bold mt-4">Success</h1>
        <p className="text-lg mt-2">
          We received your purchase request; we'll be in touch shortly!
        </p>
        <Link
          to={`/`}
          className="btn btn-outline-success btn-lg mt-4 px-6 py-3 rounded-md text-lg font-medium hover:bg-green-500 hover:text-white transition-colors duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
