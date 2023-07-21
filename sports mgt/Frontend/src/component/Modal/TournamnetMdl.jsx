import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@material-tailwind/react";

function TournamentMdl({ isVisible, onClose, tournament ,tournamentId}) {
  if (!isVisible || !tournament) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  return (
    <div>
      <div
        id="wrapper"
        className="absolute inset-0 bg-black bg-opacity-25 z-10 backdrop-blur-sm w-full h-full flex justify-center items-center"
        onClick={handleClose}
      >
        <div className="w-[900px] flex flex-col overflow-y-auto h-[600px]">
          <button
            className="text-white text-xl place-self-end"
            onClick={() => {
              onClose();
            }}
          >
            x
          </button>
          <div className="bg-white p-1 rounded-lg overflow-y-auto">
            <h1>{tournament.title}</h1>
            <p>{tournament.description}</p>
            <Link to={`/registration/${tournamentId}`}>
                <Button>Register</Button>
            </Link>
            {/* Render other tournament information */}
            {/* <RegistrationForm /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TournamentMdl;