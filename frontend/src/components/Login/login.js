import React, { useState } from 'react';
import './login.css'
import axios from 'axios'
import { Navigate, useNavigate, useLocation } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [mobilenumber, setmobilenumber] = useState('');
  const [showSignInForm, setShowSignInForm] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLogin = location.pathname === '/admin-login';


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
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

  const handleLogin = (event) => {
    event.preventDefault();
    
    const data = {
      username,
      password
    };

    if (isAdminLogin) {
      axios.post('http://localhost:5000/admin/login', data)
        .then((res) => {
          localStorage.setItem('adminToken', res.data.token);
          window.alert("Admin Login Successful");
          navigate("/admin-dashboard");
        })
        .catch(error => {
          console.error('Error:', error);
          window.alert("Invalid Admin Credentials");
        });
    } else {
      axios.post('http://localhost:5000/login', data)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          window.alert("Login Successful");
          navigate("/student-dashboard");
        })
        .catch(error => {
          console.error('Error:', error);
          window.alert("Invalid Credentials");
        });
    }
  };

  const handleSignUp = (event) => {
    // handle sign up logic

    event.preventDefault();
    const dataforregister = { name, mobilenumber, password, confirmpassword, email }
    // Perform signup request with username, email, and password values
    axios
      .post('http://localhost:5000/register', dataforregister)
      .then((response) => {
        console.log(response.data);
        window.alert('Registration successful');
      })
      .catch((error) => {
        console.error(error);
        window.alert('Registration failed');
      });
  };

  const handleTabChange = (event) => {
    if (event.target.id === 'tab-1') {
      setShowSignInForm(true);
    } else if (event.target.id === 'tab-2') {
      setShowSignInForm(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked={showSignInForm} onChange={handleTabChange} />
        <label htmlFor="tab-1" className="tab">
          Sign In
        </label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" checked={!showSignInForm} onChange={handleTabChange} />
        <label htmlFor="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          {showSignInForm ? (
            <div className="sign-in-htm">
              <h2>{isAdminLogin ? 'Admin Login' : 'Student Login'}</h2>
              <div className="group">
                <label htmlFor="username" className="label">
                  Username
                </label>
                <input 
                  id="username" 
                  type="text" 
                  className="input" 
                  value={username} 
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                />
              </div>
              <div className="group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input 
                  id="password" 
                  type="password" 
                  className="input" 
                  value={password} 
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                />
              </div>
              <div className="group">
                <input 
                  type="submit" 
                  className="button" 
                  value="Login" 
                  onClick={handleLogin} 
                />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </div>
          ) : (
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user" className="label">
                  Name
                </label>
                <input id="user" type="text" className="input" value={name} onChange={handleNameChange} />
              </div>
            <div className="group">
                <label htmlFor="email" className="label">Email</label>
                <input id="email" type="text" className="input" value={username} onChange={handleUsernameChange} />
            </div>
            <div className="group">
                <label htmlFor="password" className="label">Password</label>
                <input id="password" type="password" className="input" data-type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <div className="group">
                <label htmlFor="confirmpassword" className="label">Confirm Password</label>
                <input id="confirmpassword" type="password" className="input" data-type="password" value={confirmpassword} onChange={handleConfirmPasswordChange} />
            </div>
            <div className="group">
                <label htmlFor="mobilenumber" className="label">Mobile Number</label>
                <input id="mobilenumber" type="text" className="input" value={mobilenumber} onChange={handleMobileNumberChange} />
            </div>
            <div className="group">
                <input type="submit" className="button" defaultValue="Sign Up" onClick={handleSignUp} />
            </div>
            <div className="hr" />
                <div className="foot-lnk">
                    <label htmlFor="tab-1">Already Member?</label>
                </div>
            </div>
            )}
        </div>
    </div>
</div>
);
}

export default Login;
