import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AssignmentList from '../components/AssignmentList';
import './AssignmentListPage.css';
import '../components/BackButton';
import BackButton from '../components/BackButton';

function AssignmentListPage() {
    // extract classID from url
    const { classId } = useParams();
    // state vars
    const [assignments, setAssignments] = useState([])
    // used to switch pages
    const navigate = useNavigate();
    const location = useLocation();
    const currentClass = location.state.currentClass;

    useEffect(() => {
        // temporary get assignments
        setAssignments([
          { id: 1, title: 'Assignment 1', due: '3/6/25' },
          { id: 2, title: 'Assignment 2', due: '3/13/25' }
        ]);
      }, [classId]);

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