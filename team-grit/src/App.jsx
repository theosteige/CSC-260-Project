import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ClassListPage from './pages/ClassListPage';
import AssignmentListPage from './pages/AssignmentListPage';
import CodeViewPage from './pages/CodeViewPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLoginSuccess = () => {
      setIsAuthenticated(true);
    };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/classes" element={isAuthenticated ? <ClassListPage /> : <Navigate to="/login" />} />
        <Route path="/assignments/:classId" element={isAuthenticated ? <AssignmentListPage /> : <Navigate to="/login" />} />
        <Route path="/code/:assignmentId" element={isAuthenticated ? <CodeViewPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/classes" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
