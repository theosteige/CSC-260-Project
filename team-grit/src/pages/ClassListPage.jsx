import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './ClassListPage.css';

function ClassListPage({ currentUser }) {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch classes from your Django backend
    fetch('http://127.0.0.1:8000/api/classes/')
      .then(response => response.json())
      .then(data => setClasses(data))
      .catch(error => console.error('Error fetching classes:', error));
  }, []);

  const handleSelectClass = (classId) => {
    const selectedClass = classes.find((c) => c.id === classId);
    navigate(`/assignments/${classId}`, { state: { currentClass: selectedClass } });
  };

  return (
    <div className="class-list-page">
      <div className="header">
        <BackButton />
        {currentUser.role === 'teacher' && (
          <button className="header-button">
            Add Class
          </button>
        )}
      </div>
      <h2>Classes</h2>
      <div className="class-list">
        <ul>
          {classes.map(cls => (
            <li
              key={cls.id}
              onClick={() => handleSelectClass(cls.id)}
              style={{ cursor: 'pointer' }}
            >
              {cls.code} - {cls.name} ({cls.term})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClassListPage;