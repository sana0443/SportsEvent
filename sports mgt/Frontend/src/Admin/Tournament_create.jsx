import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import { DatePicker } from 'antd';
import moment from 'moment';
import BaseUrl from '../BaseUrl';

const TournamentCreationForm = () => {
  const [eventData, setEventData] = useState({
    event_name: '',
    title: '',
    date: null,
    total_no_of_teams: 0,
    description: '',
    registration_open: false,
    registration_deadline:null,
    available_slots: 0,
    image:''
  });

  const [disabledDates, setDisabledDates] = useState([]);
  const [disabledDeadlineDates, setDisabledDeadlineDates] = useState([]);

  useEffect(() => {
    fetchDisabledDates();
  }, []);

  const fetchDisabledDates = () => {
    axios
      .get(BaseUrl+'/Tournament/dates/')
      .then((response) => {
        setDisabledDates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const disabledDate = (current) => {
    const formattedDates = disabledDates.map((date) =>
      moment(date).format('YYYY-MM-DD')
    );

     // Disable dates before the current date
  if (current && current.isBefore(moment().startOf('day'))) {
    return true;
  }
    return formattedDates.includes(current.format('YYYY-MM-DD'));
  };


  const disabledDeadlineDate = (current) => {
    const formattedDates = disabledDeadlineDates.map((date) =>
    moment(date).format('YYYY-MM-DD')
  );
    const currentDate = moment().startOf('day');
    // Disable dates before the tournament's creation date
    if (current && current.isAfter(moment(eventData.date, 'YYYY-MM-DD'))) {
      return true;
    }
    return current && current.isBefore(currentDate);
  
  };
  

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setEventData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleDateChange = (date, dateString) => {
    const formattedDates = disabledDates.map((date) =>
      moment(date).format('YYYY-MM-DD')
    );
    
    if (formattedDates.includes(dateString)) {
      console.log('Selected date is disabled.');
      return;
    }
  
    const fieldName = eventData.registration_open ? 'registration_deadline' : 'date';
  
    setEventData((prevData) => ({
      ...prevData,
      [fieldName]: dateString,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventData);
    axios
      .post(BaseUrl+'/Tournament/create/', eventData)
      .then((response) => {
        console.log(response.data);
        viewDetails(response.data);
     
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const viewDetails = (tournamentId) => {
    navigate(`/tournaments?id=${tournamentId}`);
    console.log(tournamentId,'haaaaaaaaaaaaai');
  };
  return (
    <div >
    {/* <div className="bg-gray-200 min-h-screen flex justify-center items-center"> */}
    <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://media.istockphoto.com/id/1217377601/photo/concrete-floor-and-smoke-background.webp?b=1&s=170667a&w=0&k=20&c=ajtSlLyL-T2cFmBQWzbfvw-E25hfFCLt-aFnRlKOWvY=')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <Sidebar />
            {/* change */}
            <div className="max-w-5xl lg:w-1/2 sm:w-full mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl text-center font-semibold mb-4">Create Tournament</h1>
      <form onSubmit={handleSubmit}>
      <div className="flex justify-evenly">
        
          <div className="mb-4 w-5/12">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event_name">
              Event Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="event_name"
              type="text"
              name="event_name"
              value={eventData.event_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 w-5/12">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          
        </div>
        
        
        <div className='flex justify-evenly'>
        <div className="mb-4 w-5/12">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4 w-5/12">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total_no_of_teams">
              Total Number of Teams
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="total_no_of_teams"
              type="number"
              name="total_no_of_teams"
              value={eventData.total_no_of_teams}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className='flex justify-start'>
          <div className="mb-4 w-3/12 ml-10">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Date
            </label>
              <DatePicker
                disabledDate={disabledDate}
                onChange={handleDateChange}
                value={eventData.date ?moment(eventData.date, 'YYYY-MM-DD') : null}
                
              />

          </div>
          <div className="mb-4 w-3/12">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="available_slots">
              Available Slots
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="available_slots"
              type="number"
              name="available_slots"
              value={eventData.available_slots}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 w-3/12 pl-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Tournament Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>


          {eventData.registration_open && (
          <div className="mb-4 pl-10">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registration_deadline">
              Registration Deadline
            </label>
            <DatePicker
            disabledDate={disabledDeadlineDate}
            onChange={handleDateChange}
              value={eventData.registration_deadline ? moment(eventData.registration_deadline, 'YYYY-MM-DD') : null}
            />

          </div>
        )}



        </div>

        <div className="mb-4 pl-10">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registration_open">
            Registration Open
          </label>
          <input
            className="mr-2 leading-tight"
            id="registration_open"
            type="checkbox"
            name="registration_open"
            checked={eventData.registration_open}
            onChange={handleChange}
          />
          <span className="text-gray-700">Allow registration for this tournament</span>
        </div>
        
        
        <div className="flex justify-center pt-10">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Tournament
          </button>
        </div>
      </form>
    </div>

           
            {/* change */}
          </div>
        </div>
    </section>
    
    </div>
  );
};

export default TournamentCreationForm;







