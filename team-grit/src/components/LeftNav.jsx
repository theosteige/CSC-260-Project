import React, { Fragment } from 'react';
import './LeftNav.css';

function LeftNav({ files, groups, onFileSelect, onUserSelect, currentUser, selectedFile, selectedUser }) {

  const userInGroup = (group) => {
    const groupUserIds = group.users.map(user => user.id);
    return groupUserIds.includes(currentUser.id);
  }

  // only show groups the user is in (unless isTeacher)
  const renderGroups = groups
  .filter(group => currentUser.role === "teacher" || userInGroup(group)) // Only show the group the user is in unless they're a teacher
  .map(group => (
    <div key={group.id} className="group-container">
      <div className="group-header">
        <h4 className="group-title">
          <span className="group-icon">📚</span>
          Group {group.id}
        </h4>
        <span className="group-count">{group.users.length}</span>
      </div>
      <div className="users-list">
        {group.users.map(user => (
          <div 
            onClick={() => onUserSelect(user)} 
            key={user.id}
            className={`user-item ${selectedUser && selectedUser.id === user.id ? 'selected' : ''}`}
          >
            <span className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <span className="user-name">{user.name}</span>
            {selectedUser && selectedUser.id === user.id && (
              <span className="selected-indicator">✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  ));

  const renderFiles = files?.length > 0 
  ? files.map(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'txt';
      const getFileIcon = (ext) => {
        switch(ext) {
          case 'py': return '🐍';
          case 'js': case 'jsx': return '🟨';
          case 'java': return '☕';
          case 'cpp': case 'c': return '🔧';
          case 'html': return '🌐';
          case 'css': return '🎨';
          default: return '📄';
        }
      };
      
      return (
        <div 
          key={file.id} 
          onClick={() => onFileSelect(file)}
          className={`file-item ${selectedFile && selectedFile.id === file.id ? 'selected' : ''}`}
        >
          <div className="file-info">
            <span className="file-icon">{getFileIcon(fileExtension)}</span>
            <div className="file-details">
              <span className="file-name">{file.name}</span>
              <span className="file-meta">Submission {file.submission}</span>
            </div>
          </div>
          {selectedFile && selectedFile.id === file.id && (
            <span className="selected-indicator">✓</span>
          )}
        </div>
      );
    })
  : null;

  

  return (
    <div className="left-nav-container">
      <div className='left-nav'>
        <div className="nav-section">
          <div className="section-header">
            <h3 className="section-title">
              <span className="section-icon">👥</span>
              Groups & Users
            </h3>
          </div>
          <div className="groups-content">
            {groups.length === 0 ? (
              <div className="empty-state">
                <p className="empty-text">No groups available</p>
              </div>
            ) : (
              <div className="groups-list">
                {renderGroups}
              </div>
            )}
          </div>
        </div>
        
        <div className="nav-section">
          <div className="section-header">
            <h3 className="section-title">
              <span className="section-icon">📁</span>
              Files
            </h3>
            {files.length > 0 && (
              <span className="section-count">{files.length}</span>
            )}
          </div>
          <div className="files-content">
            {!selectedUser ? (
              <div className="no-user-selected">
                <div className="no-user-icon">👤</div>
                <p className="no-user-text">Select a user to view their files</p>
              </div>
            ) : files.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📄</div>
                <p className="empty-text">No files submitted yet</p>
              </div>
            ) : (
              <div className="files-list">
                {renderFiles}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftNav;
