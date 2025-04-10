import React from 'react';
// import Header from '../navbar/NavBar';
import './AdminCards.css';
import { Navigate, useNavigate } from 'react-router-dom';
import  {  useEffect } from 'react';
import swal from 'sweetalert'
import axios from 'axios';

const token = localStorage.getItem('token');
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Card(props) {
 
  return (
    <a href={props.link}>
      <div className="card">
        <div className={`front ${props.class}`}></div>
        <div className="back">
          {props.title}
        </div>
      </div>
    </a>
  );
}

function AdminCards() {
  
  return (
    <div>
      <div className="container">
        <Card class="front10" title="Courses" link="/notes" />
        <Card class="front12" title="Faculty Info" link="/faculty-info" />
      </div>
    </div>
  );
}

export default AdminCards;