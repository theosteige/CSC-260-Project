import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AssignmentList from '../components/AssignmentList';
import './AssignmentListPage.css';
import '../components/BackButton';
import BackButton from '../components/BackButton';

function AssignmentListPage() {
    // state vars
    const [assignments, setAssignments] = useState([])
    // used to switch pages
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
        const classAssignments = json.filter(assignment => assignment.course === currentClass.id);
        setAssignments(classAssignments);
      }

    useEffect(() => {
        getAssignments(setAssignments);
      }, [currentClass.id]);

    const handleSelectAssignment = (assignmentId) => {
        navigate(`/code/${assignmentId}`);
    };

    return (
        <div className='assignment-list-page'>
            <BackButton />
            <h2>Assignments for {currentClass.name}</h2>
            {currentClass.description}
            <div className='assignment-list'>
            <AssignmentList assignments={assignments} onSelectAssignment={handleSelectAssignment} />
            </div>
        </div>
    );
}

export default AssignmentListPage;