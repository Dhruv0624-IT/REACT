import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeReservation } from '../store/actions/reservationActions';

const ReservationForm = ({ roomId }) => {
  const [guestName, setGuestName] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guestName || !checkIn || !checkOut) {
      setMessage('Please fill in all fields.');
      setIsSuccess(false);
      return;
    }

    const newReservation = {
      roomId,
      guestName,
      checkIn,
      checkOut,
      adults: Number(adults),
      children: Number(children),
      status: 'Reserved',
    };

    dispatch(makeReservation(newReservation))
      .then(() => {
        setMessage('Reservation successful!');
        setIsSuccess(true);
        setGuestName('');
        setCheckIn('');
        setCheckOut('');
        setAdults(1);
        setChildren(0);
      })
      .catch((error) => {
        setMessage(`Reservation failed: ${error.message}`);
        setIsSuccess(false);
      });
  };
  
  if (!isLoggedIn) {
    return (
      <div className="alert alert-info mt-4">
        You must be logged in to make a reservation.
      </div>
    );
  }

  return (
    <div className="mt-4 card p-4">
      <h3>Make a Reservation</h3>
      {message && (
        <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="guestName" className="form-label">Guest Name</label>
          <input
            type="text"
            className="form-control"
            id="guestName"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="adults" className="form-label">Number of Adults</label>
          <input
            type="number"
            className="form-control"
            id="adults"
            value={adults}
            min="1"
            onChange={(e) => setAdults(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="children" className="form-label">Number of Children</label>
          <input
            type="number"
            className="form-control"
            id="children"
            value={children}
            min="0"
            onChange={(e) => setChildren(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="checkIn" className="form-label">Check-in Date</label>
          <input
            type="date"
            className="form-control"
            id="checkIn"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="checkOut" className="form-label">Check-out Date</label>
          <input
            type="date"
            className="form-control"
            id="checkOut"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reserve Room
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
