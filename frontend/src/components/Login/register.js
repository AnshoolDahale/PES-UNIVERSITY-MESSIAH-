import React, { useState } from 'react';
import './register.css'

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!name) {
      errors.name = 'Please enter your name';
    }
    if (!email) {
      errors.email = 'Please enter your email address';
    }
    if (!phonenumber) {
      errors.phonenumber = 'Please enter your phone number';
    }
    if (!password) {
      errors.password = 'Please enter a password';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Handle registration logic
      
      // Redirect to login page
      window.location.href = '/login';
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Register Here</h2>
      <label htmlFor="name" className="registration-label">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="registration-input"
      />
      {formErrors.name && <span className="registration-error">{formErrors.name}</span>}
      <label htmlFor="email" className="registration-label">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="registration-input"
      />
      {formErrors.email && <span className="registration-error">{formErrors.email}</span>}
      <label htmlFor="Phonenumber" className="registration-label">Phone Number:</label>
      <input
        type="Number"
        id="Phonenumber"
        value={phonenumber}
        onChange={(e) => setPhonenumber(e.target.value)}
        className="registration-input"
      />
      {formErrors.phonenumber && <span className="registration-error">{formErrors.phonenumber}</span>}
      <label htmlFor="password" className="registration-label">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="registration-input"
      />
      {formErrors.password && <span className="registration-error">{formErrors.password}</span>}
      <label htmlFor="confirmPassword" className="registration-label">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="registration-input"
      />
      {formErrors.confirmPassword && <span className="registration-error">{formErrors.confirmPassword}</span>}
      <button type="submit" className="registration-button">Register</button>
    </form>
  );
};

export default Registration;
