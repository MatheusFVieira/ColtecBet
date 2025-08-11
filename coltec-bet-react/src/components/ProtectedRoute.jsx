import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  // Se ainda estamos verificando o token, mostramos uma mensagem de 'Carregando...'
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Só depois de terminar de carregar, verificamos se há um usuário
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se terminou de carregar e há um usuário, mostra a página
  return <Outlet />;
}

export default ProtectedRoute;