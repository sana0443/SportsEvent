import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Sidebar from './Sidebar';
import BaseUrl from '../BaseUrl';

function BookedSlots() {
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    axios.get(BaseUrl+'/AdminSide/bookedSlots/')
      .then((response) => {
        setBookedSlots(response.data);
        console.log(response.data,'bbbbbbb');
      })
      .catch((error) => {
        console.error('Failed to fetch booked slots:', error);
      });
  }, []);

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
            <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Booked Slots</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Turf Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Time
              </th>
              
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Is Paid
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookedSlots.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.slot ? booking.slot.turf : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                {booking.slot ? moment(booking.slot.start_time).format('YYYY-MM-DD') : '-'}
                </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                {booking.slot ? moment(booking.slot.start_time).format('HH:mm') : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                {booking.slot ? moment(booking.slot.end_time).format('HH:mm') : '-'}
                </td>
              
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.phone_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.is_paid ? 'Yes' : 'No'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.order_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

            {/* change */}
          </div>
        </div>
    </section>
    </div>
  );
}

export default BookedSlots;










