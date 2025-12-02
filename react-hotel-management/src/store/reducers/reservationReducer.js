export const FETCH_RESERVATIONS_SUCCESS = 'FETCH_RESERVATIONS_SUCCESS';
export const ADD_RESERVATION_SUCCESS = 'ADD_RESERVATION_SUCCESS';
export const UPDATE_RESERVATION_SUCCESS = 'UPDATE_RESERVATION_SUCCESS';
export const DELETE_RESERVATION_SUCCESS = 'DELETE_RESERVATION_SUCCESS';

const initialState = {
  reservations: [],
  loading: false,
  error: null,
};

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESERVATIONS_SUCCESS:
      return { ...state, reservations: action.payload, loading: false };
    case ADD_RESERVATION_SUCCESS:
      return { ...state, reservations: [...state.reservations, action.payload] };
    case UPDATE_RESERVATION_SUCCESS:
      return {
        ...state,
        reservations: state.reservations.map(res =>
          res.id === action.payload.id ? action.payload : res
        ),
      };
    case DELETE_RESERVATION_SUCCESS:
      return {
        ...state,
        reservations: state.reservations.filter(res => res.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reservationReducer;