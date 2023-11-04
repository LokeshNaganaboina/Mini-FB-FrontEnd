import React, { useEffect, useState } from 'react';
import './Login.css';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import envConfig from '../configs/envConfig';
import axiosInstance from '../configs/axiosConfig';

const Login = () => {

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoginMode) {
      handleLogin();
    }
    else {
      handleSignup();
    }

  };

  const handleLogin = () => {
    const userData = {email, password};
    console.log("calling submit method")

    axiosInstance.post(`${envConfig.baseUrl}/api/auth/login`, userData, {withCredentials: true})
    .then(response => {
      if (response.status === 200) {
        setError(null);
        console.log("login successful");
        console.log(response.data);
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        navigate('/timeline');
      }
      else {
        console.log("Error while login, please login again");
        setError("Error while login, please login again")
      }
    })
    .catch((err) => {
      console.log(err);
      setError("Error while login, please login again")
    });
  }

  const handleSignup = () => {
    const userData = {email, password, username, age};
    console.log("calling submit method")

    axiosInstance.post(`${envConfig.baseUrl}/api/auth/register`, userData, {withCredentials: true})
    .then(response => {
      if (response.status === 200) {
        setError(null);
        console.log(response.data);
        setIsLoginMode(true);
      }
      else {
        console.log("Error while signup, please signup again");
        setError("Error while signup, please signup again");
      }
    })
    .catch((err) => {
      console.log(err);
      setError(err.response.data);
    });
  }

  return (
    <div className='container'>
      <div className='svg-container'>
        <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="My SVG Image" className="svg-image" />
      </div>
      <div className='login-container'>
        { errorMessage ? <Alert key="danger" variant="danger">
          {errorMessage}
        </Alert> : null}
        <h2>{isLoginMode? 'Login': 'Signup'} </h2>
        <form onSubmit={handleSubmit}>
          {!isLoginMode ? 
            <>
              <div className='form-group'>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className='form-group'>
                <label htmlFor='age'>Age:</label>
                <input type='number' id='age' value={age} onChange={(e) => setAge(e.target.value)} required />
              </div> 
            </>: null }
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type='submit'>{isLoginMode? 'Login' : 'Signup'}</button>
        </form>

        <p onClick={()=> setIsLoginMode(!isLoginMode)}>
          {isLoginMode? 'New User? Sign up' : 'Already have an account? Login'}
        </p>
        </div>
    </div>
  )
};

export default Login;