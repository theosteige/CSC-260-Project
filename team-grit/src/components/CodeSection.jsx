import React from 'react';

function CodeSection({ codeContent, onCodeChange }) {
  const handleChange = (e) => {
    onCodeChange(e.target.value);
  };

  return (
    <div style={{ width: '50%', padding: '10px' }}>
      <h3>Code Editor</h3>
      <textarea
        value={codeContent}
        onChange={handleChange}
        style={{ width: '100%', height: '80vh' }}
      />
    </div>
  );
}

export default CodeSection;
