import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaInfoCircle } from 'react-icons/fa';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleFacultyInfoClick = () => {
    navigate('/faculty-info');
  };

  return (
    <div className="student-dashboard">
      <div className="welcome-section">
        <FaUserGraduate className="student-icon" />
        <h1>Hey user</h1>
      </div>
      
      <div className="faculty-info-section" onClick={handleFacultyInfoClick}>
        <FaInfoCircle className="info-icon" />
      </div>
    </div>
  );
};

export default StudentDashboard; 