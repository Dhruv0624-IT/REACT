import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations, cancelReservation } from '../store/actions/reservationActions';

const ReservationList = () => {
  const { reservations, loading, error } = useSelector((state) => state.reservations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleCancel = (id) => {
  
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      dispatch(cancelReservation(id));
    }
  };

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>My Reservations</h2>
      <div className="row">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div key={reservation.id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Reservation for Room #{reservation.roomId}</h5>
                  <p className="card-text">Guest Name: {reservation.guestName}</p>
                  <p className="card-text">Check-in: {reservation.checkIn}</p>
                  <p className="card-text">Check-out: {reservation.checkOut}</p>
                  <p className="card-text">Status: <span className="badge bg-success">{reservation.status}</span></p>
                  <p className="card-text">Adults: {reservation.adults}</p>
                  <p className="card-text">Children: {reservation.children}</p>
                  <button 
                    className="btn btn-danger btn-sm mt-2" 
                    onClick={() => handleCancel(reservation.id)}
                  >
                    Cancel Reservation
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info">You have no reservations.</div>
        )}
      </div>
    </div>
  );
};

export default ReservationList;
