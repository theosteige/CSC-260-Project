import React from 'react';

function AssignmentList({ assignments, onSelectAssignment }) {
  return (
    <ul>
      {assignments.map(assignment => (
        <li 
          key={assignment.id} 
          onClick={() => onSelectAssignment(assignment.id)}
          style={{ cursor: 'pointer' }}
        >
          {assignment.title} | Due: {assignment.due}
        </li>
      ))}
    </ul>
  );
}

export default AssignmentList;
