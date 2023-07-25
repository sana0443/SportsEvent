import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-full md:w-1/5 bg-gray-900 text-white rounded-2xl">
      <div className="p-4">
        <h1
          href="/teams"
          className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          Logout
        </h1>
      </div>
      <div className="p-4">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>
      <nav className="py-4">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/admindsbd" className="block">
              Dashboard
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/userlist" className="block">
              Users
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/create_tournament" className="block">
              Create A Tournament
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/tournaments" className="block">
              Tournaments
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/team" className="block">
              Team
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/createSlot" className="block">
              Create Slot
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/slotz" className="block">
              Slots
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/booked" className="block">
              Booked Slots
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
