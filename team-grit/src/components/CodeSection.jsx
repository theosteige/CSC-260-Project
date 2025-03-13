import React, { useState, useRef } from 'react';
import './CodeSection.css';

function CodeSection({ onCodeChange, codeContent }) {
  const [code, setCode] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        setCode(e.target.result);
      };
  
      reader.readAsText(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  let lines = '';
  if (codeContent != '') {
    lines = codeContent.replace(/\\n/g, "\n").split('\n').flatMap((content, index) => index + 1 + '    ' + content + '\n' );
  }

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
      <pre>{lines}</pre>
      </div>
    </div>
  );
}

export default CodeSection;
