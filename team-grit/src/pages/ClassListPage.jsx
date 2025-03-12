import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassList from '../components/ClassList';
import './ClassListPage.css';
import BackButton from '../components/BackButton';


function ClassListPage() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const getClasses = async (setClasses) => {
    const url = "http://localhost:8000/api/classes/";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    setClasses(json);
  }

  useEffect(() => {
    getClasses(setClasses);
  }, []);

  const handleSelectClass = (classId) => {
    navigate(`/assignments/${classId}`, { state: { currentClass: classes[parseInt(classId)-1] }});
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
