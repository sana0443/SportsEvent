import React, { useState, useEffect } from "react";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { MailIcon, UserCircleIcon, PhoneIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileUpdateMdl from "../Modal/ProfileUpdateMdl";
import BaseUrl from "../../BaseUrl";


export function Profile() {
  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useState({});
  const [teamData, setTeamData] = useState(null);
  const [playerData, setPlayerData] = useState([]);
  const image = {url:("/src/image/profileImage.jpg")}
 

  const navigate = useNavigate();

  const user_id = localStorage.getItem("token");

  useEffect(() => {
    if (user_id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(BaseUrl+"account/userdata", {
            params: {
              user_id: user_id,
            },
          });
          console.log(response.data,'ddddddddddddd');
          setUserData(response.data);
          // if (response.data.tournament_id) {
          //   // Fetch tournament data using the tournament_id
          //   const tournamentResponse = await axios.get(
          //     `${BaseUrl}tournaments/${response.data.tournament_id}`
          //   );
          //   // setTournamentData(tournamentResponse.data);
          // } else {
          //   // If the user is not registered for a tournament, set tournamentData to null
          //   // setTournamentData(null);
          // }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    } else {
      navigate("/login");
    }
  }, [user_id, navigate]);

  const closeModal = () => {
    setModal(false);
  };

  const openModal = (profile) => {
    setProfile(profile);
    setModal(true);
  };

  const handleProfileUpdate = async () => {
    
    try {
      const response = await axios.get(BaseUrl+'account/userdata', {
        params: {
          user_id: user_id,
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching updated user data:', error);
    }
  };


  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Fetch team data using the user_id (replace 'user_id' with the actual user ID)
        const user_id = localStorage.getItem("token");
        const teamResponse = await axios.get(BaseUrl+`Tournament/team-data/${user_id}/`);
        console.log(teamResponse,'dddddd');
        setTeamData(teamResponse.data);
        console.log(teamData,'teaaaaa');
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    const fetchPlayerData = async () => {
      try {
        // Fetch player data using the user_id (replace 'user_id' with the actual user ID)
        const user_id = localStorage.getItem("token");
        console.log(user_id);
        const playerResponse = await axios.get(BaseUrl+`Tournament/player-data/${user_id}/`);
        console.log(playerResponse,'at-------------');
        setPlayerData(playerResponse.data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    // Call the functions to fetch team and player data
    fetchTeamData();
    fetchPlayerData();
  }, []);

  
  





  
  

  return (
    <>
      <ProfileUpdateMdl isVisible={modal} onClose={closeModal} profilee={user_id}  onProfileUpdate={handleProfileUpdate}  />
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://media.istockphoto.com/id/1217377601/photo/concrete-floor-and-smoke-background.webp?b=1&s=170667a&w=0&k=20&c=ajtSlLyL-T2cFmBQWzbfvw-E25hfFCLt-aFnRlKOWvY=')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                    <Avatar
                      src={userData.photo ? `${BaseUrl}${userData.photo}` :image.url }
                    alt="Profile picture"
                    variant="circular"
                    className="h-40 w-40 mt-4 mx-auto object-cover rounded-full"

                  />
                   </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0"
                      
                    />
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <Button className="bg-blue-400" onClick={() => openModal(userData)}>Update</Button>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        {/* Update */}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {/* the profile */}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {userData.full_name}
                </Typography>
                <div className="mb-16 flex items-center justify-center gap-2">
                  <MailIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    {userData.email}
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <PhoneIcon  className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    {userData.phone_number}
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <UserCircleIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    {userData.age}
                  </Typography>
                </div>
              </div>
              <div className="mb-10 border-t border-blue-gray-50 py-6 text-center">
        <div className="mt-2 flex flex-wrap justify-center">
          <div className="flex w-full flex-col font-semibold items-center px-4 lg:w-9/12">
          {teamData && teamData.length > 0 && (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">Team Details</h2>
    <p className="text-lg font-semibold">Team Name: {teamData[0].team_name}</p>
    <img
      src={teamData[0].logo ? `${BaseUrl}${teamData[0].logo}` : 'placeholder_image_url'}
      alt="Team Logo"
      className="h-20 w-20 mt-4 mx-auto object-cover rounded-full"
    />
  </div>
)}

{playerData.length > 0 && (
    <div>
      <h2 className="text-2xl font-bold mb-4">Player Details</h2>
      <div className="grid grid-cols-7 gap-4 justify-center">
        {/* Render players in each line */}
        {playerData.map((player) => (
          <div key={player.id} className="p-4 border rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Name: {player.name}</p>
            <p className="text-lg font-semibold">Age: {player.age}</p>
            <p className="text-lg font-semibold">Position: {player.position}</p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
        </div>
      </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Profile;
