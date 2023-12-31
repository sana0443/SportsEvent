import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BaseUrl from '../../BaseUrl';
import { Button } from 'antd';
import axios from 'axios';

function TournamentDetailsPage() {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    fetchTournamentDetails();
  }, []);

  const fetchTournamentDetails = async () => {
    try {
      const response = await axios(BaseUrl + `/Tournament/Tournament/detail/${tournamentId}/`);
      console.log(response.data);
      setTournament(response.data);
      if (response.ok) {
        console.log("success");
        
      } else {
        throw new Error('Error fetching tournament details');
      }
    } catch (error) {
      console.error('Error fetching tournament details:', error);
      // Handle the error
    }
  };

  if (!tournament) {
    return <div>Loading...</div>;
  }
  const backgroundImage = 'url("https://www.monaco.edu/app/uploads/sites/4/2021/07/Sports_Management.jpg")';

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative"
      style={{ backgroundImage: backgroundImage, backgroundSize: 'cover' }}
    >
      <div className="bg-white max-w-lg mx-auto p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">{tournament.title}</h1>
        <img src={tournament.image} alt={tournament.title} className="w-full h-auto mb-6 rounded-lg shadow-lg" />
        <p className="text-lg mb-6 text-gray-700">{tournament.description}</p>
        <p className="text-md text-gray-700">Registration Deadline: {tournament.registration_deadline}</p>
        <div className="mt-6 ">
          <Link
            to={{
              pathname: `/registration/${tournamentId}`,
              state: { tournament: tournament }
            }}
          >
            <Button className='bg-blue-400 text-white' size="large">Register</Button>
          </Link>
        </div>

        {/* Extra comments or terms and conditions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
          <h5>Participants must bring their own sports equipment.<br/>Participants must bring their own sports equipment.
          <br/>Check-in time is 30 minutes before the tournament starts.<br/>Players are required to wear proper sports attire.
          <br/>Matches will be played in a best-of-three format.  <br/>No substitutions allowed after the tournament begins.
          <br/>Players must adhere to fair play and sportsmanship.
          </h5>
        

        
       
         
        </div>

      </div>
    </div>
  );
}

export default TournamentDetailsPage;
