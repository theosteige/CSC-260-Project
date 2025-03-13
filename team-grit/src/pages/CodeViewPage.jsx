import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftNav from '../components/LeftNav';
import CodeSection from '../components/CodeSection';
import CommentsSection from '../components/CommentsSection';
import './CodeViewPage.css'
import BackButton from '../components/BackButton';

function CodeViewPage() {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [files, setFiles] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [codeContent, setCodeContent] = useState('');
  const [comments, setComments] = useState([]);

  const getSubmissions = async (setSubmissions) => {
    const url = "http://localhost:8000/api/submit/";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const assignmentSubmissions = json.filter(submission => submission.assignment === parseInt(assignmentId));
    setSubmissions(assignmentSubmissions);
  }

  const getUsers = async (setUsers) => {
    const url = "http://localhost:8000/api/students/";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    let groupUserIds = [];
    submissions.forEach(submission => groupUserIds.push(submission.user));

    const releventUsers = json.filter(user => groupUserIds.includes(user.id));
    
    setUsers(releventUsers);
  }

  useEffect(() => {
    getSubmissions(setSubmissions);
  }, [assignmentId]);
  
  useEffect(() => {
    getUsers(setUsers);
  }, [submissions]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setCodeContent(file.content);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    const userFiles = submissions.filter(submission => submission.user === user.id)[0].files;
    setFiles(userFiles);
  };

  const handleCodeChange = (newCode) => {
    setCodeContent(newCode);
  };

  const handleAddComment = (commentText, commentLine) => {
    const newComment = {
      id: 'comment' + (comments.length + 1),
      author: 'CurrentUser', // Replace with actual user data
      text: commentText,
      line: commentLine
    };
    setComments([...comments, newComment]);
  };

  return (
    <div className='code-view-page'>
      <BackButton />
      <LeftNav files={files} selectedFile={selectedFile} users={users} selectedUser={selectedUser} onFileSelect={handleFileSelect} onUserSelect={handleUserSelect}/>
      <CodeSection codeContent={codeContent} onCodeChange={handleCodeChange} />
      <CommentsSection comments={comments} onAddComment={handleAddComment} />
    </div>
  );
}

export default CodeViewPage;
