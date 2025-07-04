import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './Register';
import LayoutAdmin from './LayoutAdmin';

import Home from './home';
import PostManagement from './post';
import Statistics from './Statistics';
import UserManagement from './user';
import Support from './support';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect / -> /home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes sử dụng LayoutAdmin */}
        <Route element={<LayoutAdmin />}>
          <Route path="/home" element={<Home />} />
          <Route path="/quan-ly-nguoi-dung" element={<UserManagement />} />
          <Route path="/quan-ly-bai-dang" element={<PostManagement />} />
          <Route path="/thong-ke" element={<Statistics />} />
          <Route path="/ho-tro" element={<Support />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
