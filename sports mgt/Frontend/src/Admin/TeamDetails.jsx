import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import BaseUrl from '../BaseUrl';

function TeamDetails() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const location=useLocation()
const quaryParams=new URLSearchParams(location.search);
const team_id=quaryParams.get('id');
console.log(team_id);

  useEffect(() => {
    // Fetch the team details from the server
    fetchTeamDetails();
  }, []);

  const fetchTeamDetails = async () => {
    try {
      const response = await fetch(BaseUrl+`/Tournament/team/${ teamId}/`);
      if (response.ok) {
        const teamData = await response.json();
        setTeam(teamData); 
        console.log(teamData); // Handle the response data
      } else {
        console.error('Error fetching team details');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  if (!team) {
    return <div>Loading...</div>;
  }
  const captain = team.players[0];

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
            

      <div className="max-w-2xl mx-auto p-8 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">{team.team_name}</h2>
        <p className="text-lg font-semibold">Captain: {captain.name}</p>
        <div className="my-4">
          <img src={`${BaseUrl}${team.logo}`} alt={team.team_name} className="w-40 h-40 object-cover rounded-full" />
        </div>
        <h3 className="text-xl font-bold mb-2">Players:</h3>
        <ul className="list-disc pl-6">
          {team.players.map((player) => (
            <li key={player.id} className="my-2">
              <p className="text-lg font-semibold">Name: {player.name}</p>
              <p>Age: {player.age}</p>
              <p>Position: {player.position}</p>
              {player.additional_info && <p>Additional Info: {player.additional_info}</p>}
            </li>
          ))}
        </ul>
      </div> 
            
            {/* change */}
          </div>
        </div>
    </section>
      
    </div>
  );
}

export default TeamDetails;





