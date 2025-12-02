import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoomList from './components/RoomList';
import RoomDetails from './components/RoomDetails';
import ReservationList from './components/ReservationList';
import Login from './components/LoginSignUp';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<RoomList />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/reservations" 
            element={
              <PrivateRoute>
                <ReservationList />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
