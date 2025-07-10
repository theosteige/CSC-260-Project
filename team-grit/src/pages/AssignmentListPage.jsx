import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AssignmentList from '../components/AssignmentList';
import CreateAssignmentModal from '../components/CreateAssignmentModal';
import './AssignmentListPage.css';
import BackButton from '../components/BackButton';

function AssignmentListPage({ currentUser }) {
  const [assignments, setAssignments] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentClass = location.state.currentClass; // full class object with id, name, description, etc.

  useEffect(() => {
    const fetchAssignments = async () => {
      const url = `http://127.0.0.1:8000/api/classes/${currentClass.id}/assignments/`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setAssignments(json);
    };

    fetchAssignments();
  }, [currentClass.id]);

  const handleSelectAssignment = (assignmentId) => {
    navigate(`/code/${assignmentId}`);
  };

  const handleAddAssignment = (newAssignment) => {
    setAssignments(prevAssignments => [...prevAssignments, newAssignment]);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className='page assignment-list-page'>
      <div className="container">
        <header className="page-header">
          <div className="header-content">
            <div className="header-left">
              <BackButton />
              <div className="header-text">
                <h1 className="page-title">{currentClass.name}</h1>
                <p className="page-subtitle">Assignments & Code Reviews</p>
              </div>
            </div>
            {currentUser.role === 'teacher' && (
              <button className="btn btn-primary" onClick={handleOpenCreateModal}>
                <span className="btn-icon">➕</span>
                Add Assignment
              </button>
            )}
          </div>
        </header>
        
        <main className="assignments-content">
          <div className="class-info-card card">
            <div className="class-details">
              <div className="class-code-badge">{currentClass.code}</div>
              <h3 className="class-title">{currentClass.name}</h3>
              <p className="class-description">{currentClass.description}</p>
            </div>
          </div>
          
          <div className="assignments-section">
            <AssignmentList
              assignments={assignments}
              onSelectAssignment={handleSelectAssignment}
            />
          </div>
        </main>
        
        <CreateAssignmentModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          currentClass={currentClass}
          addAssignment={handleAddAssignment}
        />
      </div>
    </div>
  );
}

export default AssignmentListPage;
