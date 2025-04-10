import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const handleNext = () => {
    setShowOptions(true);
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handleStudentLogin = () => {
    navigate('/student-dashboard');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        {!showOptions ? (
          <>
            <h1 className="welcome-title">Welcome to</h1>
            <h1 className="university-title">PES UNIVERSITY</h1>
            <h2 className="messiah-title">MESSIAH</h2>
            <button className="next-button" onClick={handleNext}>
              <span className="button-text">Next</span>
              <span className="button-icon">→</span>
            </button>
          </>
        ) : (
          <div className="login-options">
            <h2>Choose Login Option</h2>
            <div className="option-buttons">
              <button className="option-button admin" onClick={handleAdminLogin}>
                Login as Admin
              </button>
              <button className="option-button student" onClick={handleStudentLogin}>
                Login as Student
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="background-pattern"></div>
    </div>
  );
};

export default Welcome; 