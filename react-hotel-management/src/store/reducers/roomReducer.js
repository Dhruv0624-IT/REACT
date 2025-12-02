// Define action types as constants
export const FETCH_ROOMS_LOADING = 'FETCH_ROOMS_LOADING';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS_ERROR = 'FETCH_ROOMS_ERROR';

const initialState = {
  rooms: [],
  loading: false,
  error: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload,
      };
    case FETCH_ROOMS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default roomReducer;