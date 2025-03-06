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
      <div className='left-nav'>
      <h3>Group Members</h3>
      <ul>
        {renderFiles}
      </ul>
      </div>
    </div>
  );
}

export default LeftNav;
