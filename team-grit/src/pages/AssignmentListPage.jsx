import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AssignmentList from '../components/AssignmentList';
import './AssignmentListPage.css';
import BackButton from '../components/BackButton';

function AssignmentListPage({ currentUser }) {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const currentClass = location.state.currentClass;

  const getAssignments = async (setAssignments) => {
    const url = "http://localhost:8000/api/assignments/";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const classAssignments = json.filter(
      (assignment) => assignment.course === currentClass.id
    );
    setAssignments(classAssignments);
  };

  useEffect(() => {
    getAssignments(setAssignments);
  }, [currentClass.id]);

  const handleSelectAssignment = (assignmentId) => {
    navigate(`/code/${assignmentId}`);
  };

  const handleAddAssignment = () => {
    console.log(currentClass.id);
    navigate(`/create-assignment/${currentClass.id}`);
  };

  return (
    <div className="assignment-list-page">
      <div className="header">
        <BackButton />
        {currentUser.role === 'teacher' && (
          <button className="header-button" onClick={handleAddAssignment}>
            Add Assignment
          </button>
        )}
      </div>
      <h2>Assignments for {currentClass.name}</h2>
      {currentClass.description}
      <div className="assignment-list">
        <AssignmentList
          assignments={assignments}
          onSelectAssignment={handleSelectAssignment}
        />
      </div>
    </div>
  );
}

export default AssignmentListPage;
