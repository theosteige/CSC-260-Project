import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/TeamGrit.png';
import './LoginPage.css';

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      
      const profRes = await fetch('http://127.0.0.1:8000/api/profs/');
      const profs = await profRes.json();
      const foundProf = profs.find((prof) => prof.email === email);

      if (foundProf) {
        onLoginSuccess({ email, role: 'teacher', id: foundProf.id });
        navigate('/classes');
        return;
      }

      
      const studentRes = await fetch('http://127.0.0.1:8000/api/students/');
      const students = await studentRes.json();
      const foundStudent = students.find((student) => student.email === email);

      if (foundStudent) {
        onLoginSuccess({ email, role: 'student', id: foundStudent.id });
        navigate('/classes');
        return;
      }

      
      setError('Invalid email. Please try again.');
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred while trying to log in.');
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Team Grit Logo" />
      <h2>Code Review Login</h2>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email: </label>
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
