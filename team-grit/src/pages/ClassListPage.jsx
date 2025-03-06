import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassList from '../components/ClassList';
import './ClassListPage.css';
import BackButton from '../components/BackButton';


function ClassListPage() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder for fetching classes from the backend
    setClasses([
      { id: 1, name: 'Math 101' },
      { id: 2, name: 'Physics 201' }
    ]);
  }, []);

  const handleSelectClass = (classId) => {
    navigate(`/assignments/${classId}`, { state: { currentClass: classes[parseInt(classId)-1]['name'] }});
  };

  return (
    <div className='class-list-page'>
      <BackButton />
      <h2>Classes</h2>
      <div className='class-list'>
      <ClassList classes={classes} onSelectClass={handleSelectClass} />
      </div>
    </div>
  );
}

export default ClassListPage;
