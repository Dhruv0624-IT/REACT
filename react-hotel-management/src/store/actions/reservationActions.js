import {FETCH_RESERVATIONS_SUCCESS,ADD_RESERVATION_SUCCESS,UPDATE_RESERVATION_SUCCESS,DELETE_RESERVATION_SUCCESS,} from '../reducers/reservationReducer';

export const fetchReservations = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/reservations');
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      dispatch({
        type: FETCH_RESERVATIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };
};

export const makeReservation = (reservationData) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error('Failed to make reservation');
      }

      const newReservation = await response.json();
      
      dispatch({
        type: ADD_RESERVATION_SUCCESS,
        payload: newReservation,
      });
      console.log('Reservation successful!');
      
    } catch (error) {
      console.error(`Reservation failed: ${error.message}`);
    }
  };
};

export const updateReservation = (id, updatedData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:5000/reservations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update reservation');

      const data = await response.json();
      dispatch({ type: UPDATE_RESERVATION_SUCCESS, payload: data });
      console.log('Reservation updated successfully!');
    } catch (error) {
      console.error('Error updating reservation:', error);
      console.log('Failed to update reservation.');
    }
  };
};

export const cancelReservation = (id) => {
  return async (dispatch) => {
   
    console.log(`Attempting to cancel reservation with ID: ${id}`);
    
    try {
      const response = await fetch(`http://localhost:5000/reservations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to cancel reservation');
      
      dispatch({ type: DELETE_RESERVATION_SUCCESS, payload: id });
      console.log('Reservation canceled successfully!');
    } catch (error) {
      console.error('Error canceling reservation:', error);
      console.log('Failed to cancel reservation.');
    }
  };
};
