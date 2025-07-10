import React from 'react';
import './AssignmentList.css';

function AssignmentList({ assignments, onSelectAssignment }) {
  assignments.map(assignment => {
    const sub_date = new Date(assignment.submission_deadline);
    const rel_date = new Date(assignment.release_date);
    const com_date = new Date(assignment.commenting_deadline);
    assignment.submission_deadline = sub_date.toLocaleString();
    assignment.release_date = rel_date.toLocaleDateString();
    assignment.commenting_deadline = com_date.toLocaleString();
});

  if (assignments.length === 0) {
    return (
      <div className="assignments-empty">
        <div className="empty-icon">📝</div>
        <h3 className="empty-title">No assignments yet</h3>
        <p className="empty-description">Assignments will appear here when they are created.</p>
      </div>
    );
  }

  return (
    <div className="assignments-container">
      <div className="assignments-header">
        <h3 className="assignments-title">Assignments</h3>
        <span className="assignments-count">{assignments.length} assignment{assignments.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="assignments-grid">
        {assignments.map(assignment => {
          const now = new Date();
          const releaseDate = new Date(assignment.release_date);
          const submissionDate = new Date(assignment.submission_deadline);
          const commentingDate = new Date(assignment.commenting_deadline);
          
          let status = 'upcoming';
          if (now >= commentingDate) {
            status = 'completed';
          } else if (now >= submissionDate) {
            status = 'commenting';
          } else if (now >= releaseDate) {
            status = 'active';
          }
          
          return (
            <div 
              key={assignment.id} 
              className={`assignment-card card ${status}`}
              onClick={() => onSelectAssignment(assignment.id)}
            >
              <div className="assignment-header">
                <h4 className="assignment-name">{assignment.name}</h4>
                <span className={`assignment-status status-${status}`}>
                  {status === 'upcoming' && '⏳ Upcoming'}
                  {status === 'active' && '🟢 Active'}
                  {status === 'commenting' && '💬 Review Phase'}
                  {status === 'completed' && '✅ Completed'}
                </span>
              </div>
              
              <p className="assignment-description">{assignment.description}</p>
              
              <div className="assignment-dates">
                <div className="date-item">
                  <span className="date-label">Released:</span>
                  <span className="date-value">{assignment.release_date}</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Due:</span>
                  <span className="date-value">{assignment.submission_deadline}</span>
                </div>
                <div className="date-item">
                  <span className="date-label">Comments Due:</span>
                  <span className="date-value">{assignment.commenting_deadline}</span>
                </div>
              </div>
              
              <div className="assignment-footer">
                <span className="assignment-action">View Assignment →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AssignmentList;
