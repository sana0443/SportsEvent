import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bookSlot } from '../../Redux/bookingSlice';
import BaseUrl from '../../BaseUrl';




function Payment() {
   
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem('token');
  const [slotId, setSlotId] = useState('');
  const [amount, setAmount] = useState('');
  const [names, setName] = useState('');
  const {date,price,slot,end_time,turf_id}=useSelector((state)=>state.booking)
    
 
  const name = location.state?.name;
  const phoneNumber= location.state?.phoneNumber;

  const dispatch=useDispatch();

  useEffect(() => {
    setSlotId(location.state?.turf_id);
    console.log(price,'pric ehere');
    console.log(turf_id,'turf ehere');
    console.log(slot,'slot ehere');
    console.log(end_time,'end here');
    console.log(date,'dated');
    console.log(name,phoneNumber,'bjhbjni');
    

    setAmount(location.state?.amount);
    setName(location.state?.name);
  }, [location.state]);

  const handlePaymentSuccess = async (response) => {

    const order_id = response.razorpay_payment_id; // Use razorpay_payment_id as the order ID
    console.log(order_id,'-yyy');
    dispatch(bookSlot({ order_id,name,phoneNumber }));
    try {
      const bodyData = new FormData();
      bodyData.append('response', JSON.stringify(response));

      await axios.post(BaseUrl+'slots/handle_payment_success/', bodyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSlotId('');
      setAmount('');
      navigate('/success', { state: {  turf_id: turf_id, start: slot, end: end_time,amount:price,date:date } });
    } catch (error) {
      console.log(error);
    }
  };

  const showRazorpay = async () => {
    try {
      const bodyData = new FormData();
      bodyData.append('price', price);
      bodyData.append('turf_id', turf_id);
      bodyData.append('date', date);
      bodyData.append('start_time', slot);
      bodyData.append('end_time', end_time);

      
    //   bodyData.append('student_id', studentId);
    console.log(bodyData,'bodyyyyyyy');
   
    console.log(price);
     const response = await axios.post(BaseUrl+`slots/start_payment/${turf_id}/`, bodyData, {
  headers: {
    'Content-Type': 'application/json',
  },
});


      const options = {
        key: 'rzp_test_k6Ms2BWCn74AHT', // Replace with your Razorpay API key
        amount: price *100,
        currency: 'INR',
        name: 'Sports',
        description: 'Test transaction',
        image: '', // Add image URL
        order_id: response.data.id,
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: 'User\'s name',
        //   email: 'User\'s email',
          contact: 'User\'s phone',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

 

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };
 


  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h1 className="text-2xl font-bold mb-4">Summary</h1>
      <div className="mb-4">
        <span className="font-bold">Slot: {turf_id} - </span>
        <span>{slot}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Date:Time: </span>
        <span>{date}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Price: </span>
        <span>{price}</span>
      </div>
      <button
  onClick={showRazorpay}
  className="block w-6/8 py-2 px-4 mt-4 bg-purple-500 text-white rounded-md hover:bg-purple-600"
>
  Pay with Razorpay
</button>

    </div>
  </div>
);
}

export default Payment;
