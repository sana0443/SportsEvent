import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import { DatePicker } from 'antd';
import moment from 'moment';
import { toast} from "react-hot-toast";
import BaseUrl from '../BaseUrl';

const TournamentEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [event_name, setEvent_name] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [total_no_of_teams, setTotal_no_of_teams] = useState(0);
  const [registration_open, setRegistration_open] = useState(false);
  const [registration_deadline, setRegistration_deadline] = useState(null);
  const [available_slots, setAvailable_slots] = useState(0);
  const [description, setDescription] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tournament_id = queryParams.get('id');

  const [disabledDates, setDisabledDates] = useState([]);
  const [disabledDeadlineDates, setDisabledDeadlineDates] = useState([]);

  useEffect(() => {
    fetchTournament();
    fetchDisabledDates();
  }, [tournament_id]);

  useEffect(() => {
    // Retrieve form data from local storage
    const storedFormData = localStorage.getItem('tournamentFormData');
    if (storedFormData) {
      const parsedData = JSON.parse(storedFormData);
      setEvent_name(parsedData.event_name);
      setTitle(parsedData.title);
      setDate(parsedData.date);
      setTotal_no_of_teams(parsedData.total_no_of_teams);
      setRegistration_open(parsedData.registration_open);
      setRegistration_deadline(parsedData.registration_deadline);
      setAvailable_slots(parsedData.available_slots);
      setDescription(parsedData.description);
    }
  }, []);

  useEffect(() => {
    // Save form data to local storage whenever it changes
    const formData = {
      event_name,
      title,
      date,
      total_no_of_teams,
      registration_open,
      registration_deadline,
      available_slots,
      description,
    };
    localStorage.setItem('tournamentFormData', JSON.stringify(formData));
  }, [
    event_name,
    title,
    date,
    total_no_of_teams,
    registration_open,
    registration_deadline,
    available_slots,
    description,
  ]);

  const fetchTournament = async () => {
    try {
      const response = await axios.get(BaseUrl+`Tournament/Tournament/detail/${id}/`);
      const tournamentData = response.data;
      setEventData(tournamentData);
      setEvent_name(tournamentData.event_name || '');
      setTitle(tournamentData.title || '');
      setDate(tournamentData.date || null);
      setTotal_no_of_teams(tournamentData.total_no_of_teams || 0);
      setRegistration_open(tournamentData.registration_open || false);
      setRegistration_deadline(tournamentData.registration_deadline || null);
      setAvailable_slots(tournamentData.available_slots || 0);
      setDescription(tournamentData.description || '');
    } catch (error) {
      console.error(error);
    }
  };

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
    const formattedDates = disabledDates.map((date) => moment(date).format('YYYY-MM-DD'));

    if (current && current.isBefore(moment().startOf('day'))) {
      return true;
    }
    return formattedDates.includes(current.format('YYYY-MM-DD'));
  };

  const disabledDeadlineDate = (current) => {
    const formattedDates = disabledDeadlineDates.map((date) => moment(date).format('YYYY-MM-DD'));
    const currentDate = moment().startOf('day');
    if (current && current.isAfter(moment(eventData.date, 'YYYY-MM-DD'))) {
      return true;
    }
    return current && current.isBefore(currentDate);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
  
    switch (name) {
      case 'event_name':
        setEvent_name(newValue);
        break;
      case 'title':
        setTitle(newValue);
        break;
      case 'date':
        setDate(newValue);
        break;
      case 'total_no_of_teams':
        setTotal_no_of_teams(newValue);
        break;
      case 'description':
        setDescription(newValue);
        break;
      case 'registration_open':
        setRegistration_open(checked);
        break;
      case 'registration_deadline':
        setRegistration_deadline(newValue);
        break;
      case 'available_slots':
        setAvailable_slots(newValue);
        break;
      default:
        break;
    }
  };
  
  const handleDateChange = (date, dateString) => {
    const formattedDates = disabledDates.map((date) => moment(date).format('YYYY-MM-DD'));
  
    if (formattedDates.includes(dateString)) {
      console.log('Selected date is disabled.');
      return;
    }
  
    const fieldName = registration_open ? 'registration_deadline' : 'date';
  
    setEventData((prevData) => ({
      ...prevData,
      [fieldName]: dateString ? moment(dateString, 'YYYY-MM-DD').format('YYYY-MM-DD') : null,
    }));
  };
  
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
          event_name,
          title,
          date,
          total_no_of_teams,
          registration_open,
          registration_deadline,
          available_slots,
          description,
        };
    axios
      .put(BaseUrl+`Tournament/Tournament/detail/${id}/`, updatedData)
      .then((response) => {
        console.log(response.data);
        toast.success('Successfully edited')
        navigate(`/tournaments?id=${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="">
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://media.istockphoto.com/id/1217377601/photo/concrete-floor-and-smoke-background.webp?b=1&s=170667a&w=0&k=20&c=ajtSlLyL-T2cFmBQWzbfvw-E25hfFCLt-aFnRlKOWvY=')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <Sidebar />
            {/* change */}
            

<div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
  <h1 className="text-2xl font-semibold mb-4">Edit Tournament</h1>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event_name">
        Event Name
      </label>
      <input
      
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="event_name"
        type="text"
        name="event_name"
        value={event_name}
        onChange={(e) => setEvent_name(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
        Title
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
        Date
      </label>
      <DatePicker
disabledDate={disabledDate}
onChange={handleDateChange}
value={date ? moment(date, 'YYYY-MM-DD') : null}
/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="total_no_of_teams">
        Total Number of Teams
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="total_no_of_teams"
        type="number"
        name="total_no_of_teams"
        value={total_no_of_teams}
        onChange={(e) => setTotal_no_of_teams(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        Description
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="description"
        name="description"
        placeholder={description}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registration_open">
        Registration Open
      </label>
      <input
        className="mr-2 leading-tight"
        id="registration_open"
        type="checkbox"
        name="registration_open"
        checked={registration_open}
        onChange={(e) => setRegistration_open(e.target.value)}
      />
      <span className="text-gray-700">Allow registration for this tournament</span>
    </div>
    {registration_open && (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registration_deadline">
          Registration Deadline
        </label>
        <DatePicker
          disabledDate={disabledDeadlineDate}
          onChange={(e) => setRegistration_deadline(e.target.value)}
          value={registration_deadline ? moment(registration_deadline, 'YYYY-MM-DD') : null}
        />
      </div>
    )}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="available_slots">
        Available Slots
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="available_slots"
        type="number"
        name="available_slots"
        value={available_slots}
        onChange={(e) => setAvailable_slots(e.target.value)}
        required
      />
    </div>
    <div className="flex items-center justify-end">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Update Tournament
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

export default TournamentEditForm;




