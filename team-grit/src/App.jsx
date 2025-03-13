import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ClassListPage from './pages/ClassListPage';
import AssignmentListPage from './pages/AssignmentListPage';
import CodeViewPage from './pages/CodeViewPage';
import CreateClassPage from './pages/CreateClassPage';
import CreateAssignmentPage from './pages/CreateAssignmentPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [classes, setClasses] = useState([]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleAddClass = (newClass) => {
    setClasses(prevClasses => [...prevClasses, newClass]);
  };

  const handleAddAssignment = (newAssignment) => {
    setClasses(prevAssignment => [...prevAssignment, newAssignment]);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />} 
        />
        <Route 
          path="/classes" 
          element={
            currentUser ? (
              <ClassListPage currentUser={currentUser} classes={classes} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/assignments/:classId" 
          element={
            currentUser ? (
              <AssignmentListPage currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/code/:assignmentId" 
          element={
            currentUser ? (
              <CodeViewPage currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/create-class" 
          element={
            currentUser && currentUser.role === 'teacher' ? (
              <CreateClassPage teacherID={currentUser.id} addClass={handleAddClass} />
            ) : (
              <Navigate to="/classes" />
            )
          } 
        />
        <Route 
          path="/create-assignent" 
          element={
            currentUser && currentUser.role === 'teacher' ? (
              <CreateAssignmentPage addAssignment={handleAddAssignment} />
            ) : (
              <Navigate to="/assignments/:classId" />
            )
          } 
        />
        <Route 
          path="*" 
          element={<Navigate to={currentUser ? "/classes" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
