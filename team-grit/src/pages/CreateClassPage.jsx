import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateClassPage.css';

function CreateClassPage({ addClass }) {
  const navigate = useNavigate();
  const [className, setClassName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [classTerm, setClassTerm] = useState('');
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
      start_date : "2025-01-06T06:00:00Z",
      end_date : "2025-03-14T18:00:00Z",
      teacher : 1, 
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

    console.log(newClass)
    console.log(JSON.stringify(newClass))

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

      navigate('/classes');
    } catch (err) {
      console.error('Error creating class:', err);
      setError('An error occurred while creating the class.');
    }
  };

  return (
    <div className="create-class-page">
      <div className="header">
        <button className="header-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
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
        {error && <p className="error">{error}</p>}
        <button type="submit" className="header-button">Create Class</button>
      </form>
    </div>
  );
}

export default CreateClassPage;
