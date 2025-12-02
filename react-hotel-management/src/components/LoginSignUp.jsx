import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login, signUp } from '../store/actions/authActions';

const LoginSignUp = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return false;
    }
    return true;
  };

  // New function to validate the login form
  const validateLoginForm = () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return false;
    }
    return true;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Add client-side validation before dispatching the login action
    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(login(email, password));
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(signUp(firstName, lastName, email, password));
      // After successful sign up, switch to the login view
      setIsLoginView(true);
      setError('');
      // Clear the sign-up form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center">{isLoginView ? 'User Login' : 'Sign Up'}</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}

        {isLoginView ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="loginEmail">Email address:</label>
              <input
                type="email"
                id="loginEmail"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword">Password:</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="loginPassword"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.359 11.237a.948.948 0 0 0-.85-.11l-2.428-2.428a2.53 2.53 0 0 0-3.63 3.63L9.673 14.19a.948.948 0 0 0 .11.85c.348.64.915 1.082 1.589 1.258a3.197 3.197 0 0 0 1.9-.387l1.7-1.7a3.197 3.197 0 0 0 .387-1.9c-.176-.674-.618-1.241-1.258-1.589zM12.5 13a.5.5 0 0 1-.5.5h-.75a.5.5 0 0 1 0-1h.75a.5.5 0 0 1 .5.5z"/>
                      <path d="M10.963 1.968C10.741 1.705 10.4 1.5 10 1.5c-.714 0-1.39.29-1.879.805a4.4 4.4 0 0 0-2.483 4.29L3.5 10.354V12h1.646L11.5 5.146l2.122 2.121a.75.75 0 0 0 1.06-1.06L12.5 2.5l-1.5-1.5-.037-.037zM4.146 11.854l-2.296-2.296a.5.5 0 0 1 0-.708l.708-.708a.5.5 0 0 1 .708 0l2.296 2.296a.5.5 0 0 1 0 .708l-.708.708a.5.5 0 0 1-.708 0z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8a13.133 13.133 0 0 1-1.66 2.043C11.88 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 1.173 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signUpEmail">Email address:</label>
              <input
                type="email"
                id="signUpEmail"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signUpPassword">Password:</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signUpPassword"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.359 11.237a.948.948 0 0 0-.85-.11l-2.428-2.428a2.53 2.53 0 0 0-3.63 3.63L9.673 14.19a.948.948 0 0 0 .11.85c.348.64.915 1.082 1.589 1.258a3.197 3.197 0 0 0 1.9-.387l1.7-1.7a3.197 3.197 0 0 0 .387-1.9c-.176-.674-.618-1.241-1.258-1.589zM12.5 13a.5.5 0 0 1-.5.5h-.75a.5.5 0 0 1 0-1h.75a.5.5 0 0 1 .5.5z"/>
                      <path d="M10.963 1.968C10.741 1.705 10.4 1.5 10 1.5c-.714 0-1.39.29-1.879.805a4.4 4.4 0 0 0-2.483 4.29L3.5 10.354V12h1.646L11.5 5.146l2.122 2.121a.75.75 0 0 0 1.06-1.06L12.5 2.5l-1.5-1.5-.037-.037zM4.146 11.854l-2.296-2.296a.5.5 0 0 1 0-.708l.708-.708a.5.5 0 0 1 .708 0l2.296 2.296a.5.5 0 0 1 0 .708l-.708.708a.5.5 0 0 1-.708 0z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8a13.133 13.133 0 0 1-1.66 2.043C11.88 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 1.173 8z"/>
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        )}
        
        <p className="mt-3 text-center">
          <button
            className="btn btn-link"
            onClick={() => {
              setIsLoginView(!isLoginView);
              setError('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              setFirstName('');
              setLastName('');
            }}
          >
            {isLoginView ? 'Don\'t have an account? Sign Up' : 'Already have an account? Log In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignUp;
