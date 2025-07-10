import React, { useRef } from 'react';
import './CodeSection.css';

function CodeSection({ onCodeChange, codeContent, onFileUpload, comments = [] }) {
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target.result;
        onCodeChange(fileContent);
        
        // If onFileUpload is provided, call it to save to backend
        if (onFileUpload) {
          onFileUpload(file, fileContent);
        }
      };

      reader.readAsText(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Get line numbers that have comments
  const commentedLines = new Set(
    comments.map(comment => comment.line_number).filter(line => line)
  );

  const renderCodeLines = () => {
    if (!codeContent) return null;
    
    return codeContent.split('\n').map((lineContent, index) => {
      const lineNumber = index + 1;
      const isCommented = commentedLines.has(lineNumber);
      
      return (
        <div 
          key={lineNumber} 
          className={`code-line ${isCommented ? 'commented' : ''}`}
        >
          <span className="line-number">{lineNumber}</span>
          <span className="line-content">{lineContent}</span>
        </div>
      );
    });
  };

  return (
    <div className="code-section-container">
      <h3>Code Editor</h3>
      <button onClick={handleButtonClick}>
        Upload File
      </button>
      <input
        type="file"
        style={{ display: 'none' }}
        accept=".py, .java, .txt"
        onChange={handleChange}
        ref={fileInputRef}
      />
      <div className='code-section-textarea'>
        <pre>{renderCodeLines()}</pre>
      </div>
    </div>
  );
}

export default CodeSection;
