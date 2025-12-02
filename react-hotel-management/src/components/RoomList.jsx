  import React, { useEffect, useState } from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import { fetchRooms } from '../store/actions/roomActions';
  import { fetchReservations } from '../store/actions/reservationActions';
  import { Link } from 'react-router-dom';

  const RoomList = () => {
    // Get state from the Redux store
    const { rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);
    const { reservations, loading: reservationsLoading } = useSelector((state) => state.reservations);
    const dispatch = useDispatch();

    // Local state for sorting and filtering
    const [sortBy, setSortBy] = useState('price-asc'); // price-asc, price-desc, type-asc, type-desc
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);

    // Fetch data when the component mounts
    useEffect(() => {
      dispatch(fetchRooms());
      dispatch(fetchReservations());
    }, [dispatch]);

    // Apply sorting and filtering logic
    const getSortedAndFilteredRooms = () => {
      // Start with a copy of the original rooms array to avoid mutating state
      let filteredRooms = [...rooms];

      // 1. Apply Filtering
      if (showAvailableOnly) {
        filteredRooms = filteredRooms.filter((room) => {
          // Check if the room is available in both the room data and reservations data
          const isReserved = reservations.some(reservation => reservation.roomId === room.id);
          return !isReserved;
        });
      }

      // 2. Apply Sorting
      filteredRooms.sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (sortBy === 'type-asc') {
          return a.type.localeCompare(b.type);
        }
        if (sortBy === 'type-desc') {
          return b.type.localeCompare(a.type);
        }
        return 0;
      });

      return filteredRooms;
    };

    const sortedAndFilteredRooms = getSortedAndFilteredRooms();

    if (roomsLoading || reservationsLoading) {
      return <div>Loading rooms...</div>;
    }

    if (roomsError) {
      return <div className="text-danger">Error: {roomsError}</div>;
    }

    return (
      <div className="container mt-5">
        <h2>Available Rooms</h2>

        {/* Sorting and Filtering Controls */}
        <div className="d-flex justify-content-between mb-4">
          <div className="form-group d-flex align-items-center">
            <label htmlFor="sortBy" className="me-2">Sort By:</label>
            <select
              className="form-select"
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="type-asc">Room Type (A-Z)</option>
              <option value="type-desc">Room Type (Z-A)</option>
            </select>
          </div>
          <div className="form-check form-switch d-flex align-items-center">
            <input
              className="form-check-input"
              type="checkbox"
              id="availableFilter"
              checked={showAvailableOnly}
              onChange={() => setShowAvailableOnly(!showAvailableOnly)}
            />
            <label className="form-check-label ms-2" htmlFor="availableFilter">
              Show Available Only
            </label>
          </div>
        </div>

        {/* Room List */}
        <div className="row">
          {sortedAndFilteredRooms.length > 0 ? (
            sortedAndFilteredRooms.map((room) => {
              const isReserved = reservations.some(reservation => reservation.roomId === room.id);
              return (
                <div key={room.id} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Room {room.roomNumber}</h5>
                      <p className="card-text">Type: {room.type}</p>
                      <p className="card-text">Price: {room.price} / night</p>
                      <ul className="list-unstyled d-flex flex-wrap">
                        {room.features && room.features.map((feature, index) => (
                          <li key={index} className="badge bg-secondary me-1 mb-1">
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {isReserved ? (
                        <button className="btn btn-secondary" disabled>
                          Booked
                        </button>
                      ) : (
                        <Link to={`/rooms/${room.id}`} className="btn btn-primary">
                          View Details
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="alert alert-info">No rooms match your criteria.</div>
          )}
        </div>
      </div>
    );
  };

  export default RoomList;
