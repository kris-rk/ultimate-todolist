import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    //check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:2000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      //display success or error message based on response
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Register;
