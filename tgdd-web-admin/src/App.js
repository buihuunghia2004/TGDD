import { Route, BrowserRouter as Router, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';
import AdminManagerPage from './pages/AdminManagePage';
import LoginPage from './pages/LoginPage';
import CategoryPage from './pages/CategoryPage';

function App() {
  const selected = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(selected.data.accessToken);

  useEffect(() => {    
    setIsLogin(selected.data.accessToken);
  },[selected])
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="login" element={isLogin ? <Navigate to="/" replace /> : <LoginPage />} />
          {
            isLogin && (
                <Route path="/" element={<HomePage />} >
                  <Route index element={<Navigate to="/admin-manage" replace />} />
                  <Route path="admin-manage" element={<AdminManagerPage />} />
                  <Route path="categories" element={<CategoryPage />} />
                </Route>
            )  
          }
          <Route path="/*" element={<div><h1>404</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
