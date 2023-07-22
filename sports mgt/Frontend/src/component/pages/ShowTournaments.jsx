import React, { useState, useEffect } from 'react';

import { Button } from "@material-tailwind/react";


import TournamnetMdl from '../Modal/TournamnetMdl';
import { format } from 'date-fns'; 
import BaseUrl from '../../BaseUrl';


function ShowTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [tournamentId,setTournamentId]=useState(null)


  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await fetch(BaseUrl+'/Tournament/list/');

      if (response.ok) {
        const data = await response.json();
        setTournaments(data);
        setTournamentId(tournaments.id)
        console.log(tournamentId,'hhhhhhhh');
        console.log(data,'------------');
      } else {
        throw new Error('Error fetching tournaments');
      }
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      setError(error.message);
    }
  };


  useEffect(() => {
    console.log('tournamentId:', tournamentId); // Check if tournamentId state updates correctly
  }, [tournamentId]);
  const openModal = (tournament) => {
    setSelectedTournament(tournament);
    setTournamentId(tournament.id);
   
  
    console.log(tournament.id,'----------rrrrrrrrr');
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const backgroundImage = "url('https://t4.ftcdn.net/jpg/01/36/03/77/360_F_136037708_jaqEW7Qr7uZ2uynTURhQe9N0LDGkgbxG.jpg')";
  return (
    <>
      <TournamnetMdl isVisible={modal} onClose={closeModal} tournament={selectedTournament} />
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative" style={{ backgroundImage, backgroundSize: 'cover' }}>
        <div className="py-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">Tournaments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tournaments.map((tournament) => (
                <div key={tournament.id} className="bg-white shadow rounded p-4">
                  <h3 className="text-xl font-bold mb-2">{tournament.title}</h3>
                  <p className="text-gray-700 mb-2">{tournament.event_name}</p>
                  <p className="text-gray-700 mb-2">{format(new Date(tournament.date), 'MMMM d')}</p>
                  {/* Add other tournament information here */}
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => openModal(tournament)}>View the details</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowTournaments;
