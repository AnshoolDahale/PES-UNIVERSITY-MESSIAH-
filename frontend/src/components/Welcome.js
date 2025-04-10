import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add any necessary cleanup code here
  }, [navigate]);

  return (
    <div>
      <h2>Choose Login Option</h2>
      <button 
        className="login-button"
        onClick={() => navigate('/admin-login')}
        style={{ backgroundColor: '#2c3e50', color: 'white', border: 'none', marginBottom: '10px' }}
      >
        Login as Admin
      </button>
      <button
        className="login-button"
        onClick={() => navigate('/login')}
        style={{ backgroundColor: '#3498db', color: 'white', border: 'none' }}
      >
        Login as Student
      </button>
    </div>
  );
};

export default Welcome; 