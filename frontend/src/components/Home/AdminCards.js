import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminCards.css';

function AdminCards() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Faculty Info',
      icon: '👨‍🏫',
      path: '/faculty-info',
      description: 'Manage faculty information'
    }
  ];

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Hey User !</h1>
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

export default AdminCards; 