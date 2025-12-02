import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRooms } from '../store/actions/roomActions';
import ReservationForm from './ReservationForm';
import { fetchReservations } from '../store/actions/reservationActions';

const RoomDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);
  const { reservations } = useSelector((state) => state.reservations);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (rooms.length === 0) {
      dispatch(fetchRooms());
    }
    dispatch(fetchReservations());
  }, [dispatch, rooms.length]);

  useEffect(() => {
    if (rooms.length > 0) {
      const foundRoom = rooms.find((r) => r.id === parseInt(id));
      setRoom(foundRoom);
    }
  }, [rooms, id]);

  if (loading) {
    return <div>Loading room details...</div>;
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  if (!room) {
    return <div className="alert alert-warning">Room not found!</div>;
  }

  const isReserved = reservations.some(reservation => reservation.roomId === room.id);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">Room {room.roomNumber}</h2>
          <h4 className="card-subtitle mb-2 text-muted">{room.type} - {room.price} / night</h4>
          <p className="card-text">
            This is a beautiful {room.type.toLowerCase()} room, perfect for a relaxing stay.
            It is equipped with all the modern amenities to make your visit comfortable.
          </p>
          <ul className="list-group list-group-flush mb-3">
            {room.features && room.features.map((feature, index) => (
              <li key={index} className="list-group-item">
                <span className="badge bg-info me-2">{feature}</span>
              </li>
            ))}
          </ul>
          {isReserved ? (
            <div className="alert alert-danger">This room is currently booked.</div>
          ) : (
            <div className="alert alert-success">This room is currently available.</div>
          )}
        </div>
      </div>
      
      {!isReserved && <ReservationForm roomId={room.id} />}
    </div>
  );
};

export default RoomDetails;
