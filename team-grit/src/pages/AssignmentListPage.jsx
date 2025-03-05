import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AssignmentList from '../components/AssignmentList';

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
        <div>
            <h2>Assignments for Class {classId}</h2>
            <AssignmentList assignments={assignments} onSelectAssignment={handleSelectAssignment} />
        </div>
    );
}