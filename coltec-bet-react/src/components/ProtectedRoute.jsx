// Dentro de src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Este componente é o nosso "segurança"
function ProtectedRoute() {
  const { user } = useAuth(); // Usamos nosso hook para ver se há um usuário logado

  // Se NÃO houver usuário, redirecionamos para a página de login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se houver um usuário, renderizamos o conteúdo da rota filha
  // O <Outlet /> é um placeholder para onde o componente da página protegida (ex: HomePage) será inserido
  return <Outlet />;
}

export default ProtectedRoute;