import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TurfMdl from '../Modal/TurfMdl';
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../../BaseUrl';

function Turfs() {
  const [turfs, setTurfs] = useState([]);
  const [selectedTurfId, setSelectedTurfId] = useState(null);
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const[slots,setSlots]=useState([])
  const [bookedSlots,setBookedSlots]=useState([])
  const navigate=useNavigate();

  useEffect(() => {
    fetchTurfs();
  }, []);

  const viewDetails = (turfid) => {
    navigate(`/details?id=${turfid}`);
    
  };

  const fetchTurfs = async () => {
    try {
      const response = await axios.get(BaseUrl+'slots/turfs/');
      setTurfs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  const openModal = async (turfId) => {
    setSelectedTurfId(turfId);
    try {
      const response = await axios.get(BaseUrl+`slots/booked_slots/${turfId}/`);
      setModal(true);
      console.log(response.data,'bookkedddddd---------');
      setBookedSlots(response.data); // Assuming the response contains the booked slots data
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (modal) {
      fetchSlots();
      console.log(modal)
    }
  }, [modal]);

  const fetchSlots = async () => {
    try {
      const response = await axios.get(`${BaseUrl}slots/slots/${selectedTurfId}/`);
      // Handle the fetched slots data as needed
      console.log(response.data,'itttttttttttt');
      setSlots(response.data)
      
    } catch (error) {
      console.log(error);
    }
  };
  const backgroundImage = 'url("https://www.monaco.edu/app/uploads/sites/4/2021/07/Sports_Management.jpg")';


  return (
    <>
      {modal?<TurfMdl  onClose={closeModal} slot={slots} turfId={selectedTurfId} details={setSlots} bookedSlots={bookedSlots} />:null}
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://cdn.wallpapersafari.com/92/33/RBQfUk.jpg')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
           
            {/* change */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mt-12 ml-12">
    
    {turfs.map((turf) => (
      <div key={turf.id} className="bg-white p-4 shadow rounded-lg">
        {turf.photo && (
          <img src={`${BaseUrl}${turf.photo}`} alt="Turf Thumbnail" className="mb-4 w-full h-64 object-cover rounded-md" />
        )}
        <h3 className="text-xl font-bold mb-2">{turf.name}</h3>
        <p className="text-gray-500 mb-2">{turf.location}</p>
        <p className="text-gray-500">{turf.contact_number}</p>
        <div className="mt-4">
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() => viewDetails(turf.id)}
          >
            View Details
          </button>
          <button onClick={() => openModal(turf.id)} className="bg-green-500 text-white px-4 py-2 rounded-md">
            Make Booking
          </button>
        </div>
      </div>
    ))}
  </div> 
            
            {/* change */}
          </div>
        </div>
    </section>
    </>
  );
}

export default Turfs;




