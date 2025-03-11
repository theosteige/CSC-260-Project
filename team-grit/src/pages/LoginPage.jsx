import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/TeamGrit.png'
import './LoginPage.css';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for authentication logic
    if (username && password) {
      onLoginSuccess();
      navigate('/classes');
    }
  };

  return (
    <div className="login-container">
      <img src={logo}></img>
      <h2> Code Review Login </h2>
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      </div>
    </div>
  );
}

export default LoginPage;
