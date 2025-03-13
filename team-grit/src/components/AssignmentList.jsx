import React from 'react';

function AssignmentList({ assignments, onSelectAssignment }) {
  assignments.map(assignment => {
    const sub_date = new Date(assignment.submission_deadline);
    const rel_date = new Date(assignment.release_date);
    const com_date = new Date(assignment.commenting_deadline);
    assignment.submission_deadline = sub_date.toLocaleString();
    assignment.release_date = rel_date.toLocaleDateString();
    assignment.commenting_deadline = com_date.toLocaleString();
});

  return (
    <ul>
      {assignments.map(assignment => (
        <li 
          key={assignment.id} 
          onClick={() => onSelectAssignment(assignment.id)}
          style={{ cursor: 'pointer' }}
        >
          {assignment.name} | Assignment Released: {assignment.release_date} | Submission Due: {assignment.submission_deadline} | Comments Due: {assignment.commenting_deadline}
        </li>
      ))}
    </ul>
  );
}

export default AssignmentList;
