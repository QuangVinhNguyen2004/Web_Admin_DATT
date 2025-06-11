// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './Register';
import Home from './home';
import PostManagement from './post';
import Statistics from './Statistics';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/quan-ly-bai-dang" element={<PostManagement />} />
        <Route path="/thong-ke" element={<Statistics />} />
        
      </Routes>
    </Router>
  );
}

export default App;
