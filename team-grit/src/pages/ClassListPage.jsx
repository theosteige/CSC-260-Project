import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import CreateClassModal from '../components/CreateClassModal';
import './ClassListPage.css';

function ClassListPage({ currentUser }) {
  const [classes, setClasses] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch classes from the Django backend
    fetch(`http://127.0.0.1:8000/api/classes/?${currentUser.role}=${currentUser.id}`)
      .then(response => response.json())
      .then(data => setClasses(data))
      .catch(error => console.error('Error fetching classes:', error));
  }, [currentUser.id, currentUser.role]);

  const handleSelectClass = (classId) => {
    const selectedClass = classes.find((c) => c.id === classId);
    navigate(`/assignments/${classId}`, { state: { currentClass: selectedClass } });
  };

  const handleAddClass = (newClass) => {
    setClasses(prevClasses => [...prevClasses, newClass]);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="page class-list-page">
      <div className="container">
        <header className="page-header">
          <div className="header-content">
            <div className="header-left">
              <BackButton />
              <div className="header-text">
                <h1 className="page-title">My Classes</h1>
                <p className="page-subtitle">
                  {currentUser.role === 'teacher' ? 'Manage your courses and assignments' : 'View your enrolled classes'}
                </p>
              </div>
            </div>
            {currentUser.role === 'teacher' && (
              <button className="btn btn-primary" onClick={handleOpenCreateModal}>
                <span className="btn-icon">➕</span>
                Add Class
              </button>
            )}
          </div>
        </header>
        
        <main className="classes-content">
          {classes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3 className="empty-title">
                {currentUser.role === 'teacher' ? 'No classes created yet' : 'No classes enrolled'}
              </h3>
              <p className="empty-description">
                {currentUser.role === 'teacher' 
                  ? 'Create your first class to get started with assignments and code reviews.'
                  : 'You are not enrolled in any classes yet. Contact your instructor for enrollment.'}
              </p>
              {currentUser.role === 'teacher' && (
                <button className="btn btn-secondary" onClick={handleOpenCreateModal}>
                  Create Your First Class
                </button>
              )}
            </div>
          ) : (
            <div className="classes-grid">
              {classes.map(cls => (
                <div
                  key={cls.id}
                  className="class-card card"
                  onClick={() => handleSelectClass(cls.id)}
                >
                  <div className="class-header">
                    <div className="class-code">{cls.code}</div>
                    <div className="class-term">{cls.term}</div>
                  </div>
                  <h3 className="class-name">{cls.name}</h3>
                  <div className="class-meta">
                    <span className="class-dates">
                      {new Date(cls.start_date).toLocaleDateString()} - {new Date(cls.end_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="class-footer">
                    <span className="class-action">View Assignments →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        
        <CreateClassModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          teacherID={currentUser.id}
          addClass={handleAddClass}
        />
      </div>
    </div>
  );
}

export default ClassListPage;