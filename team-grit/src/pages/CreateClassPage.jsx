import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './CreateClassPage.css';

function CreateClassPage({ teacherID, addClass }) {
  const navigate = useNavigate();
  const [className, setClassName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [classTerm, setClassTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const teacher = teacherID;
  
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!className.trim()) {
      setError('Please enter a class name.');
      return;
    }

    const newClass = {
      code : classCode, // Replace with input or generated value as needed
      name : className,
      term : classTerm,
      start_date : startDate,
      end_date : endDate,
      teacher : teacher, 
      students : [
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21
    ]

      // id : 10 // Replace with input or default value
      // Remove "roster" if the API does not expect it, or handle it separately if needed
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/classes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClass),
      });

      if (!response.ok) {
        throw new Error('Failed to create class');
      }

      const createdClass = await response.json();

      // Optionally update the global state if you have an addClass prop
      if (addClass) {
        addClass(createdClass);
      }

      // Replace current history entry instead of adding new one
      navigate('/classes', { replace: true });
    } catch (err) {
      console.error('Error creating class:', err);
      setError('An error occurred while creating the class.');
    }
  };

  return (
    <div className="create-class-page">
      <BackButton to="/classes" />
      <h2>Create New Class</h2>
      <form className="create-class-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Class Name:</label>
          <input 
            type="text" 
            value={className} 
            onChange={(e) => setClassName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Class Code (e.g CSC 101):</label>
          <textarea 
            type="text" 
            value={classCode} 
            onChange={(e) => setClassCode(e.target.value)} 
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Class Term (e.g Winter 2025):</label>
          <textarea 
            type="text" 
            value={classTerm} 
            onChange={(e) => setClassTerm(e.target.value)} 
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Select Start Date:</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label>Select End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="header-button">Create Class</button>
      </form>
    </div>
  );
}

export default CreateClassPage;
