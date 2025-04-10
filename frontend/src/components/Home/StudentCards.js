import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminCards.css';

function StudentCards() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Course Materials',
      icon: '📚',
      path: '/reference-notes',
      description: 'Access study materials and resources'
    },
    {
      title: 'Calendar',
      icon: '📅',
      path: '/calendar',
      description: 'View academic calendar and events'
    },
    {
      title: 'Faculty Info',
      icon: '👨‍🏫',
      path: '/faculty-info',
      description: 'Find faculty contact information'
    },
    {
      title: 'Attendance',
      icon: '📋',
      path: '/attendance-report',
      description: 'Check your attendance records'
    }
  ];

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Student Dashboard</h1>
      <div className="cards-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="admin-card"
            onClick={() => navigate(card.path)}
          >
            <div className="card-icon-container">
              <span className="card-emoji-icon">{card.icon}</span>
            </div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentCards; 