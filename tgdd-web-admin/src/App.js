import { Route, BrowserRouter as Router, Routes, useNavigate, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';

const RedirectToLogin = ({isLogin}) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate( isLogin ? '/admin-manage' : '/login');
  }, [navigate]);

  return null;
};

const ProtectedRoute = ({ isLogin, children }) => {
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ProtectedPublicRoute = ({ isLogin, children }) => {
  if (isLogin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

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
          <Route path="/" element={ <RedirectToLogin isLogin={isLogin} />} />
          {
            publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={
                  <ProtectedPublicRoute isLogin={isLogin}>
                    <Page />
                  </ProtectedPublicRoute>
              } />;
            })
          }
          {
            privateRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={
                  <ProtectedRoute isLogin={isLogin}>
                    <HomePage>
                      <Page />
                    </HomePage>
                  </ProtectedRoute>
              } />;
            })
          }
          <Route path="/*" element={<div><h1>404</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
