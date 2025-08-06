// Caminho: src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando todos os nossos componentes de página e estrutura
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ApostasPage from './pages/ApostasPage';
import AdminPage from './pages/AdminPage';
import SuportePage from './pages/SuportePage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* A rota principal "/" renderiza o Layout, e todas as outras rotas são "filhas" dela */}
        <Route path="/" element={<Layout />}>

          {/* Páginas Públicas */}
          <Route index element={<HomePage />} /> {/* 'index' significa que esta é a página padrão para "/" */}
          <Route path="registrar" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="suporte" element={<SuportePage />} />

          {/* Rotas Protegidas para Usuários Logados */}
          <Route element={<ProtectedRoute />}>
            <Route path="apostas" element={<ApostasPage />} />
          </Route>
          
          {/* Rotas Protegidas para Administradores */}
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;