import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AssignmentList from '../components/AssignmentList';
import './AssignmentListPage.css';
import BackButton from '../components/BackButton';

function AssignmentListPage({ currentUser }) {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const currentClass = location.state.currentClass; // full class object with id, name, description, etc.

  const getAssignments = async (setAssignments) => {
    const url = "http://127.0.0.1:8000/api/classes/" + currentClass.id + "/assignments/";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    setAssignments(json);
  };

  useEffect(() => {
    getAssignments(setAssignments);
  }, [currentClass.id]);

  const handleSelectAssignment = (assignmentId) => {
    navigate(`/code/${assignmentId}`);
  };

  const handleAddAssignment = () => {
    // Pass the full currentClass object to the create-assignment page
    navigate(`/create-assignment/${currentClass.id}`, { state: { currentClass } });
  };

  return (
    <div className='assignment-list-page'>
      <div className="header">
        <BackButton />
        {currentUser.role === 'teacher' && (
          <button className="header-button" onClick={handleAddAssignment}>
            Add Assignment
          </button>
        )}
      </div>
      <h2>Assignments for {currentClass.name}</h2>
      <p>{currentClass.description}</p>
      <div className='assignment-list'>
        <AssignmentList
          assignments={assignments}
          onSelectAssignment={handleSelectAssignment}
        />
      </div>
    </div>
  );
}

export default AssignmentListPage;
