import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftNav from '../components/LeftNav';
import CodeSection from '../components/CodeSection';
import CommentsSection from '../components/CommentsSection';
import './CodeViewPage.css'
import BackButton from '../components/BackButton';

function CodeViewPage() {
  const { assignmentId } = useParams();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [codeContent, setCodeContent] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Placeholder for fetching files and comments for the given assignmentId
    const dummyFiles = [
      { id: 'student1-file1', name: 'student1' },
      { id: 'student2-file1', name: 'student2' }
    ];
    setFiles(dummyFiles);
    if (dummyFiles.length > 0) {
      setSelectedFile(dummyFiles[0].id);
      setCodeContent('// Code for ' + dummyFiles[0].id);
    }
    setComments([
      { id: 'comment1', author: 'Peer1', text: 'Great code!' },
      { id: 'comment2', author: 'Peer2', text: 'Consider refactoring this function.' }
    ]);
  }, [assignmentId]);

  const handleFileSelect = (fileId) => {
    setSelectedFile(fileId);
    // Update codeContent as necessary based on file selection
    setCodeContent('// Code for ' + fileId);
  };

  const handleCodeChange = (newCode) => {
    setCodeContent(newCode);
  };

  const handleAddComment = (commentText) => {
    const newComment = {
      id: 'comment' + (comments.length + 1),
      author: 'CurrentUser', // Replace with actual user data
      text: commentText,
    };
    setComments([...comments, newComment]);
  };

  return (
    <div className='code-view-page'>
      <BackButton />
      <LeftNav files={files} selectedFile={selectedFile} onFileSelect={handleFileSelect} />
      <CodeSection codeContent={codeContent} onCodeChange={handleCodeChange} />
      <CommentsSection comments={comments} onAddComment={handleAddComment} />
    </div>
  );
}

export default CodeViewPage;
