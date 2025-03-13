import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './CreateAssignmentPage.css';

function CreateAssignmentPage({ addAssignment }) {
  const navigate = useNavigate();
  const { classId } = useParams();
  const location = useLocation();
  // Retrieve the full current class from location state; fallback to an object with just id if not present
  const currentClass = location.state?.currentClass || { id: classId };

  const [assignmentName, setAssignmentName] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [submissionDeadline, setSubmissionDeadline] = useState('');
  const [commentingDeadline, setCommentingDeadline] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assignmentName.trim()) {
      setError('Please enter an assignment name.');
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

    console.log(JSON.stringify(newAssignment));

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

      // Navigate back to the assignment list page, passing the full currentClass object
      navigate(`/assignments/${currentClass.id}`, { state: { currentClass } });
    } catch (err) {
      console.error('Error creating assignment:', err);
      setError('An error occurred while creating the assignment.');
    }
  };

  return (
    <div className="create-assignment-page">
      <div className="header">
        <button className="header-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
      <h2>Create New Assignment</h2>
      <form className="create-assignment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Assignment Name:</label>
          <input
            type="text"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Assignment Description:</label>
          <textarea
            type="text"
            value={assignmentDescription}
            onChange={(e) => setAssignmentDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Select Release Date:</label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Select Submission Deadline:</label>
          <input
            type="date"
            value={submissionDeadline}
            onChange={(e) => setSubmissionDeadline(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Select Commenting Deadline:</label>
          <input
            type="date"
            value={commentingDeadline}
            onChange={(e) => setCommentingDeadline(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="header-button">
          Create Assignment
        </button>
      </form>
    </div>
  );
}

export default CreateAssignmentPage;

