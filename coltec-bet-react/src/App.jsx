// Dentro de src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage'; // Importamos a AdminPage
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute'; // Importamos a AdminRoute
import { useAuth } from './context/AuthContext';

function App() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Bem-vindo ao Coltec.BET</h1>
          <nav>
            {user ? (
              <>
                <span>Olá, {user.name}! (Saldo: R$ {parseFloat(user.saldo).toFixed(2)})</span>
                | <Link to="/">Home</Link>
                {/* O link para o painel de admin só aparece se o usuário for admin */}
                {user.role === 'Admin' && <> | <Link to="/admin">Admin</Link></>}
                | <button onClick={logout}>Sair</button>
              </>
            ) : (
              <>
                <Link to="/registrar">Registrar</Link> | <Link to="/login">Login</Link>
              </>
            )}
          </nav>
        </header>
        <hr />
        <main>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/registrar" element={<RegisterPage />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />

            {/* Rotas Protegidas para Usuários Normais */}
            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={<HomePage />} />
            </Route>
            
            {/* Rota Protegida exclusiva para Administradores */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<AdminPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;