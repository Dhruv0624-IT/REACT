export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'; // New action type

// Simulated API call for login
// In a real application, you would replace this with a fetch() call to your backend.
const apiLogin = async (email, password) => {
  return new Promise((resolve) => {
    // Simulating a network request delay
    setTimeout(() => {
      // The login is now successful with any email and password.
      resolve({
        user: {
          email: email, // We'll use the email the user entered
          // Other user data from the server
        },
      });
    }, 1000);
  });
};

// New simulated API call for sign up
const apiSignUp = async (firstName, lastName, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });
    }, 1000);
  });
};

/**
 * Thunk to handle user sign up.
 */
export const signUp = (firstName, lastName, email, password) => {
  return async (dispatch) => {
    try {
      const response = await apiSignUp(firstName, lastName, email, password);
      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: response.user,
      });
    } catch (error) {
      // For this example, we'll assume sign up always succeeds.
      // In a real app, you would handle this error.
      console.error("Sign up failed:", error);
    }
  };
};

/**
 * Thunk to handle user login.
 */
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await apiLogin(email, password);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.message,
      });
      // Re-throw the error so the component can catch it
      throw error;
    }
  };
};

/**
 * Action creator for logging out.
 */
export const logout = () => ({
  type: LOGOUT,
});
