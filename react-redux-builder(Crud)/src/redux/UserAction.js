export const SET_USERS = 'SET_USERS';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';

const API_URL = 'https://jsonplaceholder.typicode.com/users';


export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const deleteUserSuccess = (id) => ({
  type: DELETE_USER_SUCCESS,
  payload: id,
});

export const requestStart = () => ({
  type: REQUEST_START,
});

export const requestFailure = (error) => ({
  type: REQUEST_FAILURE,
  payload: error,
});


export const getAllUsers = () => {
  return async (dispatch) => {
    dispatch(requestStart());
    try {
      const data = [
        { id: 1, username: 'Alice' },
        { id: 2, username: 'Bob' },
        { id: 3, username: 'Charlie' },
      ];
      dispatch(setUsers(data));
    } catch (error) {
      dispatch(requestFailure(error.message));
      console.error('Error fetching users:', error);
    }
  };
};

export const addUser = (newUser) => {
  return async (dispatch) => {
    dispatch(requestStart());
    try {
      const addedUser = { ...newUser, id: Date.now() };
      dispatch(addUserSuccess(addedUser));
    } catch (error) {
      dispatch(requestFailure(error.message));
      console.error('Error adding user:', error);
    }
  };
};

export const updateUser = (id, updatedUser) => {
  return async (dispatch) => {
    dispatch(requestStart());
    try {
      const userToUpdate = { id, ...updatedUser };
      dispatch(updateUserSuccess(userToUpdate));
    } catch (error) {
      dispatch(requestFailure(error.message));
      console.error('Error updating user:', error);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch(requestStart());
    try {
      dispatch(deleteUserSuccess(id));
    } catch (error) {
      dispatch(requestFailure(error.message));
      console.error('Error deleting user:', error);
    }
  };
};