import React, { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";

import { format } from 'date-fns';
import BaseUrl from '../../BaseUrl';
import { Link } from 'react-router-dom';

function ShowTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await fetch(BaseUrl + '/Tournament/list/');

      if (response.ok) {
        const data = await response.json();
        setTournaments(data);
      } else {
        throw new Error('Error fetching tournaments');
      }
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      setError(error.message);
    }
  };



 

 

  if (error) {
    return <div>Error: {error}</div>;
  }

  const backgroundImage = "url('https://t4.ftcdn.net/jpg/01/36/03/77/360_F_136037708_jaqEW7Qr7uZ2uynTURhQe9N0LDGkgbxG.jpg')";

  return (
    <>
      
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://cdn.wallpapersafari.com/92/33/RBQfUk.jpg')] bg-cover bg-center" />
        <h2 className="text-3xl font-bold text-white text-center absolute inset-x-0 top-36 transform -translate-y-1/2">Upcoming Tournaments</h2>
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
      <div className="container mx-auto flex justify-center">
          <div className="r relative mb-6 -mt-64 flex justify-center w-full min-w-0 break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
           
            {/* change */}
         
<div className="py-8">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
  
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {tournaments.map((tournament) => (
        <div key={tournament.id} className="bg-gray-200 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2 text-center">{tournament.title}</h3>
          <p className="text-gray-700 mb-2 text-center">{tournament.event_name}</p>
          <p className="text-gray-700 mb-2 text-center">{format(new Date(tournament.date), 'MMMM d')}</p>
          {/* <div className="flex items-center justify-center">
            {tournament.available_slots === 0 ? (
              <p className="text-red-500 font-semibold">Booking Filled</p>
            ) : (
              <p className="text-green-500 font-semibold">{tournament.available_slots} Slots Remaining</p>
            )}
          </div> */}
          <div className="flex items-center justify-center mt-4">
            <Link to={`/tournamentdetails/${tournament.id}`} className="text-black font-semibold ">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
</div>

            
            {/* change */}
          </div>
    
    </section>
     
    </>
  );
}


export default ShowTournaments;



