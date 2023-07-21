import React from 'react';
import './App.css';
import Signup from './component/Signup';
import Login from './component/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
// import TeamRegistrationForm from './component/Team';
import AdminDashboard from './Admin/Admindsbd';
import TournamentCreationForm from './Admin/Tournament_create';
import HomePage from './component/new';
import TournamentList from './Admin/Tournament_list';
import AdminLogin from './Admin/AdminLogin';
import Footer from './component/Footer/Footer';
import Sidebar from './Admin/Sidebar';
import ShowTournaments from './component/pages/ShowTournaments';
import TournamnetMdl from './component/Modal/TournamnetMdl';
import RegistrationForm from './component/pages/Registration';
// import SlotList from './component/pages/Slots';
import { Toaster } from "react-hot-toast";
import Profile from './component/pages/profile';
import UserList from './Admin/Userlist';
import Team from './Admin/Team';
import TeamDetails from './Admin/TeamDetails';
import About from './component/pages/About';
import TurfList from './component/pages/Turfs';
import Booking from './component/pages/booking';
import Payment from './component/pages/payment';
import PaymentSuccess from './component/pages/Payment_success';
import TurfDetail from './component/pages/Turf_details';
import TournamentEditForm from './Admin/Edit_tournament';
import CreateSlotForm from './Admin/create_slot';
import BookedSlots from './Admin/BookedSlots';
import Slots_list from './Admin/Slots_list';
import Edit_slot from './Admin/Edit_slot';
// import Slots from './component/pages/Slots';
// import SlotCard from './component/SlotsCard';
// import Otp from './component/Otp/Otp';
// import { UserAuthContextProvider } from './Context/AuthContext';

function App() {
  return (
    // <UserAuthContextProvider>
      <Router>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/otp' element={<Otp />} /> */}
            <Route path='/team' element={<Team />} />
            <Route path='/admindsbd' element={<AdminDashboard />} />
            <Route path='/AdminLogin' element={<AdminLogin />} />
            <Route path='/create_tournament' element={<TournamentCreationForm />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/tournaments' element={<TournamentList />} />
            <Route path='/Sidebar' element={<Sidebar />} />
            <Route path='/ShowTournaments' element={<ShowTournaments/>}/>
            <Route path='/trmntMdl'element={<TournamnetMdl/>}/>
            <Route path="/registration/:tournamentId" element={<RegistrationForm/>} />
            {/* <Route path='/slots' element={<SlotList/>}/> */}
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/userlist' element={<UserList/>}/>
            <Route path='/teamdetails/:teamId' element={<TeamDetails/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/turfs' element={<TurfList/>}/>
            <Route path='/booking' element={<Booking/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/success' element={<PaymentSuccess/>}/>
            <Route path='/details' element={<TurfDetail/>}/>
            <Route path='/edit/:id' element={<TournamentEditForm/>}/>
            <Route path='/createSlot' element={<CreateSlotForm/>}/>
            <Route path='/booked' element={<BookedSlots/>}/>
            <Route path='/slotz' element={<Slots_list/>}/>
            <Route path='/editslot/:id' element={<Edit_slot/>}/>
           
            {/* <Route path='/slotCard' element={<SlotCard/>}/> */}
          </Routes>
          <Footer />
          <Toaster />
        </div>
      </Router>
    // </UserAuthContextProvider>
  );
}

export default App;
