import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftNav from '../components/LeftNav';
import CodeSection from '../components/CodeSection';
import CommentsSection from '../components/CommentsSection';
import './CodeViewPage.css'
import BackButton from '../components/BackButton';

function CodeViewPage({ currentUser }) {
  const { assignmentId } = useParams();
  const [groups, setGroups] = useState([]);
  // files for one user V
  const [files, setFiles] = useState([]);
  const [codeContent, setCodeContent] = useState('');
  const [comments, setComments] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);



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
    const fetchGroups = async () => {
      const url = `http://127.0.0.1:8000/api/assignments/${assignmentId}/groups/`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setGroups(json);
    };

    fetchGroups();
  }, [assignmentId]);
  
  //////
  const fetchComments = async (fileId) => {
    try {
      setLoadingComments(true);
      const response = await fetch(`http://127.0.0.1:8000/api/comments/?submission_file=${fileId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const commentsData = await response.json();
      setComments(prev => ({ ...prev, [fileId]: commentsData }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments(prev => ({ ...prev, [fileId]: [] }));
    } finally {
      setLoadingComments(false);
    }
  };

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setCodeContent(file.content);
    
    // Load comments for this file if not already loaded
    if (!comments[file.id]) {
      await fetchComments(file.id);
    }
  };

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    // Await the filtered submissions from the API call
    const filteredSubmissions = await getUserSubmissions(assignmentId, user.id);
    const currentUserFiles = filteredSubmissions.flatMap(submission => submission.files || []);
    // console.log(currentUserFiles);
    setFiles(currentUserFiles);
    
    // Auto-select first file if available
    if (currentUserFiles.length > 0) {
      await handleFileSelect(currentUserFiles[0]);
    } else {
      // Clear selections if no files
      setSelectedFile(null);
      setCodeContent('');
    }
  };
  

  const handleCodeChange = (newCode) => {
    setCodeContent(newCode);
  };

  const handleFileUpload = async (file, fileContent) => {
    if (!currentUser) {
      console.error('No current user for file upload');
      return;
    }

    try {
      // Get or create submission for current user
      let userSubmission = await getUserSubmissions(assignmentId, currentUser.id);
      
      if (userSubmission.length === 0) {
        // Create new submission
        const newSubmission = {
          assignment: parseInt(assignmentId),
          user: currentUser.id,
          submitted_at: new Date().toISOString(),
          is_current: true
        };
        
        const submissionResponse = await fetch('http://127.0.0.1:8000/api/submit/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSubmission)
        });
        
        if (!submissionResponse.ok) {
          throw new Error('Failed to create submission');
        }
        
        const savedSubmission = await submissionResponse.json();
        userSubmission = [savedSubmission];
      }

      // Add file to submission
      const fileData = {
        name: file.name,
        submission: userSubmission[0].id,
        content: fileContent
      };

      const fileResponse = await fetch('http://127.0.0.1:8000/api/addfile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fileData)
      });

      if (!fileResponse.ok) {
        throw new Error('Failed to upload file');
      }

      const savedFile = await fileResponse.json();
      
      // Refresh file list from backend to ensure consistency
      const updatedSubmissions = await getUserSubmissions(assignmentId, currentUser.id);
      const updatedFiles = updatedSubmissions.flatMap(submission => submission.files || []);
      setFiles(updatedFiles);
      
      // Auto-select the uploaded file
      setSelectedFile(savedFile);
      setSelectedUser(currentUser);
      
      console.log('File uploaded successfully:', savedFile);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleAddComment = async (commentText, commentLine) => {
    if (!selectedFile || !selectedUser || !currentUser) {
      console.error('Cannot add comment: missing file, user, or current user');
      return;
    }

    try {
      // Find the submission ID for the selected file
      const submission = await getUserSubmissions(assignmentId, selectedUser.id);
      const fileSubmission = submission.find(sub => 
        sub.files && sub.files.some(file => file.id === selectedFile.id)
      );
      
      if (!fileSubmission) {
        throw new Error('Could not find submission for selected file');
      }

      const newComment = {
        submission: fileSubmission.id,
        submission_file: selectedFile.id,
        line_number: parseInt(commentLine),
        user: currentUser.id,
        comment: commentText,
        comment_type: 'file'
      };

      const response = await fetch('http://127.0.0.1:8000/api/comments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment)
      });

      if (!response.ok) {
        throw new Error('Failed to save comment');
      }

      const savedComment = await response.json();
      
      // Update local state
      setComments(prev => ({
        ...prev,
        [selectedFile.id]: [...(prev[selectedFile.id] || []), savedComment]
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className='page code-view-page'>
      <div className="code-view-header">
        <BackButton />
        <h1 className="code-view-title">Code Review</h1>
      </div>
      <div className="code-view-content">
        <LeftNav 
          files={files} 
          groups={groups} 
          onFileSelect={handleFileSelect} 
          onUserSelect={handleUserSelect} 
          currentUser={currentUser}
          selectedFile={selectedFile}
          selectedUser={selectedUser}
        />
        <CodeSection 
          codeContent={codeContent} 
          onCodeChange={handleCodeChange} 
          onFileUpload={handleFileUpload}
          comments={selectedFile ? comments[selectedFile.id] || [] : []}
        />
        <CommentsSection 
          comments={selectedFile ? comments[selectedFile.id] || [] : []} 
          onAddComment={handleAddComment} 
          loading={loadingComments}
          selectedFile={selectedFile}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
}

export default CodeViewPage;
