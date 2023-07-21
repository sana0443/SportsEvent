import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import BaseUrl from '../BaseUrl';

const AdminDashboard = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    axios.get(BaseUrl+'AdminSide/bookedSlots/')
      .then((response) => {
        setRevenueData(response.data);
        console.log(response.data, '----------');
      })
      .catch((error) => {
        console.error('Failed to fetch booked slots:', error);
      });
  }, []);

  // Calculate revenue from the fetched data
  const calculateRevenue = () => {
    const revenue = revenueData.reduce((totalRevenue, slot) => {
      return totalRevenue + slot.amount;
    }, 0);
    console.log(revenue, 'rrrrrrrr');
    return revenue;
  };

  // Data and options for the revenue graph
  const data = {
    labels: ['Total Revenue'],
    datasets: [
      {
        label: 'Revenue',
        data: [calculateRevenue()],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        id: 'x',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  // Perform revenue calculation only when revenueData is available
  useEffect(() => {
    if (revenueData.length > 0) {
      calculateRevenue();
    }
  }, [revenueData]);

  return (
    <div >
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://media.istockphoto.com/id/1217377601/photo/concrete-floor-and-smoke-background.webp?b=1&s=170667a&w=0&k=20&c=ajtSlLyL-T2cFmBQWzbfvw-E25hfFCLt-aFnRlKOWvY=')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <Sidebar />
            {/* change */}
        
<div className="flex-1 bg-gray-200">
  <div className="p-4">
    <h1 className="text-2xl text-center font-semibold">Welcome to the Admin Dashboard</h1>
  </div>
  <div className="p-4">
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex">
        {/* Total Users */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-gray-600">100</p>
        </div>
        {/* Total Tournaments */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2">Total Tournaments</h2>
          <p className="text-gray-600">12</p>
        </div>
      </div>
    </div>
  </div>
  <div className="p-4">
    {/* Display the revenue graph */}
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Revenue Graph</h2>
      <Bar data={data} options={options} />
    </div>
  </div>
</div>

       
            {/* change */}
          </div>
        </div>
    </section>
     
    </div>
  );
};

export default AdminDashboard;





