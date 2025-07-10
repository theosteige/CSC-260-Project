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
    <div className="page login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-card card">
            <div className="login-header">
              <img src={logo} alt="Team Grit Logo" className="login-logo" />
              <h1 className="login-title">Team Grit</h1>
              <p className="login-subtitle">Code Review & Assignment Platform</p>
            </div>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}
              
              <button type="submit" className="btn btn-primary btn-lg login-button">
                Sign In
              </button>
            </form>
            
            <div className="login-footer">
              <p className="login-help">Enter your email to access the platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
