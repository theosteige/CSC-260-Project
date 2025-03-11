import React, { useState } from 'react';
import './CommentsSection.css';

function CommentsSection({ comments, onAddComment }) {
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
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id}>
            On line {comment.line},<strong> {comment.author}</strong> said: {comment.text}
          </li>
        ))}
      </ul>
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
    </div>
  );
}

export default CommentsSection;
