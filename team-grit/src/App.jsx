import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ClassListPage from './pages/ClassListPage';
import AssignmentListPage from './pages/AssignmentListPage';
import CodeViewPage from './pages/CodeViewPage';


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    
    setCurrentUser(user);
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
              <ClassListPage currentUser={currentUser} />
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
            currentUser && currentUser.role === 'professor' ? (
              <CreateClassPage />
            ) : (
              <Navigate to="/classes" />
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