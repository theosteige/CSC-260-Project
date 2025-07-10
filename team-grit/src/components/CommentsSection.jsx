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
      <div className="comments-header">
        <h3 className="comments-title">
          <span className="comments-icon">💬</span>
          Comments
        </h3>
        {comments.length > 0 && (
          <span className="comments-count">{comments.length}</span>
        )}
      </div>
      
      {selectedFile && selectedUser ? (
        <div className="file-context">
          <div className="context-info">
            <span className="context-file">
              <span className="file-icon">📝</span>
              {selectedFile.name}
            </span>
            <span className="context-separator">•</span>
            <span className="context-user">
              <span className="user-icon">👤</span>
              {selectedUser.name}
            </span>
          </div>
        </div>
      ) : (
        <div className="no-selection">
          <div className="no-selection-icon">📁</div>
          <p className="no-selection-text">Select a file to view and add comments</p>
        </div>
      )}
      
      <div className="comments-content">
        {loading ? (
          <div className="comments-loading">
            <div className="loading-spinner"></div>
            <p>Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          selectedFile && selectedUser ? (
            <div className="comments-empty">
              <div className="empty-icon">💬</div>
              <p className="empty-text">No comments yet. Be the first to add one!</p>
            </div>
          ) : null
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-line">
                    <span className="line-icon">#</span>
                    Line {comment.line_number}
                  </span>
                  <span className="comment-author">
                    <span className="author-icon">👤</span>
                    User {comment.user}
                  </span>
                </div>
                <div className="comment-body">
                  <p className="comment-text">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {selectedFile && selectedUser && (
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="form-header">
            <h4 className="form-title">Add Comment</h4>
          </div>
          <div className="form-group">
            <label className="form-label">Line Number</label>
            <input
              type="number"
              value={commentLine}
              onChange={(e) => setCommentLine(e.target.value)}
              placeholder="Enter line number"
              className="form-input line-input"
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Comment</label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              className="form-textarea comment-input"
              rows="3"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary submit-comment">
            <span className="btn-icon">➕</span>
            Add Comment
          </button>
        </form>
      )}
    </div>
  );
}

export default CommentsSection;
