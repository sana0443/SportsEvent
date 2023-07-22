import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom'
import BaseUrl from '../../BaseUrl';

const TurfDetail = ({ turfId }) => {
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
const location=useLocation()
const quaryParams=new URLSearchParams(location.search);
const turf_id=quaryParams.get('id');
  useEffect(() => {
    const fetchTurf = async () => {
      try {
        const response = await axios.get(BaseUrl+`slots/turf_details/${turf_id}/`);
        setTurf(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching turf:', error);
        setLoading(false);
      }
    };

    fetchTurf();
  }, [turfId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!turf) {
    return <div>Turf not found.</div>;
  }


  const backgroundImage = `url(${BaseUrl}${turf.photo})`;


  return (
    <div >
       <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://media.istockphoto.com/id/1217377601/photo/concrete-floor-and-smoke-background.webp?b=1&s=170667a&w=0&k=20&c=ajtSlLyL-T2cFmBQWzbfvw-E25hfFCLt-aFnRlKOWvY=')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Turf Details</h1>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage }}></div>
            </div>
            <div className="mt-4">
              <h1 className="text-lg font-bold">{turf.name}</h1>
              <p className="text-gray-600">Location: {turf.location}</p>
              <p className="text-gray-600">Description: {turf. description}</p>
              <p className="text-gray-600">Contact Number: {turf.contact_number}</p>
            </div>
            </div>
            {/* change */}
          </div>
        </div>
    </section>
     
    </div>
  );
  
  
  
 
}

export default TurfDetail;



