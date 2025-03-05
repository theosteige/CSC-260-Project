import React from 'react';
import './LeftNav.css';

function LeftNav({ files, selectedFile, onFileSelect }) {
  const renderFiles = files.map(file => {
    let className = 'left-nav-item';
    if (file.id === selectedFile) {
      className += ' selected';
    }
    return (
      <li
        key={file.id}
        onClick={() => onFileSelect(file.id)}
        className={className}
      >
        {file.name}
      </li>
    );
  });

  return (
    <div className="left-nav-container">
      <h3 className="left-nav-header">Group Members</h3>
      <ul className="left-nav-list">
        {renderFiles}
      </ul>
    </div>
  );
}

export default LeftNav;
