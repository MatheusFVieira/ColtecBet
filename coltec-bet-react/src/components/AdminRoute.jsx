// Dentro de src/components/AdminRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminRoute() {
  const { user } = useAuth();

  // A verificação agora é dupla: o usuário existe E ele tem a role 'Admin'?
  // O nome 'role' vem do que definimos no token JWT.
  if (!user || user.role !== 'Admin') {
    // Se não for admin, redireciona para a página principal.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;