import {
  FETCH_ROOMS_LOADING,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_ERROR,
} from '../reducers/roomReducer';

// Action creator for when the fetch starts
export const fetchRoomsLoading = () => ({
  type: FETCH_ROOMS_LOADING,
});

// Action creator for a successful fetch
export const fetchRoomsSuccess = (rooms) => ({
  type: FETCH_ROOMS_SUCCESS,
  payload: rooms,
});

// Action creator for a failed fetch
export const fetchRoomsError = (error) => ({
  type: FETCH_ROOMS_ERROR,
  payload: error,
});

// This is the Redux thunk for fetching data from the API
export const fetchRooms = () => {
  return async (dispatch) => {
    dispatch(fetchRoomsLoading()); // Dispatch loading action

    try {
      // Use 'await' to wait for the API call to complete
      const response = await fetch('http://localhost:5000/rooms');
      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      const data = await response.json();
      dispatch(fetchRoomsSuccess(data)); // Dispatch success with the data
    } catch (error) {
      dispatch(fetchRoomsError(error.message)); // Dispatch error
    }
  };
};