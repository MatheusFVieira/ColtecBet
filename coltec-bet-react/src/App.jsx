// Caminho: src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando todos os nossos componentes de estrutura
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Importando todas as nossas páginas
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ApostasPage from './pages/ApostasPage';
import AdminPage from './pages/AdminPage';
import SuportePage from './pages/SuportePage';
import AvisoLegalPage from './pages/AvisoLegalPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* A rota principal "/" renderiza o Layout, e todas as outras rotas são "filhas" dela, 
            sendo exibidas onde o <Outlet /> está no Layout. */}
        <Route path="/" element={<Layout />}>

          {/* --- Rotas Públicas --- */}
          {/* 'index' significa que esta é a página padrão para o caminho "/" */}
          <Route index element={<HomePage />} />
          <Route path="registrar" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="suporte" element={<SuportePage />} />
          <Route path="aviso-legal" element={<AvisoLegalPage />} />

          {/* --- Rotas Protegidas para Usuários Logados --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="apostas" element={<ApostasPage />} />
          </Route>
          
          {/* --- Rota Protegida exclusiva para Administradores --- */}
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;