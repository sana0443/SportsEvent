import React, { useState } from 'react';
import { toast} from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert';
import BaseUrl from '../../BaseUrl';


function RegistrationForm() {
  const { tournamentId } = useParams();
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [ageError, setAgeError] = useState(false);
  const [playerErrors, setPlayerErrors] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  const [captain, setCaptain] = useState({
    name: '',
    age: '',
    position: '',
  });

    const navigate=useNavigate();

  const [players, setPlayers] = useState([]);

  function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }

  const addPlayer = () => {
    const newPlayer = { name: '', age: '', position: '', additionalInfo: '' };

    const isDuplicate = players.some((player) =>
    player.name === newPlayer.name && player.age === newPlayer.age && player.position === newPlayer.position
  );

  if (isDuplicate) {
    toast.error('Duplicate player found. Please enter unique player details.');
    return;
  }
    if (players.length < 7) {
      setPlayers([...players, { name: '', age: '', position: '', additionalInfo: '' }]);
    }
  };

  const removePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  const handleInputChange = (event) => {
    if (event.target.name === 'team_name') {
      setTeamName(event.target.value);
    } else if (event.target.name === 'team_logo') {
      setTeamLogo(event.target.files[0]);
    } else {
      const { name, value } = event.target;
      setCaptain((prevCaptain) => ({
        ...prevCaptain,
        [name]: value,
      }));
    }
  };
  

  const isPlayerDuplicate = (name, age, position) => {
    return players.some((player) => player.name === name && player.age === age && player.position === position);
  };
  
  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[index];
    currentPlayer[field] = value;
    setPlayers(updatedPlayers);

    if (field === 'name' || field === 'age' || field === 'position') {
      const isDuplicate = players.some((player, i) => {
        if (i === index) return false; // Skip comparing with the current player

        return (
          player.name === currentPlayer.name &&
          player.age === currentPlayer.age &&
          player.position === currentPlayer.position
        );
      });

      if (isDuplicate) {
        toast.error('Duplicate player found. Please enter unique player details.');
      }
    }

    if (field === 'age') {
      const age = parseInt(value);
      if (age < 0) {
        // Handle negative age
        toast.error('Age cannot be negative');
        setPlayerErrors((prevErrors) => ({ ...prevErrors, [index]: true }));
      } else if (age < 21 || age > 35) {
       
        setPlayerErrors((prevErrors) => ({ ...prevErrors, [index]: true }));
      } else {
        setPlayerErrors((prevErrors) => ({ ...prevErrors, [index]: false }));
      }
    }
  };

  console.log(players,"playerrrrrrrrrrrrrrrrrrrr");
  const handleSubmit = async (e, selectedTournament) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('team_name', teamName);
    formData.append('team_logo', teamLogo);
    formData.append('captain_name', captain.name);
    formData.append('captain_age', captain.age);
    formData.append('captain_position', captain.position);
    const user_id = localStorage.getItem('token');
    formData.append('user', user_id);
  
    players.forEach((player, index) => {
      formData.append(`players[${index}][name]`, player.name);
      formData.append(`players[${index}][age]`, player.age);
      formData.append(`players[${index}][position]`, player.position);
      formData.append(`players[${index}][additional_info]`, player.additionalInfo);
    });


    const handleBooking = async () => {
      try {
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
  
          // Rest of the function...
        } else {
          throw new Error('Booking failed');
        }
      } catch (error) {
        console.error('Booking failed:', error);
        // Handle booking failure
      }
    };
  
    // Add CSRF token to headers
    const csrftoken = getCookie('csrftoken');
    const headers = {
      'X-CSRFToken': csrftoken,
    };
  
    try {
      const response = await fetch(BaseUrl+'/Tournament/teams/create/', {
        method: 'POST',
        body: formData,
        headers: headers,
      });
  
      if (response.ok) {
        // Team created successfully
        const teamData = await response.json();
        setTeamData(teamData);
  
        if (!teamData.id) {
          throw new Error('Invalid team ID');
        }
  
        const teamId = teamData.id;
  
        // Create players
        const playerResponses = await Promise.all(
          players.map((player) => {
            const playerFormData = new FormData();
            playerFormData.append('name', player.name);
            playerFormData.append('age', player.age);
            playerFormData.append('position', player.position);
            playerFormData.append('additional_info', player.additionalInfo);
            playerFormData.append('team', teamId);
  
            return fetch(BaseUrl+'/Tournament/players/create/', {
              method: 'POST',
              body: playerFormData,
              headers: headers,
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Error creating player: ${response.status} ${response.statusText}`);
                }
                return response.json();


              })
              .then((data) => {
                return data;
              })
              .catch((error) => {
                console.error('Error creating player:', error);
                return { error };
              });
          })
        );
  
        const playerCreationErrors = playerResponses
          .map((playerResponse, index) => {
            if (playerResponse.error) {
              console.log(playerResponse.error);
              return `Error creating player ${index + 1}`;
            }
            return null;
          })
          .filter((error) => error !== null);
  
        if (playerCreationErrors.length === 0) {
          console.log('Registration successful');
          toast.success('Registartion successfull')
          handleBooking();

          Swal({
        title: 'Registration Successful',
        text: `Team ${teamName} has been successfully registered!,we'll be in touch shortly!`,
        icon: 'success',
        button: 'OK',
      }).then(() => {
        // Redirect to the home page or any other desired route after the user clicks OK on the popup.
        navigate('/');
      });
          
        } else {
          console.error('Player creation errors:', playerCreationErrors);
        }
      } else {
        console.error('Error creating team');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  const isSubmitVisible = players.length >= 7;
  return (
    <div className="bg-cover" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1414926110/vector/abstract-modern-circle-light-ring-technology-effect-on-black-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=QQ8vZwm5EizA-rPyGfaRJ775muBArjmMH9wMPk-b7gg=')", minHeight: "100vh" }}>
     <div className="max-w-md mx-auto py-8 text-white">
      <br />
      <br />
      <h2 className="text-2xl font-bold mb-4">Team Registration</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          Team Name:
          <input
            type="text"
            name="team_name"
            value={teamName}
            onChange={handleInputChange}
            required
            className="border border-black text-black px-2 py-1 rounded-md w-full"
          />
        </label>
        <label className="block mb-4">
          Team Logo:
          <input
            type="file"
            name="team_logo"
            accept="image/*"
            onChange={handleInputChange}
            className="border border-black text-black px-2 py-1 rounded-md w-full"
          />
        </label>
        <h3 className="text-lg font-bold mb-2">Captain Details</h3>
        <label className="block mb-4">
          Name:
          <input
            type="text"
            name="name"
            value={captain.name}
            onChange={handleInputChange}
            required
            className="border border-black text-black px-2 py-1 rounded-md w-full"
          />
        </label>
        <label className="block mb-4">
          Age:
          <input
            type="number"
            name="age"
            value={captain.age}
            onChange={handleInputChange}
            required
            className="border border-black text-black px-2 py-1 rounded-md w-full"
          />
        </label>
        <label className="block mb-4">
          Position:
          <input
            type="text"
            name="position"
            value={captain.position}
            onChange={handleInputChange}
            required
            className="border border-black text-black px-2 py-1 rounded-md w-full"
          />
        </label>
        <h3 className="text-lg font-bold mb-2">Players</h3>
        {players.map((player, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-md font-bold mb-2">Player {index + 1}</h4>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={player.name}
                onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                required
                className="border border-black text-black px-2 py-1 rounded-md w-full"
              />
            </label>
            <label className="block mb-2">
              Age:
              <input
                type="number"
                value={player.age}
                onChange={(e) => handlePlayerChange(index, 'age', e.target.value)}
                required
                className={`border border-black text-black px-2 py-1 rounded-md w-full ${
                  playerErrors[index] ? 'border-red-500' : ''
                }`}
              />
              {playerErrors[index] && (
                <p className="text-red-500">Age should be between 21 and 35</p>
              )}
            </label>
            <label className="block mb-2">
              Position:
              <input
                type="text"
                value={player.position}
                onChange={(e) => handlePlayerChange(index, 'position', e.target.value)}
                required
                className="border border-black text-black px-2 py-1 rounded-md w-full"
              />
            </label>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removePlayer(index)}
                className="text-red-500 underline"
              >
                Remove Player
              </button>
            )}
          </div>
        ))}
        {players.length < 7 && (
          <button
            type="button"
            onClick={addPlayer}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          >
            Add Player
          </button>
        )}
         {isSubmitVisible && (
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          )}
      </form>
    </div>
    </div>
  );
}

export default RegistrationForm;
