

import React, { useState } from 'react';
import './login.css'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';


function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [mobilenumber, setmobilenumber] = useState('');
  const [showSignInForm, setShowSignInForm] = useState(true);
  const navigate = useNavigate();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setconfirmpassword(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setmobilenumber(event.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    // Perform signup request with username, email, and password values
    const data = {
      email, password
    };
   

  axios.post('http://localhost:5000/adminlogin', data)
  .then((res) => {
    
    console.log(res);        
   localStorage.setItem('token',res.data.token)
   console.log(localStorage)
   
  
    

    window.alert("Login Successfully");
    navigate("/admin-home");
  })
  .catch(error => {
    console.error('Error saving data:', error);
    window.alert("Invalid Credentials");
  }).catch(error => {
        console.error('Error saving data:', error);
        window.alert("Invalid Credentials")
      });
  };

 
 

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" />
        <label htmlFor="tab-1" className="tab">
          Sign In
        </label>
          
        
        <div className="login-form">
        
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="email" className="email">
                  Email
                </label>
                <input id="email" type="text" className="input" value={email} onChange={handleEmailChange} />
              </div>
              <div className="group">
                <label htmlFor="password" className="password">
                  Password
                </label>
                <input id="password" type="password" className="input" data-type="password" value={password} onChange={handlePasswordChange} />
              </div>
              {/* <div className="group">
                <input id="check" type="checkbox" className="check" defaultChecked />
                <label htmlFor="check">
                  <span className="icon" /> Keep me Signed in
                </label>
              </div> */}
              <div className="group">
                <input type="submit" className="button" defaultValue="Sign In" onClick={handleSignIn} />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </div>
          
        </div>
    </div>
</div>
);
}

export default AdminLogin;
