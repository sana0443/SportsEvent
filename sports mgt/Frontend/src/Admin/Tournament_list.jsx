import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import BaseUrl from '../BaseUrl';

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(localStorage.getItem('currentPage')) || 1);
  const [perPage, setPerPage] = useState(parseInt(localStorage.getItem('perPage')) || 1);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  const [filteredTournaments, setFilteredTournaments] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tournamentId = queryParams.get('id');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('perPage', perPage.toString());
  }, [perPage]);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    // Fetch tournaments data from the API
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(BaseUrl+'/Tournament/list/');
      setTournaments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (tournamentId) => {
    navigate(`/edit/${tournamentId}`);
    console.log(`Edit tournament with ID: ${tournamentId}`);
  };

  const handleDelete = async (tournamentId) => {
    console.log(`Delete tournament with ID: ${tournamentId}`);
    try {
      await axios.get(BaseUrl+`/AdminSide/delete/${tournamentId}/`);
      fetchTournaments();
      toast.success('Tournament deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    filterTournaments();
  }, [searchTerm, tournaments]);

  const filterTournaments = () => {
    const filtered = tournaments.filter(
      (tournament) =>
        tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.event_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTournaments(filtered);
  };

  // Pagination Logic
  const indexOfLastTournament = currentPage * perPage;
  const indexOfFirstTournament = indexOfLastTournament - perPage;
  const currentTournaments = filteredTournaments.slice(indexOfFirstTournament, indexOfLastTournament);

  const totalPages = Math.ceil(filteredTournaments.length / perPage);
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
            <div className="flex-1 flex flex-col items-center justify-center">
            <div className="mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search by title or event name..."
                  className="px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <h1 className="text-2xl font-semibold mb-4">Tournament List</h1>
            
              {currentTournaments.length === 0 ? (
                <p>No tournaments available.</p>
              ) : (
                <>
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b font-semibold text-left">Title</th>
                        <th className="py-2 px-4 border-b font-semibold text-left">Event Name</th>
                        <th className="py-2 px-4 border-b font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTournaments.map((tournament) => (
                        <tr key={tournament.id}>
                          <td className="py-2 px-4 border-b">{tournament.title}</td>
                          <td className="py-2 px-4 border-b">{tournament.event_name}</td>
                          <td className="py-2 px-4 border-b text-right">
                            <button
                              className="text-blue-500 hover:text-blue-700 mr-2"
                              onClick={() => handleEdit(tournament.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDelete(tournament.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <ul className="flex mt-4">
                    {pageNumbers.map((number) => (
                      <li
                        key={number}
                        className={`mr-2 px-3 py-2 rounded-md cursor-pointer ${
                          number === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
                        }`}
                        onClick={() => handlePageChange(number)}
                      >
                        {number}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TournamentList;
