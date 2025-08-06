// Caminho: src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
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
                {/* Acessamos user.saldo e o formatamos para duas casas decimais */}
                <span>Olá, {user.name}! (Saldo: R$ {user.saldo ? parseFloat(user.saldo).toFixed(2) : '0.00'})</span>
                &nbsp;|&nbsp;
                <Link to="/">Home</Link>
                &nbsp;|&nbsp;
                <button onClick={logout}>Sair</button>
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
            <Route path="/registrar" element={<RegisterPage />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={<HomePage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;