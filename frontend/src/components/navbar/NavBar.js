

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import './NavBar.css'
import { Navigate, useNavigate } from 'react-router-dom';




function Navbar() {
  const navigate = useNavigate()
  const HandleLogout = () => {
    localStorage.removeItem('token')
    navigate("/login");
    console.log(localStorage)
  }


  return (
    <div>
      <header>
        <nav>
          <ul>
         
            <button onClick={HandleLogout}><li><a className='logout-logo' ><FontAwesomeIcon icon={faSignOutAlt} /></a></li></button>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
