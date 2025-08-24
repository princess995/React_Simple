import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./state/AppContext";
import Header from "./components/Header";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import RegisterUser from "./routes/RegisterUser";
import ProfilePage from "./routes/ProfilePage";
import ProfileDetailPage from "./routes/ProfileDetailPage";

// 보호된 라우트 컴포넌트
function ProtectedRoute({ children }) {
  const { state } = useAppContext();
  
  if (!state.user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// 로그인된 사용자가 로그인 페이지에 접근할 때 리다이렉트
function PublicRoute({ children }) {
  const { state } = useAppContext();
  
  if (state.user) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
}

function App() {
  const { state } = useAppContext();

  return (
    <Router>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to="/home" replace />} 
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterUser />
            </PublicRoute>
          } 
        />
        <Route 
          path="/home" 
          element={<HomePage />}
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile/:id" 
          element={
            <ProtectedRoute>
              <ProfileDetailPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
