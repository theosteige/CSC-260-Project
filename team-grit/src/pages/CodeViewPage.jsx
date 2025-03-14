import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftNav from '../components/LeftNav';
import CodeSection from '../components/CodeSection';
import CommentsSection from '../components/CommentsSection';
import './CodeViewPage.css'
import BackButton from '../components/BackButton';

function CodeViewPage({ currentUser }) {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [groups, setGroups] = useState([]);

  const [selectedSubmission, setSelectedSubmission] = useState([]);
  const [files, setFiles] = useState([]);

  const [codeContent, setCodeContent] = useState('');
  const [comments, setComments] = useState([]);

  const getSubmissions = async (setSubmissions) => {
    const url = "http://127.0.0.1:8000/api/assignments/"+ assignmentId +"/submissions/";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    setSubmissions(json);
  }

  const getGroups = async (setGroups) => {
    const url = "http://127.0.0.1:8000/api/assignments/"+ assignmentId + "/groups/";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json(); 
    setGroups(json);
  }

  const getUserSubmission = async (setFiles, assignmentId, selectedUserId) => {
    const url = "http://127.0.0.1:8000/api/assignments/"+assignmentId+"/submissions/?student="+selectedUserId+"&current=true";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json(); 
    setSelectedSubmission(json);
  }

  useEffect(() => {
    getSubmissions(setSubmissions);
    getGroups(setGroups);
  }, [assignmentId]);

  const handleFileSelect = (file) => {
    setCodeContent(file.content);
  };

  const handleUserSelect = (user) => {
    getUserSubmission(setSelectedSubmission, assignmentId, user.id);
    const userFiles = ((selectedSubmission.length > 0) ? selectedSubmission[0].files : null);
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
      <LeftNav files={files} groups={groups} onFileSelect={handleFileSelect} onUserSelect={handleUserSelect} currentUser={currentUser}/>
      <CodeSection codeContent={codeContent} onCodeChange={handleCodeChange} />
      <CommentsSection comments={comments} onAddComment={handleAddComment} />
    </div>
  );
}

export default CodeViewPage;
