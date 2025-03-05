import React, { useState } from 'react';

function CommentsSection({ comments, onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText('');
    }
  };

  return (
    <div style={{ width: '30%', borderLeft: '1px solid #ccc', padding: '10px' }}>
      <h3>Comments</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.author}:</strong> {comment.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          style={{ width: '100%', height: '80px' }}
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
}

export default CommentsSection;
