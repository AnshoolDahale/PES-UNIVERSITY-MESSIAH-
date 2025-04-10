import React, { useState } from 'react';
import FacultyInfo from './FacultyInfo';
import './StudentDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

const StudentDashboard = () => {
  const [showFacultyInfo, setShowFacultyInfo] = useState(false);

  const toggleFacultyInfo = () => {
    setShowFacultyInfo(!showFacultyInfo);
  };

  return (
    <div className="dashboard-container">
      <div className="user-greeting">
        <span className="user-icon">👨‍🎓</span>
        Hey user
      </div>
      
      <button className="faculty-info-button" onClick={toggleFacultyInfo}>
        <FontAwesomeIcon icon={faChalkboardTeacher} className="faculty-info-icon" />
      </button>

      {showFacultyInfo && <FacultyInfo />}
    </div>
  );
};

export default StudentDashboard; 