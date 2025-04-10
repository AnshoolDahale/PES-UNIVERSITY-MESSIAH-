import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const validFaculty = {
      'chetana srinivas': true,
      'pawan': true,
      'prakash': true,
      'nage gowda': true
    };

    // Check if username is a valid faculty member and password matches username
    if (validFaculty[username.toLowerCase()] && username.toLowerCase() === password.toLowerCase()) {
      // Store the faculty name and simulate a successful login
      localStorage.setItem('adminToken', 'faculty-token');
      localStorage.setItem('adminName', username.toLowerCase());
      navigate('/admin-schedule');
    } else {
      setError('Invalid credentials. Note: Only faculty members can login.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Faculty Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 