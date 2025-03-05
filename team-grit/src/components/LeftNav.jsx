import React from 'react';

function LeftNav({ files, selectedFile, onFileSelect }) {
  return (
    <div style={{ width: '20%', borderRight: '1px solid #ccc', padding: '10px' }}>
      <h3>Files</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {files.map(file => (
          <li 
            key={file.id}
            onClick={() => onFileSelect(file.id)}
            style={{
              cursor: 'pointer',
              fontWeight: file.id === selectedFile ? 'bold' : 'normal'
            }}
          >
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeftNav;
