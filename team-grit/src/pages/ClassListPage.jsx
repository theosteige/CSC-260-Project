import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassList from '../components/ClassList';

function ClassListPage() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder for fetching classes from the backend
    setClasses([
      { id: 'class1', name: 'Math 101' },
      { id: 'class2', name: 'Physics 201' }
    ]);
  }, []);

  const handleSelectClass = (classId) => {
    navigate(`/assignments/${classId}`);
  };

  return (
    <div>
      <h2>Classes</h2>
      <ClassList classes={classes} onSelectClass={handleSelectClass} />
    </div>
  );
}

export default ClassListPage;
