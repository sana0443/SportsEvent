import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-1/5 bg-gray-900 text-white rounded-2xl ">
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
            <a href="/admindsbd" className="block">
              Dashboard
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="/userlist" className="block">
              Users
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="/create_tournament" className="block">
              Create A Tournament
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="tournaments" className="block">
              Tournaments
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="/team" className="block">
              Team
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="/createSlot" className="block">
              Create Slot
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="/slotz" className="block">
              Slots
            </a>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <a href="/booked" className="block">
              Booked Slots
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
