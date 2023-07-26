import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import BaseUrl from '../BaseUrl';
import axios from 'axios';
const { localStorage } = window;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem('currentPage')) || 1
  );
  const [perPage, setPerPage] = useState(parseInt(localStorage.getItem('perPage')) || 2);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('perPage', perPage.toString());
  }, [perPage]);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  const fetchUserList = () => {
    fetch(BaseUrl+'/AdminSide/userlist')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const filterUsers = () => {
    const filtered = users.filter((user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const unblockUser = (email) => {
    if (!email) {
      console.error('Invalid userId');
      return;
    }

    axios
      .post(BaseUrl+"/AdminSide/userBlock/", {
        email: email
      })
      .then((response) => {
        console.log(response.data,'-------------------');
      })
      .then((data) => {
        console.log('User unblocked:', data);
        toast.success('Successfully unblocked');
        fetchUserList();
      })
      .catch((error) => {
        console.error('Error unblocking user:', error);
      });
  };

  const renderUsers = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    return currentUsers.map((user, index) => (
      <tr
        key={user.id}
        className="bg-white border-b text-gray-700 dark:bg-white dark:border-white hover:bg-gray-50 dark:hover:bg-white"
      >
        <td className="px-6 py-4">{startIndex + index + 1}</td>
        <td className="px-6 py-4">{user.full_name}</td>
        <td className="px-6 py-4">{user.age}</td>
        <td className="px-6 py-4">{user.phone_number}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">
          {user.is_active ? (
            <FaUnlock
              className="text-green-500 cursor-pointer"
              onClick={() => unblockUser(user.email)}
            />
          ) : (
            <FaLock
              className="text-red-500 cursor-pointer"
              onClick={() => unblockUser(user.email)}
            />
          )}
        </td>
      </tr>
    ));
  };

  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
       <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://media.istockphoto.com/id/1217377601/photo/concrete-floor-and-smoke-background.webp?b=1&s=170667a&w=0&k=20&c=ajtSlLyL-T2cFmBQWzbfvw-E25hfFCLt-aFnRlKOWvY=')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <Sidebar />
            <div className="w-full">
              <div className="flex flex-col justify-evenly relative overflow-x-auto shadow-md sm:rounded-lg h-full">
                <div className="flex items-center justify-between px-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Search:</label>
                    <input
                      type="text"
                      className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Per Page:</label>
                    <select
                      className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={perPage}
                      onChange={(e) => setPerPage(parseInt(e.target.value))}
                    >
                      <option value={2}>2</option>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                    </select>
                  </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-white dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Serial No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Full Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Age
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderUsers()}</tbody>
                </table>
                <div className="flex justify-center mt-4">
                  <nav>
                    <ul className="pagination flex">
                      {pageNumbers.map((pageNumber) => (
                        <li
                          key={pageNumber}
                          className={`page-item${currentPage === pageNumber ? ' active' : ''}`}
                        >
                          <button
                            className="flex items-center px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserList;
