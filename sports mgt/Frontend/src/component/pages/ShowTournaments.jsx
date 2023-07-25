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

  const openModal = (tournament) => {
    setSelectedTournament(tournament);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleBooking = async () => {
    try {
      // Simulate booking by making an API call to the backend
      const response = await fetch(BaseUrl + '/Tournament/book/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tournamentId: selectedTournament.id }),
      }); 

      if (response.ok) {
        // Update the available slots on the frontend after successful booking
        const updatedTournaments = tournaments.map((tournament) =>
          tournament.id === selectedTournament.id
            ? { ...tournament, available_slots: tournament.available_slots - 1 }
            : tournament
        );
        setTournaments(updatedTournaments);
        closeModal();
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Booking failed:', error);
      // Handle booking failure
    }
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
                  <p className="text-gray-700 mb-2">Available Slots: {tournament.available_slots}</p>
                  {tournament.available_slots === 0 ? (
                    <p className="text-red-500">Booking Filled</p>
                  ) : (
                    <p className="text-green-500">{tournament.available_slots} Slots Remaining</p>
                  )}
                  <Button
                    color="blue"
                    size="regular"
                    onClick={() => openModal(tournament)}
                  >
                    View the details
                  </Button>
                 
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
