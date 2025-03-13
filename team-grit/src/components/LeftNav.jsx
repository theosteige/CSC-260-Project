import React from 'react';
import './LeftNav.css';

function LeftNav({ files, selectedFile, users, selectedUser, onFileSelect, onUserSelect }) {
  const renderFiles = files.map(file => {
    return (
      <li
        key={file.id}
        onClick={() => onFileSelect(file)}
      >
        {file.name}
      </li>
    );
  });

  const renderUsers = users.map(user => {
    return (
      <li
        key={user.id}
        onClick={() => onUserSelect(user)}
      >
        {user.name}
      </li>
    );
  });

  return (
    <div className="left-nav-container">
      <div className='left-nav'>
      <h3>Group Members</h3>
      <ul>
      {renderUsers}
      </ul>
      <h3>Files</h3>
      <ul>
      {renderFiles}
      </ul>
      </div>
    </div>
  );
}

export default LeftNav;
