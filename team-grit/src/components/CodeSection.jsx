import React from 'react';
import './CodeSection.css';

function CodeSection({ codeContent, onCodeChange }) {
  const handleChange = (e) => {
    onCodeChange(e.target.value);
  };

  return (
    <div className="code-section-container">
      <h3>Code Editor</h3>
      <textarea
        value={codeContent}
        onChange={handleChange}
        className="code-editor-textarea"
      />
    </div>
  );
}

export default CodeSection;
