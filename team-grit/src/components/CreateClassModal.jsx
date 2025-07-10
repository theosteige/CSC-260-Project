import React, { useState } from 'react';
import Modal from './Modal';
import './CreateClassModal.css';

function CreateClassModal({ isOpen, onClose, teacherID, addClass }) {
  const [className, setClassName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [classTerm, setClassTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setClassName('');
    setClassCode('');
    setClassTerm('');
    setStartDate('');
    setEndDate('');
    setError('');
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!className.trim()) {
      setError('Please enter a class name.');
      setIsLoading(false);
      return;
    }

    const newClass = {
      code: classCode,
      name: className,
      term: classTerm,
      start_date: startDate,
      end_date: endDate,
      teacher: teacherID,
      students: [
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
      ]
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

      if (addClass) {
        addClass(createdClass);
      }

      resetForm();
      onClose();
    } catch (err) {
      console.error('Error creating class:', err);
      setError('An error occurred while creating the class.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Class">
      <form className="create-class-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Class Name:</label>
          <input 
            type="text" 
            value={className} 
            onChange={(e) => setClassName(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Class Code (e.g CSC 101):</label>
          <input 
            type="text" 
            value={classCode} 
            onChange={(e) => setClassCode(e.target.value)} 
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Class Term (e.g Winter 2025):</label>
          <input 
            type="text" 
            value={classTerm} 
            onChange={(e) => setClassTerm(e.target.value)} 
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Select Start Date:</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Select End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="button" onClick={handleClose} disabled={isLoading} className="cancel-button">
            Cancel
          </button>
          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'Creating...' : 'Create Class'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateClassModal;