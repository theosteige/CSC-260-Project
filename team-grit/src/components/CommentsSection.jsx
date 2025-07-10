import React, { useState } from 'react';
import './CommentsSection.css';

function CommentsSection({ comments, onAddComment, loading, selectedFile, selectedUser }) {
  const [commentText, setCommentText] = useState('');
  const [commentLine, setCommentLine] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() && parseInt(commentLine)) {
      onAddComment(commentText, commentLine);
      setCommentLine('');
      setCommentText('');
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {selectedFile && selectedUser && (
        <p className="file-info">
          Viewing comments for <strong>{selectedFile.name}</strong> by <strong>{selectedUser.name}</strong>
        </p>
      )}
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              On line {comment.line_number}, <strong>User {comment.user}</strong> said: {comment.comment}
            </li>
          ))}
        </ul>
      )}
      {selectedFile && selectedUser ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={commentLine}
            onChange={(e) => setCommentLine(e.target.value)}
            placeholder="Enter a line number"
            className="comment-linearea"
          />
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
            className="comment-textarea"
          />
          <button type="submit" className="submit-button">
            Submit Comment
          </button>
        </form>
      ) : (
        <p className="no-file-selected">Select a file to add comments</p>
      )}
    </div>
  );
}

export default CommentsSection;
