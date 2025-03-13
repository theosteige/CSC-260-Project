import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateClassPage.css';

function CreateClassPage({ addClass }) {
  const navigate = useNavigate();
  const [className, setClassName] = useState('');
  const [roster, setRoster] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!className.trim()) {
      setError('Please enter a class name.');
      return;
    }

    // Process the roster: split by newline or comma and remove empty entries
    const rosterArray = roster
      .split(/[\n,]+/)
      .map(name => name.trim())
      .filter(name => name.length > 0);

    const newClass = {
      name: className,
      roster: rosterArray,
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
          <label>Class Roster (separated by newline or comma):</label>
          <textarea 
            value={roster} 
            onChange={(e) => setRoster(e.target.value)} 
            rows="5" 
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
