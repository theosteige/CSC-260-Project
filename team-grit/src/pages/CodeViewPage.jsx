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
  // files for one user V
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

  const getUserSubmissions = async (assignmentId, selectedUserId) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/submit/');
      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }
      const submissions = await response.json();
      // Convert assignmentId and selectedUserId to numbers in case they are strings
      const filteredSubmissions = submissions.filter(item =>
        item.assignment === Number(assignmentId) && item.user === Number(selectedUserId)
      );
      return filteredSubmissions;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  

  useEffect(() => {
    getSubmissions(setSubmissions);
    getGroups(setGroups);
  }, [assignmentId]);
  
  //////
  const handleFileSelect = (file) => {
    setCodeContent(file.content);
  };

  const handleUserSelect = async (user) => {
    // Await the filtered submissions from the API call
    const filteredSubmissions = await getUserSubmissions(assignmentId, user.id);
    const currentUserFiles = filteredSubmissions.flatMap(submission => submission.files || []);
    // console.log(currentUserFiles);
    setFiles(currentUserFiles);
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
