import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AssignmentList from '../components/AssignmentList';
import './AssignmentListPage.css'

function AssignmentListPage() {
    // extract classID from url
    const { classId } = useParams();
    // state vars
    const [assignments, setAssignments] = useState([])
    // used to switch pages
    const navigate = useNavigate();

    useEffect(() => {
        // temporary get assignments
        setAssignments([
          { id: 'assign1', title: 'Assignment 1' },
          { id: 'assign2', title: 'Assignment 2' }
        ]);
      }, [classId]);

    const handleSelectAssignment = (assignmentId) => {
        navigate(`/code/${assignmentId}`);
    };

    return (
        <div className='assignment-list-page'>
            <h2>Assignments for {classId}</h2>
            <div className='assignment-list'>
            <AssignmentList assignments={assignments} onSelectAssignment={handleSelectAssignment} />
            </div>
        </div>
    );
}

export default AssignmentListPage;