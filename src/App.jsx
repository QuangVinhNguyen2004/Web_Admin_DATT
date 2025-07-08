import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import LayoutAdmin from './LayoutAdmin';

import Login from './login';
import Register from './Register';
import Home from './home';
import PostManagement from './post';
import Statistics from './Statistics';
import UserManagement from './user';
import Support from './support';


function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Các route này KHÔNG nằm trong LayoutAdmin */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👇 Route mặc định chuyển đến login nếu không có token */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Mọi route nằm trong LayoutAdmin */}
        <Route path="/dashboard" element={<LayoutAdmin />}>
          <Route index element={<Home />} /> {/* / → Home */}
          <Route path="home" element={<Home />} />
          <Route path="quan-ly-nguoi-dung" element={<Home />} />
          <Route path="quan-ly-bai-dang" element={<PostManagement />} />
          <Route path="thong-ke" element={<Statistics />} />
          <Route path="ho-tro" element={<Support />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
