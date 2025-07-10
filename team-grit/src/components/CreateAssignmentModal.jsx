import React, { useState } from 'react';
import Modal from './Modal';
import './CreateAssignmentModal.css';

function CreateAssignmentModal({ isOpen, onClose, currentClass, addAssignment }) {
  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [submissionDeadline, setSubmissionDeadline] = useState('');
  const [commentingDeadline, setCommentingDeadline] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setAssignmentName('');
    setAssignmentDescription('');
    setReleaseDate('');
    setSubmissionDeadline('');
    setCommentingDeadline('');
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

    if (!assignmentName.trim()) {
      setError('Please enter an assignment name.');
      setIsLoading(false);
      return;
    }

    const newAssignment = {
      course: currentClass.id,
      name: assignmentName,
      description: assignmentDescription,
      release_date: releaseDate,
      submission_deadline: submissionDeadline,
      commenting_deadline: commentingDeadline
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/assignments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAssignment),
      });

      if (!response.ok) {
        throw new Error('Failed to create assignment');
      }

      const createdAssignment = await response.json();

      if (addAssignment) {
        addAssignment(createdAssignment);
      }

      resetForm();
      onClose();
    } catch (err) {
      console.error('Error creating assignment:', err);
      setError('An error occurred while creating the assignment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Assignment">
      <form className="create-assignment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Assignment Name:</label>
          <input
            type="text"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Assignment Description:</label>
          <textarea
            value={assignmentDescription}
            onChange={(e) => setAssignmentDescription(e.target.value)}
            required
            disabled={isLoading}
            rows={4}
          />
        </div>
        <div className="form-group">
          <label>Select Release Date:</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Select Submission Deadline:</label>
          <input
            type="date"
            value={submissionDeadline}
            onChange={(e) => setSubmissionDeadline(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Select Commenting Deadline:</label>
          <input
            type="date"
            value={commentingDeadline}
            onChange={(e) => setCommentingDeadline(e.target.value)}
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
            {isLoading ? 'Creating...' : 'Create Assignment'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateAssignmentModal;