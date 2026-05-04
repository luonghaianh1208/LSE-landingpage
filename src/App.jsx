import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppBody from './AppBody';
import Login from './pages/Login';
import AdminLayout from './pages/AdminLayout';
import AdminLeads from './pages/AdminLeads';
import AdminProducts from './pages/AdminProducts';
import AdminContent from './pages/AdminContent';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppBody />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/leads" replace />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="content" element={<AdminContent />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
