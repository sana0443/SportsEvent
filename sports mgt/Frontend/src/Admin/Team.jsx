import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import BaseUrl from '../BaseUrl';

function Team() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch the teams data from the server
    fetchTeams();
  }, []);
  const viewDetails = (teamid) => {
    navigate(`/teamdetails?id=${teamid}`);
    
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch(BaseUrl+'/Tournament/team/');
      if (response.ok) {
        const teamsData = await response.json();
        setTeams(teamsData);
      } else {
        console.error('Error fetching teams');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <>
     <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://media.istockphoto.com/id/1217377601/photo/concrete-floor-and-smoke-background.webp?b=1&s=170667a&w=0&k=20&c=ajtSlLyL-T2cFmBQWzbfvw-E25hfFCLt-aFnRlKOWvY=')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <Sidebar />
            {/* change */}
            <div className=" min-h-screen flex w-2/3 ml-20">
              <div className="m-4 w-full">
                <br />
                <br />
                <br />
                <h2 className="text-3xl pb-7 mb-4 text-center font-black">Registered Teams</h2>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-xl font-black pb-5">Team Name</th>
                        <th className="px-4 py-2 text-xl font-black pb-5">Team Logo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team) => (
                      <tr key={team.id}>
                        <td className="border px-4 py-2">
                          <Link to={`/teamdetails/${team.id}`} className="text-black hover:underline">
                            {team.team_name}
                          </Link>

                        </td>
                        <td className="border px-4 py-2">
                          <Link to="#" onClick={() => viewDetails(team.id)}>
                            <img src={`${BaseUrl}${team.logo}`} alt={team.team_name} className="h-10 w-10" />
                          </Link>
                        </td>
                      </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* change */}
          </div>
        </div>
    </section>
    </>
  );
}

export default Team;
